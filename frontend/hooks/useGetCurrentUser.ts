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
      return user;
    },
  });
};
