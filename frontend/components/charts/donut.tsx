"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type DonutProps = {
  chartData: unknown[];
  chartConfig: ChartConfig;
  nameKey: string;
  dataKey: string;
};

export function Donut({
  chartData,
  chartConfig,
  nameKey,
  dataKey,
}: DonutProps) {
  return (
    <ChartContainer config={chartConfig} className="-ml-5 h-[280px] w-[230px]">
      <PieChart>
        <Pie
          data={chartData}
          nameKey={nameKey}
          dataKey={dataKey}
          innerRadius={60}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  );
}
