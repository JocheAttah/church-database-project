import { useMemo } from "react";
import { useMembership } from "./useMembership";

type ChartData = {
  status: string;
  value: number;
  fill: string;
};

const STATUS_COLORS = {
  workers: "#FAA307",
  members: "#38B000",
};

export const useStatusChartData = () => {
  const { qualificationData, isLoading: isLoadingStatus } = useMembership();

  const statusChartData = useMemo<ChartData[]>(() => {
    if (qualificationData.length === 0) return [];

    const workers = qualificationData.filter(
      (member) => member.qualification === "Worker",
    ).length;
    const members = qualificationData.filter(
      (member) => member.qualification === "Member",
    ).length;
    const total = qualificationData.length;

    return [
      {
        status: "workers",
        value: Number(((workers / total) * 100).toFixed(2)) || 1,
        fill: STATUS_COLORS.workers,
      },
      {
        status: "members",
        value: Number(((members / total) * 100).toFixed(2)) || 1,
        fill: STATUS_COLORS.members,
      },
    ];
  }, [qualificationData]);

  return { statusChartData, isLoadingStatus };
};
