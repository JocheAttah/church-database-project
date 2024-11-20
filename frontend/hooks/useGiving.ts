"use client";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useGiving = () => {
  const supabase = createClient();

  const { data, isLoading } = useQuery({
    queryKey: ["giving"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_giving").single();
      if (error) throw error;
      return data;
    },
  });

  return {
    totalInflow: data?.total_inflow || 0,
    totalOutflow: data?.total_outflow || 0,
    balance: data?.balance || 0,
    // inflowChangePercent: data?.inflow_change_percent || 0,
    // outflowChangePercent: data?.outflow_change_percent || 0,
    isLoading,
  };
};
