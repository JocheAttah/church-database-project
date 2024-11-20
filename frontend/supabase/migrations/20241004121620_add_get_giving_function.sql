CREATE OR REPLACE FUNCTION public.get_giving()
RETURNS TABLE (total_inflow numeric, total_outflow numeric, balance numeric)
LANGUAGE sql
AS $$
  WITH inflow_sum AS (
    SELECT COALESCE(SUM(amount), 0) as total
    FROM inflow
  ),
  outflow_sum AS (
    SELECT COALESCE(SUM(amount), 0) as total
    FROM outflow
  )
  SELECT
    inflow_sum.total as total_inflow,
    outflow_sum.total as total_outflow,
    (inflow_sum.total - outflow_sum.total) as balance
  FROM inflow_sum, outflow_sum;
$$;
