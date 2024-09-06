"use client";
import { createClient } from "@/utils/supabase/client";
import { useQueries } from "@tanstack/react-query";

export const useMembership = () => {
  const supabase = createClient();

  const queries = useQueries({
    queries: [
      {
        queryKey: ["members", "totalCount"],
        queryFn: async () =>
          await supabase
            .from("members")
            .select("*", { count: "exact", head: true }),
      },
      {
        queryKey: ["members", "previousCount"],
        queryFn: async () => {
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
          return await supabase
            .from("members")
            .select("*", { count: "exact", head: true })
            .lte("created_at", oneMonthAgo.toISOString());
        },
      },
      {
        queryKey: ["members", "genderData"],
        queryFn: async () =>
          await supabase.from("members").select("gender").throwOnError(),
      },
      {
        queryKey: ["members", "qualificationData"],
        queryFn: async () =>
          await supabase.from("members").select("qualification"),
      },
      {
        queryKey: ["members", "previousQualificationData"],
        queryFn: async () => {
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
          return await supabase
            .from("members")
            .select("qualification")
            .lte("created_at", oneMonthAgo.toISOString());
        },
      },
    ],
  });

  const [
    totalCountQuery,
    previousCountQuery,
    genderDataQuery,
    qualificationDataQuery,
    previousQualificationDataQuery,
  ] = queries;

  return {
    totalCount: totalCountQuery.data?.count || 0,
    previousCount: previousCountQuery.data?.count || 0,
    genderData: genderDataQuery.data?.data || [],
    qualificationData: qualificationDataQuery.data?.data || [],
    previousQualificationData: previousQualificationDataQuery.data?.data || [],
    isLoading: queries.some((query) => query.isLoading),
  };
};
