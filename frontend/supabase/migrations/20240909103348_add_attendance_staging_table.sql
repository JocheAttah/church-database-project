-- Create attendance_staging table
CREATE TABLE IF NOT EXISTS public.attendance_staging (
  id SERIAL PRIMARY KEY,
  meeting_type VARCHAR(255) NOT NULL,
  attendance INTEGER NOT NULL,
  absentee INTEGER NOT NULL,
  meeting_date DATE NOT NULL,
  created_by VARCHAR(255) NOT NULL
);

-- Create upsert_attendance_from_staging function
CREATE OR REPLACE FUNCTION public.upsert_attendance_from_staging()
RETURNS void AS $$
BEGIN
  INSERT INTO public.attendance (meeting_type_id, attendance, absentee, meeting_date, created_by)
  SELECT
    mt.id AS meeting_type_id,
    ast.attendance,
    ast.absentee,
    ast.meeting_date,
    ast.created_by
  FROM public.attendance_staging ast
  JOIN public.meeting_type mt ON ast.meeting_type = mt.type_name
  ON CONFLICT (meeting_type_id, meeting_date)
  DO UPDATE SET
    attendance = EXCLUDED.attendance,
    absentee = EXCLUDED.absentee,
    created_by = EXCLUDED.created_by,
    updated_at = CURRENT_TIMESTAMP;

  -- Clear the staging table after upsert
  TRUNCATE TABLE public.attendance_staging;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.upsert_attendance_from_staging() TO authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_attendance_from_staging() TO service_role;

-- Enable RLS for the staging table
ALTER TABLE public.attendance_staging ENABLE ROW LEVEL SECURITY;

-- Add policies for the staging table
CREATE POLICY "authenticated users can read attendance_staging" ON public.attendance_staging FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated users can insert attendance_staging" ON public.attendance_staging FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "authenticated users can update attendance_staging" ON public.attendance_staging FOR UPDATE TO authenticated USING (true);
CREATE POLICY "authenticated users can delete attendance_staging" ON public.attendance_staging FOR DELETE TO authenticated USING (true);

-- Add a unique constraint to the attendance table
ALTER TABLE public.attendance
ADD CONSTRAINT attendance_unique_constraint
UNIQUE (meeting_type_id, meeting_date);
