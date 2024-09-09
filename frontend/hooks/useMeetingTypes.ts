import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useMeetingTypes = () => {
  const { data: meetingTypes = [], isLoading } = useQuery({
    queryKey: ["meeting_types"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("meeting_type").select("*");
      if (error) throw error;
      return data;
    },
  });

  return { meetingTypes, isLoading };
};
