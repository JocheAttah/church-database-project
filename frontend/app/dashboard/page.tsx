"use client";
import Card from "@/components/card";
import { BarChart } from "@/components/charts/bar-chart";
import { PieChart } from "@/components/charts/pie-chart";
import GrowthIcon from "@/components/icons/growth-icon";
import GivingIcon from "@/components/icons/nav/giving-icon";
import MembershipIcon from "@/components/icons/nav/membership-icon";
import { ChartConfig } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const genderChartData = [
  { gender: "male", value: 77, fill: "#044FA6" },
  { gender: "female", value: 23, fill: "#9165BD" },
];

const genderChartConfig = {
  male: { label: "Male" },
  female: { label: "Female" },
} satisfies ChartConfig;

const statusChartData = [
  { status: "workers", value: 72, fill: "#FAA307" },
  { status: "member", value: 28, fill: "#38B000" },
];

const statusChartConfig = {
  workers: { label: "Workers" },
  member: { label: "Member" },
} satisfies ChartConfig;

const timeRanges = {
  week: "In the last week",
  month: "In the last month",
  year: "In the last year",
};
type TimeRange = keyof typeof timeRanges;
const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("month");

  return (
    <>
      <h1 className="mb-5">Dashboard</h1>
      <div className="grid grid-cols-4 gap-6">
        <Card className="space-y-6">
          <div className="flex items-center gap-3.5">
            <div className="rounded-[3px] bg-white/2 p-2.5">
              <MembershipIcon width={20} height={20} filled />
            </div>
            <p className="text-sm text-dustygray">Total membership</p>
          </div>

          <h1>10,000</h1>

          <div className="flex items-center text-xs">
            <GrowthIcon />
            <p className="ml-1 text-junglegreen">1.7%</p>
            <p className="ml-2 text-dustygray">in the last month</p>
          </div>
        </Card>

        <Card className="space-y-6">
          <div className="flex items-center gap-3.5">
            <div className="rounded-[3px] bg-white/2 p-2.5">
              <GivingIcon
                width={20}
                height={20}
                filled
                className="text-vividtangerine"
              />
            </div>
            <p className="text-sm text-dustygray">Total revenue</p>
          </div>

          <h1>₦120,050</h1>

          <div className="flex items-center text-xs">
            <GrowthIcon />
            <p className="ml-1 text-junglegreen">16%</p>
            <p className="ml-2 text-dustygray">in the last month</p>
          </div>
        </Card>

        <Card className="col-span-2 row-span-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div className="rounded-[3px] bg-white/2 p-2.5">
                <MembershipIcon width={20} height={20} filled />
              </div>
              <p className="text-sm text-dustygray">Avg Attendance</p>
            </div>

            <div className="flex flex-col space-y-2">
              <Select
                defaultValue={timeRange}
                onValueChange={(value: TimeRange) => setTimeRange(value)}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">{timeRanges.week}</SelectItem>
                  <SelectItem value="month">{timeRanges.month}</SelectItem>
                  <SelectItem value="year">{timeRanges.year}</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center self-end text-xs">
                <GrowthIcon />
                <p className="ml-1 text-junglegreen">1.7%</p>
                <p className="ml-2 text-dustygray">
                  {timeRanges[timeRange].toLowerCase()}
                </p>
              </div>
            </div>
          </div>
          <BarChart />
        </Card>

        <Card className="col-span-2">
          <div className="flex items-center justify-around">
            <div>
              <p className="text-sm text-dustygray">Membership by gender</p>
              <PieChart
                chartData={genderChartData}
                chartConfig={genderChartConfig}
                nameKey="gender"
                dataKey="value"
              />
            </div>
            <div className="h-72 w-[1px] bg-mineshaft" />
            <div>
              <p className="text-sm text-dustygray">Membership by status</p>
              <PieChart
                chartData={statusChartData}
                chartConfig={statusChartConfig}
                nameKey="status"
                dataKey="value"
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
