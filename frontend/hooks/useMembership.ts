"use client";
import { createClient } from "@/utils/supabase/client";
import { useQueries } from "@tanstack/react-query";

export const useMembership = ({ cellFellowshipId = 0 } = {}) => {
  const supabase = createClient();

  const queries = useQueries({
    queries: [
      {
        queryKey: ["members", "totalCount", cellFellowshipId],
        queryFn: async () =>
          cellFellowshipId
            ? await supabase
                .from("members")
                .select("*", { count: "exact", head: true })
                .eq("cell_fellowship_id", cellFellowshipId)
            : await supabase
                .from("members")
                .select("*", { count: "exact", head: true }),
      },
      {
        queryKey: ["members", "previousCount", cellFellowshipId],
        queryFn: async () => {
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
          return cellFellowshipId
            ? await supabase
                .from("members")
                .select("*", { count: "exact", head: true })
                .eq("cell_fellowship_id", cellFellowshipId)
                .lte("created_at", oneMonthAgo.toISOString())
            : await supabase
                .from("members")
                .select("*", { count: "exact", head: true })
                .lte("created_at", oneMonthAgo.toISOString());
        },
      },
      {
        queryKey: ["members", "genderData", cellFellowshipId],
        queryFn: async () =>
          cellFellowshipId
            ? await supabase
                .from("members")
                .select("gender")
                .eq("cell_fellowship_id", cellFellowshipId)
            : await supabase.from("members").select("gender"),
      },
      {
        queryKey: ["members", "qualificationData", cellFellowshipId],
        queryFn: async () =>
          cellFellowshipId
            ? await supabase
                .from("members")
                .select("qualification")
                .eq("cell_fellowship_id", cellFellowshipId)
            : await supabase.from("members").select("qualification"),
      },
      {
        queryKey: ["members", "previousQualificationData", cellFellowshipId],
        queryFn: async () => {
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
          return cellFellowshipId
            ? await supabase
                .from("members")
                .select("qualification")
                .eq("cell_fellowship_id", cellFellowshipId)
                .lte("created_at", oneMonthAgo.toISOString())
            : await supabase
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
