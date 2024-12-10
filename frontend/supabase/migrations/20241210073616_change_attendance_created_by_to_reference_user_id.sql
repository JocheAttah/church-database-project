-- First, drop the view that depends on the attendance table
DROP VIEW IF EXISTS public.attendance_with_meeting_type;

-- Modify the created_by column in attendance table
ALTER TABLE "public"."attendance"
ALTER COLUMN "created_by" TYPE uuid USING created_by::uuid;

ALTER TABLE "public"."attendance"
RENAME COLUMN "created_by" TO "created_by_id";

ALTER TABLE "public"."attendance"
ADD CONSTRAINT "attendance_created_by_id_fkey"
FOREIGN KEY ("created_by_id")
REFERENCES "public"."users"(id)
ON DELETE RESTRICT ON UPDATE CASCADE;

-- Modify the created_by column in attendance_staging table
ALTER TABLE "public"."attendance_staging"
ALTER COLUMN "created_by" TYPE uuid USING created_by::uuid;

ALTER TABLE "public"."attendance_staging"
RENAME COLUMN "created_by" TO "created_by_id";

-- Recreate the view with the new column
CREATE VIEW public.attendance_with_user_name_and_meeting_type
    WITH (security_invoker=on)
    AS
SELECT
    a.*,
    mt.type_name AS meeting_type,
    u.first_name || ' ' || u.last_name AS created_by
FROM attendance a
LEFT JOIN meeting_type mt ON a.meeting_type_id = mt.id
LEFT JOIN users u ON a.created_by_id = u.id;

-- Add index for the new foreign key
CREATE INDEX IF NOT EXISTS idx_attendance_created_by_id
ON public.attendance (created_by_id);

-- Update the upsert function to handle created_by_id
CREATE OR REPLACE FUNCTION public.upsert_attendance_from_staging()
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.attendance (meeting_type_id, adults, children, absentee, meeting_date, created_by_id)
  SELECT
    mt.id AS meeting_type_id,
    ast.adults,
    ast.children,
    ast.absentee,
    ast.meeting_date,
    ast.created_by_id
  FROM public.attendance_staging ast
  JOIN public.meeting_type mt ON ast.meeting_type = mt.type_name
  ON CONFLICT (meeting_type_id, meeting_date)
  DO UPDATE SET
    adults = EXCLUDED.adults,
    children = EXCLUDED.children,
    absentee = EXCLUDED.absentee,
    created_by_id = EXCLUDED.created_by_id,
    updated_at = CURRENT_TIMESTAMP;

  -- Clear the staging table after upsert
  TRUNCATE TABLE public.attendance_staging;
END;
$$;