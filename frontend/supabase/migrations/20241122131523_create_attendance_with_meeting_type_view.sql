CREATE VIEW attendance_with_meeting_type AS
SELECT
  a.*,
  mt.type_name AS meeting_type
FROM attendance a
LEFT JOIN meeting_type mt ON a.meeting_type_id = mt.id;