import { useMemo } from "react";
import { useMembership } from "./useMembership";

type ChartData = {
  gender: "male" | "female";
  value: number;
  fill: string;
};

const GENDER_COLORS = {
  male: "#38B000",
  female: "#9165BD",
};

export const useGenderChartData = () => {
  const { genderData, isLoading: isLoadingGender } = useMembership();

  const genderChartData = useMemo<ChartData[]>(() => {
    if (genderData.length === 0) return [];

    const males = genderData.filter(
      (member) => member.gender?.toLowerCase() === "male",
    ).length;
    const females = genderData.filter(
      (member) => member.gender?.toLowerCase() === "female",
    ).length;
    const total = genderData.length;

    return [
      {
        gender: "male",
        value: Number(((males / total) * 100).toFixed(2)) || 1,
        fill: GENDER_COLORS.male,
      },
      {
        gender: "female",
        value: Number(((females / total) * 100).toFixed(2)) || 1,
        fill: GENDER_COLORS.female,
      },
    ];
  }, [genderData]);

  return { genderChartData, isLoadingGender };
};
