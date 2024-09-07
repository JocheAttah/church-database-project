-- Create members_staging table
CREATE TABLE IF NOT EXISTS "public"."members_staging" (
  "id" bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "first_name" text NOT NULL,
  "middle_name" text,
  "last_name" text NOT NULL,
  "gender" text NOT NULL,
  "marital_status" text NOT NULL,
  "qualification" text NOT NULL,
  "cell_fellowship" text NOT NULL,
  "phone" text,
  "email" text,
  "dob" date,
  "class" text NOT NULL,
  "discipled_by" text,
  "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Add constraints to match the members table
ALTER TABLE "public"."members_staging"
ADD CONSTRAINT "members_staging_gender_check" CHECK (gender IN ('Male', 'Female')),
ADD CONSTRAINT "members_staging_marital_status_check" CHECK (marital_status IN ('Single', 'Married')),
ADD CONSTRAINT "members_staging_qualification_check" CHECK (qualification IN ('Worker', 'Member')),
ADD CONSTRAINT "members_staging_class_check" CHECK (class IN ('Working Class', 'Unemployed', 'Student'));

-- Grant necessary permissions
GRANT ALL ON TABLE "public"."members_staging" TO "anon";
GRANT ALL ON TABLE "public"."members_staging" TO "authenticated";
GRANT ALL ON TABLE "public"."members_staging" TO "service_role";

-- Create upsert_members_from_staging function
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
  ON CONFLICT (first_name, last_name, gender, marital_status, qualification, class)
  DO UPDATE SET
    middle_name = EXCLUDED.middle_name,
    cell_fellowship_id = EXCLUDED.cell_fellowship_id,
    phone = EXCLUDED.phone,
    email = EXCLUDED.email,
    dob = EXCLUDED.dob,
    discipled_by = EXCLUDED.discipled_by,
    updated_at = CURRENT_TIMESTAMP;

  -- Clear the staging table after upsert
  TRUNCATE TABLE public.members_staging;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.upsert_members_from_staging() TO authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_members_from_staging() TO service_role;

-- Enable RLS for the staging table
ALTER TABLE "public"."members_staging" ENABLE ROW LEVEL SECURITY;

-- Add policies for the staging table
CREATE POLICY "authenticated users can read members_staging" ON "public"."members_staging" FOR SELECT TO "authenticated" USING (true);
CREATE POLICY "authenticated users can insert members_staging" ON "public"."members_staging" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "authenticated users can update members_staging" ON "public"."members_staging" FOR UPDATE TO "authenticated" USING (true);
CREATE POLICY "authenticated users can delete members_staging" ON "public"."members_staging" FOR DELETE TO "authenticated" USING (true);

-- Add a unique constraint to the members table
ALTER TABLE "public"."members"
ADD CONSTRAINT "members_unique_constraint"
UNIQUE (first_name, last_name, gender, marital_status, qualification, class);