"use client";
import Card from "@/components/card";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";
import { PieChart } from "@/components/charts/pie-chart";
import GrowthIcon from "@/components/icons/growth-icon";
import GivingIcon from "@/components/icons/nav/giving-icon";
import MembershipIcon from "@/components/icons/nav/membership-icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  genderChartConfig,
  genderChartData,
  meetingChartConfig,
  meetingChartData,
  revenueExpenseChartConfig,
  revenueExpenseChartData,
  statusChartConfig,
  statusChartData,
} from "./chart-data";

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
        <Card className="col-span-4 space-y-6 sm:col-span-2 xl:col-span-1">
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

        <Card className="col-span-4 space-y-6 sm:col-span-2 xl:col-span-1">
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

        <Card className="col-span-4 xl:col-span-2 xl:row-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="rounded-[3px] bg-white/2 p-2.5">
                <MembershipIcon width={20} height={20} filled />
              </div>
              <p className="text-sm text-dustygray">Avg Attendance</p>
            </div>

            <div className="mb-4 flex flex-col space-y-2">
              <Select
                defaultValue={timeRange}
                onValueChange={(value: TimeRange) => setTimeRange(value)}
              >
                <SelectTrigger className="w-full sm:w-[250px]">
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
          <BarChart
            chartConfig={meetingChartConfig}
            chartData={meetingChartData}
          />
        </Card>

        <Card className="col-span-4 flex flex-col items-center justify-around sm:flex-row xl:col-span-2">
          <div>
            <p className="text-sm text-dustygray">Membership by gender</p>
            <PieChart
              chartData={genderChartData}
              chartConfig={genderChartConfig}
              nameKey="gender"
              dataKey="value"
            />
          </div>
          <div className="my-6 h-[1px] w-full bg-mineshaft sm:my-0 sm:-ml-5 sm:h-72 sm:w-[1px]" />
          <div>
            <p className="text-sm text-dustygray">Membership by status</p>
            <PieChart
              chartData={statusChartData}
              chartConfig={statusChartConfig}
              nameKey="status"
              dataKey="value"
            />
          </div>
        </Card>
        <Card className="col-span-4">
          <p className="mb-4 text-sm text-dustygray">Revenue and Expenses</p>
          <LineChart
            chartConfig={revenueExpenseChartConfig}
            chartData={revenueExpenseChartData}
          />
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
