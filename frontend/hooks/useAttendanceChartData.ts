import { TimeRange } from "@/app/dashboard/page";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

type MeetingType =
  | "Sunday Service"
  | "Midweek Service"
  | "Fellowship Meeting"
  | "Prayer Group";

type ChartData = {
  meeting: MeetingType;
  attendance: number;
  fill: string;
};

const MEETING_COLORS = {
  "Sunday Service": "#FAA307",
  "Midweek Service": "#FAA307",
  "Fellowship Meeting": "#FAA307",
  "Prayer Group": "#FAA307",
};

const getTimeRangeFilter = (timeRange: TimeRange) => {
  const now = new Date();
  switch (timeRange) {
    case "week":
      return new Date(now.setDate(now.getDate() - 7));
    case "month":
      return new Date(now.setMonth(now.getMonth() - 1));
    case "year":
      return new Date(now.setFullYear(now.getFullYear() - 1));
  }
};

export const useAttendanceChartData = ({
  timeRange,
}: {
  timeRange: TimeRange;
}) => {
  const { data, isLoading: isLoadingAttendance } = useQuery({
    queryKey: ["attendance", timeRange],
    queryFn: async () => {
      const supabase = createClient();
      const startDate = getTimeRangeFilter(timeRange);

      const { data, error } = await supabase
        .from("attendance")
        .select("meeting_type(type_name), total, meeting_date")
        .gte("meeting_date", startDate.toISOString());

      if (error) throw error;
      return data.map((attendance) => ({
        ...attendance,
        meeting_type: attendance.meeting_type?.type_name,
      }));
    },
  });
  const attendance = data ?? [];

  const attendanceSums: Record<string, number> = {};
  const attendanceCounts: Record<string, number> = {};

  attendance.forEach(({ meeting_type, total }) => {
    if (!meeting_type) return;
    if (!attendanceSums[meeting_type]) {
      attendanceSums[meeting_type] = 0;
      attendanceCounts[meeting_type] = 0;
    }
    attendanceSums[meeting_type] += total ?? 0;
    attendanceCounts[meeting_type]!++;
  });

  const averageAttendance = Object.keys(attendanceSums).map((meetingType) => ({
    meeting: meetingType as MeetingType,
    attendance: Math.round(
      attendanceSums[meetingType]! / attendanceCounts[meetingType]!,
    ),
  }));

  const attendanceChartData = useMemo<ChartData[]>(() => {
    if (averageAttendance.length === 0) return [];

    return averageAttendance.map(({ meeting, attendance }) => ({
      meeting,
      attendance,
      fill: MEETING_COLORS[meeting],
    }));
  }, [averageAttendance]);

  // Calculate averages for current period
  const currentPeriodAvg = attendance.length
    ? attendance.reduce((sum, { total }) => sum + (total ?? 0), 0) /
      attendance.length
    : 0;

  // Get previous period data
  const { data: previousData } = useQuery({
    queryKey: ["attendance", timeRange, "previous"],
    queryFn: async () => {
      const supabase = createClient();
      const currentStartDate = getTimeRangeFilter(timeRange);
      const previousStartDate = new Date(currentStartDate);

      switch (timeRange) {
        case "week":
          previousStartDate.setDate(previousStartDate.getDate() - 7);
          break;
        case "month":
          previousStartDate.setMonth(previousStartDate.getMonth() - 1);
          break;
        case "year":
          previousStartDate.setFullYear(previousStartDate.getFullYear() - 1);
          break;
      }

      const { data, error } = await supabase
        .from("attendance")
        .select("total")
        .gte("meeting_date", previousStartDate.toISOString())
        .lt("meeting_date", currentStartDate.toISOString());

      if (error) throw error;
      return data;
    },
  });

  const previousPeriodAvg = previousData?.length
    ? previousData.reduce((sum, { total }) => sum + (total ?? 0), 0) /
      previousData.length
    : 0;

  const growthPercentage =
    previousPeriodAvg === 0
      ? 0
      : ((currentPeriodAvg - previousPeriodAvg) / previousPeriodAvg) * 100;

  return {
    attendanceChartData,
    isLoadingAttendance,
    growthPercentage,
  };
};
