-- Drop existing views
DROP VIEW IF EXISTS public.members_with_cell_fellowship;
DROP VIEW IF EXISTS public.attendance_with_meeting_type;

-- Recreate views with security_invoker=on
CREATE VIEW public.members_with_cell_fellowship
    WITH (security_invoker=on)
    AS
SELECT
    m.*,
    concat(cf.name, ' ', cf.type) as cell_fellowship
FROM members m
LEFT JOIN cell_fellowship cf ON m.cell_fellowship_id = cf.id;

CREATE VIEW public.attendance_with_meeting_type
    WITH (security_invoker=on)
    AS
SELECT
    a.*,
    mt.type_name AS meeting_type
FROM attendance a
LEFT JOIN meeting_type mt ON a.meeting_type_id = mt.id;