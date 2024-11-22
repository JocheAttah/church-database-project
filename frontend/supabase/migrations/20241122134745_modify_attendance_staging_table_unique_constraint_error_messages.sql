-- Add a unique constraint to the attendance_staging table
ALTER TABLE "public"."attendance_staging"
ADD CONSTRAINT "attendance_staging_unique_constraint"
UNIQUE (meeting_type, meeting_date);

-- Create a function to handle staging table inserts with better error messages
CREATE OR REPLACE FUNCTION public.handle_attendance_staging_insert()
RETURNS TRIGGER AS $$
DECLARE
    existing_record RECORD;
BEGIN
    -- Check if record already exists
    SELECT meeting_type, meeting_date
    INTO existing_record
    FROM public.attendance_staging
    WHERE meeting_type = NEW.meeting_type
    AND meeting_date = NEW.meeting_date;

    IF FOUND THEN
        RAISE EXCEPTION 'Duplicate entry in staging table: Meeting Type: %, Meeting Date: %',
            existing_record.meeting_type, existing_record.meeting_date;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS attendance_staging_insert_trigger ON public.attendance_staging;
CREATE TRIGGER attendance_staging_insert_trigger
    BEFORE INSERT ON public.attendance_staging
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_attendance_staging_insert();