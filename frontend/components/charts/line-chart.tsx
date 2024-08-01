"use client";

import { Line, LineChart as ReLineChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type LineChartProps = {
  chartData: unknown[];
  chartConfig: ChartConfig;
};

export function LineChart({ chartConfig, chartData }: LineChartProps) {
  return (
    <ChartContainer config={chartConfig} className="max-h-[300px] min-w-full">
      <ReLineChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 24, right: 24 }}
      >
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          style={{ fill: "#979797" }}
          className="text-sm"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          style={{ fill: "#979797" }}
          className="text-sm"
          tickFormatter={(value) => `N${value.toLocaleString()}`}
          tickMargin={10}
          tickCount={4}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent labelClassName="text-black" prefix="N" />
          }
        />
        <Line
          dataKey="revenue"
          type="monotone"
          stroke="var(--color-revenue)"
          strokeWidth={2}
        />
        <Line
          dataKey="expenses"
          type="monotone"
          stroke="var(--color-expenses)"
          strokeWidth={2}
        />
      </ReLineChart>
    </ChartContainer>
  );
}
