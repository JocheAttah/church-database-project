import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  const supabase = createClient();

  return useQuery({
    queryKey: ["current_user"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("users")
        .select("first_name, last_name")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return `${data.first_name} ${data.last_name}`;
    },
  });
};
