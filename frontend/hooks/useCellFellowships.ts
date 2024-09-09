"use client";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useCellFellowships = () => {
  const { data: cellFellowships, isLoading } = useQuery({
    queryKey: ["cell_fellowship"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("cell_fellowship")
        .select("*, member_count:members(count)")
        .order("name");

      if (error) throw error;
      return data.map((cf) => ({
        ...cf,
        memberCount: cf.member_count[0]?.count || 0,
      }));
    },
  });

  return {
    cellFellowships: cellFellowships ?? [],
    isLoading,
  };
};
