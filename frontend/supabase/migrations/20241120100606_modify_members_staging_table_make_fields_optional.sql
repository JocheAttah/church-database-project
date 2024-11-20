-- Alter members_staging table to make fields optional
ALTER TABLE "public"."members_staging"
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "marital_status" DROP NOT NULL,
ALTER COLUMN "qualification" DROP NOT NULL,
ALTER COLUMN "class" DROP NOT NULL;

-- Update constraints to allow empty values but enforce checks when not empty
ALTER TABLE "public"."members_staging"
DROP CONSTRAINT "members_staging_gender_check",
ADD CONSTRAINT "members_staging_gender_check" CHECK (gender IN ('Male', 'Female') OR gender IS NULL OR gender = ''),
DROP CONSTRAINT "members_staging_marital_status_check",
ADD CONSTRAINT "members_staging_marital_status_check" CHECK (marital_status IN ('Single', 'Married') OR marital_status IS NULL OR marital_status = ''),
DROP CONSTRAINT "members_staging_qualification_check",
ADD CONSTRAINT "members_staging_qualification_check" CHECK (qualification IN ('Worker', 'Member') OR qualification IS NULL OR qualification = ''),
DROP CONSTRAINT "members_staging_class_check",
ADD CONSTRAINT "members_staging_class_check" CHECK (class IN ('Working Class', 'Unemployed', 'Student') OR class IS NULL OR class = '');

-- Alter members table to make fields optional
ALTER TABLE "public"."members"
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "marital_status" DROP NOT NULL,
ALTER COLUMN "qualification" DROP NOT NULL,
ALTER COLUMN "class" DROP NOT NULL,
ALTER COLUMN "dob" DROP NOT NULL;

-- Update constraints to allow empty values but enforce checks when not empty
ALTER TABLE "public"."members"
DROP CONSTRAINT "members_gender_check",
ADD CONSTRAINT "members_gender_check" CHECK (gender IN ('Male', 'Female') OR gender IS NULL OR gender = ''),
DROP CONSTRAINT "members_marital_status_check",
ADD CONSTRAINT "members_marital_status_check" CHECK (marital_status IN ('Single', 'Married') OR marital_status IS NULL OR marital_status = ''),
DROP CONSTRAINT "qualification_check",
ADD CONSTRAINT "qualification_check" CHECK (qualification IN ('Worker', 'Member') OR qualification IS NULL OR qualification = ''),
DROP CONSTRAINT "members_class_check",
ADD CONSTRAINT "members_class_check" CHECK (class IN ('Working Class', 'Unemployed', 'Student') OR class IS NULL OR class = '');

-- Update upsert_members_from_staging function to change conflict target
CREATE OR REPLACE FUNCTION public.upsert_members_from_staging()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Upsert data from staging to members table
  INSERT INTO public.members (
    first_name, middle_name, last_name, gender, marital_status, qualification,
    cell_fellowship_id, phone, email, dob, class, discipled_by
  )
  SELECT
    s.first_name, s.middle_name, s.last_name, s.gender, s.marital_status, s.qualification,
    cf.id, s.phone, s.email, s.dob, s.class, s.discipled_by
  FROM
    public.members_staging s
  LEFT JOIN
    public.cell_fellowship cf ON cf.name = s.cell_fellowship
  ON CONFLICT (first_name, last_name, cell_fellowship_id)
  DO UPDATE SET
    middle_name = EXCLUDED.middle_name,
    gender = EXCLUDED.gender,
    marital_status = EXCLUDED.marital_status,
    qualification = EXCLUDED.qualification,
    phone = EXCLUDED.phone,
    email = EXCLUDED.email,
    dob = EXCLUDED.dob,
    class = EXCLUDED.class,
    discipled_by = EXCLUDED.discipled_by,
    updated_at = CURRENT_TIMESTAMP;

  -- Clear the staging table after upsert
  TRUNCATE TABLE public.members_staging;
END;
$$;

-- Update unique constraint on members table
ALTER TABLE "public"."members"
DROP CONSTRAINT "members_unique_constraint",
ADD CONSTRAINT "members_unique_constraint"
UNIQUE (first_name, last_name, cell_fellowship_id);

-- Add a unique constraint to the members_staging table
ALTER TABLE "public"."members_staging"
ADD CONSTRAINT "members_staging_unique_constraint"
UNIQUE (first_name, last_name, cell_fellowship);

-- Create a function to handle staging table inserts with better error messages
CREATE OR REPLACE FUNCTION public.handle_members_staging_insert()
RETURNS TRIGGER AS $$
DECLARE
    existing_record RECORD;
BEGIN
    -- Check if record already exists
    SELECT first_name, last_name, cell_fellowship
    INTO existing_record
    FROM public.members_staging
    WHERE first_name = NEW.first_name
    AND last_name = NEW.last_name
    AND cell_fellowship = NEW.cell_fellowship;

    IF FOUND THEN
        RAISE EXCEPTION 'Duplicate entry in staging table: First Name: %, Last Name: %, Cell Fellowship: %',
            existing_record.first_name, existing_record.last_name, existing_record.cell_fellowship;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS members_staging_insert_trigger ON public.members_staging;
CREATE TRIGGER members_staging_insert_trigger
    BEFORE INSERT ON public.members_staging
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_members_staging_insert();