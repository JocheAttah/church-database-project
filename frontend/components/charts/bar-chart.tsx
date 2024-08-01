"use client";

import { Bar, LabelList, BarChart as ReBarChart, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { meeting: "Sunday", attendance: 710, fill: "#FAA307" },
  { meeting: "Midweek", attendance: 423, fill: "#FAA307" },
  { meeting: "Fellowship", attendance: 456, fill: "#FAA307" },
  { meeting: "Prayer group", attendance: 356, fill: "#FAA307" },
];

const chartConfig = {
  Sunday: { label: "Sunday" },
  Midweek: { label: "Midweek" },
  Fellowship: { label: "Fellowship" },
  "Prayer group": { label: "Prayer group" },
} satisfies ChartConfig;

export function BarChart() {
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
