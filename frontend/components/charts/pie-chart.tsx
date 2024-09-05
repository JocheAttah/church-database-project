"use client";

import { Pie, PieChart as RePieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type PieChartProps = {
  chartData: unknown[];
  chartConfig: ChartConfig;
  nameKey: string;
  dataKey: string;
  slim?: boolean;
};

export function PieChart({
  chartData,
  chartConfig,
  nameKey,
  dataKey,
  slim,
}: PieChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className={`duration-500 animate-in fade-in slide-in-from-bottom-3 ${slim ? "-mb-1 -mt-4 h-[180px] w-[180px]" : "-ml-5 h-[280px] w-[230px]"}`}
    >
      <RePieChart>
        <Pie
          data={chartData}
          nameKey={nameKey}
          dataKey={dataKey}
          innerRadius={slim ? 40 : 60}
        />
        <ChartTooltip content={<ChartTooltipContent suffix="%" />} />
        <ChartLegend content={<ChartLegendContent />} />
      </RePieChart>
    </ChartContainer>
  );
}
