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
};

export function PieChart({
  chartData,
  chartConfig,
  nameKey,
  dataKey,
}: PieChartProps) {
  return (
    <ChartContainer config={chartConfig} className="-ml-5 h-[280px] w-[230px]">
      <RePieChart>
        <Pie
          data={chartData}
          nameKey={nameKey}
          dataKey={dataKey}
          innerRadius={60}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </RePieChart>
    </ChartContainer>
  );
}
