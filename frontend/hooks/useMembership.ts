"use client";
import { createClient } from "@/utils/supabase/client";
import { useQueries } from "@tanstack/react-query";

export const useMembership = () => {
  const supabase = createClient();

  const queries = useQueries({
    queries: [
      {
        queryKey: ["totalCount"],
        queryFn: async () =>
          await supabase
            .from("members")
            .select("id", { count: "exact", head: true }),
      },
      {
        queryKey: ["genderData"],
        queryFn: async () =>
          await supabase.from("members").select("gender").throwOnError(),
      },
      {
        queryKey: ["qualificationData"],
        queryFn: async () =>
          await supabase.from("members").select("qualification"),
      },
    ],
  });

  const [totalCountQuery, genderDataQuery, qualificationDataQuery] = queries;

  return {
    totalCount: totalCountQuery.data?.count || 0,
    genderData: genderDataQuery.data?.data || [],
    qualificationData: qualificationDataQuery.data?.data || [],
    isLoading: queries.some((query) => query.isLoading),
  };
};
