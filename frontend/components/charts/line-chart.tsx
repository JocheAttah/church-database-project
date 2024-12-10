"use client";

import { Line, LineChart as ReLineChart, XAxis, YAxis } from "recharts";

import type {
  ChartConfig} from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import formatMoney from "@/utils/formatMoney";

type LineChartProps = {
  chartData: unknown[];
  chartConfig: ChartConfig;
};

export function LineChart({ chartConfig, chartData }: LineChartProps) {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  return (
    <ChartContainer config={chartConfig} className="max-h-[300px] min-w-full">
      <ReLineChart
        accessibilityLayer
        data={chartData}
        margin={{ left: isSmallScreen ? -5 : 24, right: 24 }}
      >
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          style={{ fill: "#979797" }}
          className="sm:text-sm"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          style={{ fill: "#979797" }}
          className="sm:text-sm"
          tickFormatter={(value) =>
            formatMoney(value, {
              ...(isSmallScreen && {
                shouldRoundDown: true,
                roundDownAmount: 1000,
              }),
            })
          }
          tickMargin={10}
          tickCount={4}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent labelClassName="text-black" prefix="₦" />
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
