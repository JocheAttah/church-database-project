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

export const useAttendanceChartData = () => {
  const { data, isLoading: isLoadingAttendance } = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("attendance")
        .select("meeting_type, attendance");

      if (error) throw error;

      return { attendance: data };
    },
  });
  const { attendance } = data ?? { attendance: [] };

  const attendanceSums: Record<string, number> = {};
  const attendanceCounts: Record<string, number> = {};

  attendance.forEach(({ meeting_type, attendance }) => {
    if (!attendanceSums[meeting_type]) {
      attendanceSums[meeting_type] = 0;
      attendanceCounts[meeting_type] = 0;
    }
    attendanceSums[meeting_type] += attendance;
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

  return { attendanceChartData, isLoadingAttendance };
};
