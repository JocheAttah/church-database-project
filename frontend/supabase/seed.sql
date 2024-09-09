-- Seed data for class table
INSERT INTO public.class (class_name) VALUES
('Working Class'),
('Unemployed'),
('Student');

-- Seed data for meeting_type table
INSERT INTO public.meeting_type (type_name) VALUES
('Sunday Service'),
('Midweek Service'),
('Fellowship Meeting'),
('Prayer Group');

-- Seed data for cell_fellowship table
INSERT INTO public.cell_fellowship (name, type) VALUES
('Durumi', 'Fellowship'),
('Wuse', 'Fellowship'),
('Jikwoyi', 'Cell'),
('Lugbe', 'Cell'),
('Pigbakasa', 'Cell'),
('Karu', 'Fellowship'),
('Kuje', 'Cell'),
('Lokogoma', 'Cell'),
('Kubwa', 'Cell');

-- Seed data for members table (modified to use cell_fellowship_id)
INSERT INTO public.members (first_name, middle_name, last_name, gender, marital_status, qualification, cell_fellowship_id, phone, email, dob, class, discipled_by) VALUES
('John', 'Michael', 'Doe', 'Male', 'Single', 'Member', (SELECT id FROM public.cell_fellowship WHERE name = 'Durumi'), '1234567890', 'john.doe@email.com', '1990-05-15', 'Working Class', NULL),
('Jane', NULL, 'Smith', 'Female', 'Married', 'Worker', (SELECT id FROM public.cell_fellowship WHERE name = 'Wuse'), '9876543210', 'jane.smith@email.com', '1985-09-22', 'Working Class', 'John Doe'),
('Alice', 'Marie', 'Johnson', 'Female', 'Single', 'Member', (SELECT id FROM public.cell_fellowship WHERE name = 'Jikwoyi'), '5551234567', 'alice.johnson@email.com', '1995-03-10', 'Student', NULL),
('Bob', NULL, 'Williams', 'Male', 'Married', 'Worker', (SELECT id FROM public.cell_fellowship WHERE name = 'Lugbe'), '7778889999', 'bob.williams@email.com', '1980-11-30', 'Working Class', 'Jane Smith'),
('Eva', 'Rose', 'Brown', 'Female', 'Single', 'Member', (SELECT id FROM public.cell_fellowship WHERE name = 'Pigbakasa'), '3334445555', 'eva.brown@email.com', '1992-07-18', 'Unemployed', 'Alice Johnson');

-- Seed data for attendance table
INSERT INTO public.attendance (meeting_type_id, attendance, absentee, meeting_date, created_by) VALUES
((SELECT id FROM public.meeting_type WHERE type_name = 'Sunday Service'), 50, 10, '2024-03-03', 'John Doe'),
((SELECT id FROM public.meeting_type WHERE type_name = 'Midweek Service'), 30, 5, '2024-03-06', 'Jane Smith'),
((SELECT id FROM public.meeting_type WHERE type_name = 'Fellowship Meeting'), 20, 2, '2024-03-08', 'Bob Williams'),
((SELECT id FROM public.meeting_type WHERE type_name = 'Prayer Group'), 15, 1, '2024-03-09', 'Alice Johnson'),
((SELECT id FROM public.meeting_type WHERE type_name = 'Sunday Service'), 55, 8, '2024-03-10', 'John Doe');
