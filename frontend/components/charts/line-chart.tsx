"use client";

import { Line, LineChart as ReLineChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", revenue: 200000, expenses: 100000 },
  { month: "February", revenue: 400000, expenses: 250000 },
  { month: "March", revenue: 250000, expenses: 150000 },
  { month: "April", revenue: 420000, expenses: 320000 },
  { month: "May", revenue: 150000, expenses: 50000 },
  { month: "June", revenue: 400000, expenses: 250000 },
  { month: "July", revenue: 350000, expenses: 150000 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#27AE60",
  },
  expenses: {
    label: "Expenses",
    color: "#FF9674",
  },
} satisfies ChartConfig;

export function LineChart() {
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
