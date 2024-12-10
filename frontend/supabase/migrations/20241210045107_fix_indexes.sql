-- Add index for the foreign key members_cell_fellowship_id_fkey
CREATE INDEX IF NOT EXISTS idx_members_cell_fellowship_id
ON public.members (cell_fellowship_id);

-- Add index for the foreign key attendance_meeting_type_id_fkey
CREATE INDEX IF NOT EXISTS idx_attendance_meeting_type_id
ON public.attendance (meeting_type_id);