import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useMeetingTypes = () => {
  const { data: meetingTypes = [], isLoading } = useQuery({
    queryKey: ["meeting_types"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("meeting_type")
        .select("type_name");
      if (error) throw error;
      return data.map((type) => type.type_name);
    },
  });

  return { meetingTypes, isLoading };
};
