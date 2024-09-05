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

-- Seed data for members table
INSERT INTO public.members (first_name, middle_name, last_name, gender, marital_status, qualification, cell_or_fellowship, phone, email, dob, class, discipled_by) VALUES
('John', 'Michael', 'Doe', 'Male', 'Single', 'Member', 'Durumi', '1234567890', 'john.doe@email.com', '1990-05-15', 'Working Class', NULL),
('Jane', NULL, 'Smith', 'Female', 'Married', 'Worker', 'Wuse', '9876543210', 'jane.smith@email.com', '1985-09-22', 'Working Class', 'John Doe'),
('Alice', 'Marie', 'Johnson', 'Female', 'Single', 'Member', 'Jikwoyi', '5551234567', 'alice.johnson@email.com', '1995-03-10', 'Student', NULL),
('Bob', NULL, 'Williams', 'Male', 'Married', 'Worker', 'Lugbe', '7778889999', 'bob.williams@email.com', '1980-11-30', 'Working Class', 'Jane Smith'),
('Eva', 'Rose', 'Brown', 'Female', 'Single', 'Member', 'Pigbakasa', '3334445555', 'eva.brown@email.com', '1992-07-18', 'Unemployed', 'Alice Johnson');

-- Seed data for attendance table
INSERT INTO public.attendance (meeting_type, attendance, absentee, meeting_date, created_by) VALUES
('Sunday Service', 50, 10, '2024-03-03', 'John Doe'),
('Midweek Service', 30, 5, '2024-03-06', 'Jane Smith'),
('Fellowship Meeting', 20, 2, '2024-03-08', 'Bob Williams'),
('Prayer Group', 15, 1, '2024-03-09', 'Alice Johnson'),
('Sunday Service', 55, 8, '2024-03-10', 'John Doe');
