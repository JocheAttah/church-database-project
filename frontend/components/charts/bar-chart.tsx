"use client";

import { Bar, LabelList, BarChart as ReBarChart, XAxis, YAxis } from "recharts";

import type {
  ChartConfig} from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type BarChartProps = {
  chartData: unknown[];
  chartConfig: ChartConfig;
};

export function BarChart({ chartConfig, chartData }: BarChartProps) {
  const isSmallScreen = useMediaQuery("(max-width: 480px)");
  return (
    <ChartContainer config={chartConfig} className="min-h-[450px] max-w-full">
      <ReBarChart accessibilityLayer data={chartData} margin={{ left: -20 }}>
        <XAxis
          dataKey="meeting"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          style={{ fill: "#979797" }}
          className="sm:text-sm"
          tickFormatter={(value) =>
            isSmallScreen ? value.slice(0, 3) : value.split(" ")[0]
          }
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          style={{ fill: "#979797" }}
          className="sm:text-sm"
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent labelClassName="text-black" />}
        />
        <Bar dataKey="attendance" radius={5} barSize={isSmallScreen ? 20 : 30}>
          <LabelList position="top" offset={12} fontSize={12} />
        </Bar>
      </ReBarChart>
    </ChartContainer>
  );
}
