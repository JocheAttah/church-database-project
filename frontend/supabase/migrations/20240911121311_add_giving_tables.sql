-- Create inflow table
CREATE TABLE IF NOT EXISTS public.inflow (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  type text NOT NULL,
  amount numeric(10, 2) NOT NULL,
  description text,
  date date NOT NULL,
  created_by text NOT NULL,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create outflow table
CREATE TABLE IF NOT EXISTS public.outflow (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  type text NOT NULL,
  amount numeric(10, 2) NOT NULL,
  period text,
  description text,
  beneficiary text,
  created_by text NOT NULL,
  approved_by text,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Enable Row Level Security for both tables
ALTER TABLE public.inflow ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outflow ENABLE ROW LEVEL SECURITY;

-- Create policies for inflow table
CREATE POLICY "authenticated users can read inflow" ON public.inflow FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated users can insert inflow" ON public.inflow FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "authenticated users can update inflow" ON public.inflow FOR UPDATE TO authenticated USING (true);
CREATE POLICY "authenticated users can delete inflow" ON public.inflow FOR DELETE TO authenticated USING (true);

-- Create policies for outflow table
CREATE POLICY "authenticated users can read outflow" ON public.outflow FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated users can insert outflow" ON public.outflow FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "authenticated users can update outflow" ON public.outflow FOR UPDATE TO authenticated USING (true);
CREATE POLICY "authenticated users can delete outflow" ON public.outflow FOR DELETE TO authenticated USING (true);

-- Grant permissions for both tables
GRANT ALL ON TABLE public.inflow TO anon;
GRANT ALL ON TABLE public.inflow TO authenticated;
GRANT ALL ON TABLE public.inflow TO service_role;

GRANT ALL ON TABLE public.outflow TO anon;
GRANT ALL ON TABLE public.outflow TO authenticated;
GRANT ALL ON TABLE public.outflow TO service_role;

-- Grant permissions for sequences
GRANT ALL ON SEQUENCE public.inflow_id_seq TO anon;
GRANT ALL ON SEQUENCE public.inflow_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.inflow_id_seq TO service_role;

GRANT ALL ON SEQUENCE public.outflow_id_seq TO anon;
GRANT ALL ON SEQUENCE public.outflow_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.outflow_id_seq TO service_role;
