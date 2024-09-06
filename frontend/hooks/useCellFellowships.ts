import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useCellFellowships = () => {
  const { data: cellFellowships, isLoading } = useQuery({
    queryKey: ["cell_fellowship"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("cell_fellowship")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  // const { data: cellFellowshipSizes, isLoading: isLoadingSizes } = useQuery({
  //   queryKey: ["cell_fellowship_sizes"],
  //   queryFn: async () => {
  //     const supabase = createClient();
  //     const { data, error } = await supabase
  //       .from("members")
  //       .select("cell_fellowship_id, count");

  //     if (error) throw error;

  //     return data.reduce((acc, { cell_fellowship_id, count }) => {
  //       acc[cell_fellowship_id] = count;
  //       return acc;
  //     }, {});
  //   },
  // });

  return {
    cellFellowships: cellFellowships ?? [],
    isLoading,
  };
};
