"use client";

import { Bar, LabelList, BarChart as ReBarChart, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

type BarChartProps = {
  chartData: unknown[];
  chartConfig: ChartConfig;
};

export function BarChart({ chartConfig, chartData }: BarChartProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[450px] max-w-full">
      <ReBarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="meeting"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          style={{ fill: "#979797" }}
          className="text-sm"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          style={{ fill: "#979797" }}
          className="text-sm"
        />
        <Bar dataKey="attendance" radius={5} barSize={30}>
          <LabelList position="top" offset={12} fontSize={12} />
        </Bar>
      </ReBarChart>
    </ChartContainer>
  );
}
