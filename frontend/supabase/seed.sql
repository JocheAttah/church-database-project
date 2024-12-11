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
('Pigba Kasa', 'Cell'),
('Karu', 'Fellowship'),
('Kuje', 'Cell'),
('Lokogoma', 'Cell'),
('Kubwa', 'Cell'),
('Keffi', 'Cell');

-- Seed data for members table (modified to use cell_fellowship_id)
INSERT INTO public.members (first_name, middle_name, last_name, gender, marital_status, qualification, cell_fellowship_id, phone, email, dob, class, discipled_by) VALUES
('John', 'Michael', 'Doe', 'Male', 'Single', 'Member', (SELECT id FROM public.cell_fellowship WHERE name = 'Durumi'), '1234567890', 'john.doe@email.com', '1990-05-15', 'Working Class', NULL),
('Jane', NULL, 'Smith', 'Female', 'Married', 'Worker', (SELECT id FROM public.cell_fellowship WHERE name = 'Wuse'), '9876543210', 'jane.smith@email.com', '1985-09-22', 'Working Class', 'John Doe'),
('Alice', 'Marie', 'Johnson', 'Female', 'Single', 'Member', (SELECT id FROM public.cell_fellowship WHERE name = 'Jikwoyi'), '5551234567', 'alice.johnson@email.com', '1995-03-10', 'Student', NULL),
('Bob', NULL, 'Williams', 'Male', 'Married', 'Worker', (SELECT id FROM public.cell_fellowship WHERE name = 'Lugbe'), '7778889999', 'bob.williams@email.com', '1980-11-30', 'Working Class', 'Jane Smith'),
('Eva', 'Rose', 'Brown', 'Female', 'Single', 'Member', (SELECT id FROM public.cell_fellowship WHERE name = 'Pigba Kasa'), '3334445555', 'eva.brown@email.com', '1992-07-18', 'Unemployed', 'Alice Johnson');


-- Seed data for inflow table
INSERT INTO public.inflow (type, amount, description, date, created_by) VALUES
('Offering', 5000.00, 'Sunday Service Offering', '2024-03-03', 'John Doe'),
('Tithe', 10000.00, 'Monthly Tithe', '2024-03-01', 'Jane Smith'),
('Donation', 2500, 'Building Project Donation', '2024-03-05', 'Alice Johnson'),
('Special Offering', 7500.00, 'Easter Special Offering', '2024-03-31', 'Bob Williams'),
('Pledge', 15000.00, 'Annual Pledge Payment', '2024-03-15', 'Eva Brown');

-- Seed data for outflow table
INSERT INTO public.outflow (type, amount, period, description, beneficiary, created_by, approved_by, date) VALUES
('Salary', 12000.00, 'Monthly', 'Pastor Salary', 'John Doe', 'Jane Smith', 'Bob Williams', '2024-03-01'),
('Utility', 2000.00, 'Monthly', 'Electricity Bill', 'Power Company', 'Alice Johnson', 'John Doe', '2024-03-01'),
('Maintenance', 5000.00, 'One-time', 'Church Building Repairs', 'ABC Contractors', 'Bob Williams', 'Jane Smith', '2024-03-01'),
('Charity', 3000.00, 'Monthly', 'Orphanage Support', 'Hope Orphanage', 'Eva Brown', 'John Doe', '2024-03-01'),
('Equipment', 10000.00, 'One-time', 'New Sound System', 'XYZ Electronics', 'Jane Smith', 'Bob Williams', '2024-03-01');
