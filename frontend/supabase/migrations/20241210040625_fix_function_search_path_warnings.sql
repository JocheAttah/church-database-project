-- Fix get_giving function
CREATE OR REPLACE FUNCTION public.get_giving()
RETURNS TABLE (total_inflow numeric, total_outflow numeric, balance numeric)
LANGUAGE sql
SECURITY INVOKER
SET search_path = ''
AS $$
  WITH inflow_sum AS (
    SELECT COALESCE(SUM(amount), 0) as total
    FROM public.inflow
  ),
  outflow_sum AS (
    SELECT COALESCE(SUM(amount), 0) as total
    FROM public.outflow
  )
  SELECT
    inflow_sum.total as total_inflow,
    outflow_sum.total as total_outflow,
    (inflow_sum.total - outflow_sum.total) as balance
  FROM inflow_sum, outflow_sum;
$$;

-- Fix handle_attendance_staging_insert function
CREATE OR REPLACE FUNCTION public.handle_attendance_staging_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
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
$$;

-- Fix handle_members_staging_insert function
CREATE OR REPLACE FUNCTION public.handle_members_staging_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
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
$$;

-- Fix upsert_attendance_from_staging function
CREATE OR REPLACE FUNCTION public.upsert_attendance_from_staging()
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
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
$$;

-- Fix upsert_members_from_staging function
CREATE OR REPLACE FUNCTION public.upsert_members_from_staging()
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
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