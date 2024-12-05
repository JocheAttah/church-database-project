-- Drop the view first
DROP VIEW IF EXISTS attendance_with_meeting_type;

-- Step 1: Add new columns to the attendance table
ALTER TABLE "public"."attendance"
ADD COLUMN "adults" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "children" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "total" INTEGER GENERATED ALWAYS AS ("adults" + "children") STORED;

-- Step 2: Update existing data to populate new columns
UPDATE "public"."attendance"
SET "adults" = "attendance", "children" = 0;

-- Step 3: Drop the old attendance column
ALTER TABLE "public"."attendance" DROP COLUMN "attendance";

-- Step 4: Add new columns to the attendance_staging table
ALTER TABLE "public"."attendance_staging"
ADD COLUMN "adults" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "children" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "total" INTEGER GENERATED ALWAYS AS ("adults" + "children") STORED;

-- Step 5: Update existing data to populate new columns
UPDATE "public"."attendance_staging"
SET "adults" = "attendance", "children" = 0;

-- Step 6: Drop the old attendance column
ALTER TABLE "public"."attendance_staging" DROP COLUMN "attendance";

-- Recreate the view with new columns
CREATE VIEW attendance_with_meeting_type AS
SELECT
  a.*,
  mt.type_name AS meeting_type
FROM attendance a
LEFT JOIN meeting_type mt ON a.meeting_type_id = mt.id;

CREATE OR REPLACE FUNCTION public.upsert_attendance_from_staging()
RETURNS void AS $$
BEGIN
  INSERT INTO public.attendance (meeting_type_id, adults, children, absentee, meeting_date, created_by)
  SELECT
    mt.id AS meeting_type_id,
    ast.adults,
    ast.children,
    ast.absentee,
    ast.meeting_date,
    ast.created_by
  FROM public.attendance_staging ast
  JOIN public.meeting_type mt ON ast.meeting_type = mt.type_name
  ON CONFLICT (meeting_type_id, meeting_date)
  DO UPDATE SET
    adults = EXCLUDED.adults,
    children = EXCLUDED.children,
    absentee = EXCLUDED.absentee,
    created_by = EXCLUDED.created_by,
    updated_at = CURRENT_TIMESTAMP;

  -- Clear the staging table after upsert
  TRUNCATE TABLE public.attendance_staging;
END;
$$ LANGUAGE plpgsql;
