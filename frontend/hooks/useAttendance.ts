"use client";
import { createClient } from "@/utils/supabase/client";
import { useQueries } from "@tanstack/react-query";

export const useAttendance = () => {
  const supabase = createClient();

  const queries = useQueries({
    queries: [
      {
        queryKey: ["attendance", "totalCount"],
        queryFn: async () =>
          await supabase
            .from("attendance")
            .select("*", { count: "exact", head: true }),
      },
    ],
  });

  const [totalCountQuery] = queries;

  return {
    totalCount: totalCountQuery.data?.count || 0,
    isLoading: queries.some((query) => query.isLoading),
  };
};
