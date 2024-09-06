"use client";
import Card from "@/components/card";
import TotalMembershipCard from "@/components/cards/total-membership-card";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useAttendanceChartData } from "@/hooks/useAttendanceChartData";
import { useGenderChartData } from "@/hooks/useGenderChartData";
import { useStatusChartData } from "@/hooks/useStatusChartData";
import { useState } from "react";
import {
  attendanceChartConfig,
  genderChartConfig,
  revenueExpenseChartConfig,
  revenueExpenseChartData,
  statusChartConfig,
} from "./chart-data";

const timeRanges = {
  week: "In the last week",
  month: "In the last month",
  year: "In the last year",
};
type TimeRange = keyof typeof timeRanges;

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("month");
  const { genderChartData, isLoadingGender } = useGenderChartData();
  const { statusChartData, isLoadingStatus } = useStatusChartData();
  const { attendanceChartData, isLoadingAttendance } = useAttendanceChartData();
  const isLoading = isLoadingGender || isLoadingStatus || isLoadingAttendance;

  return (
    <>
      <h1 className="mb-5">Dashboard</h1>
      <div className="grid grid-cols-4 gap-6">
        <TotalMembershipCard />
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

            {/* TODO: Add filter for attendance - time ranges */}
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
          {isLoading ? (
            <div className="flex h-[400px] w-full items-end justify-around">
              <Skeleton className="h-[70%] w-10" />
              <Skeleton className="h-[60%] w-10" />
              <Skeleton className="h-[90%] w-10" />
              <Skeleton className="h-[40%] w-10" />
            </div>
          ) : (
            <BarChart
              chartConfig={attendanceChartConfig}
              chartData={attendanceChartData}
            />
          )}
        </Card>

        <Card className="col-span-4 flex flex-col items-center justify-around sm:flex-row xl:col-span-2">
          <div className="h-[300px] w-[210px]">
            <p className="text-sm text-dustygray">Membership by gender</p>
            {isLoading ? (
              <div className="mt-5 space-y-5">
                <Skeleton className="h-[200px] w-[200px] rounded-full" />
                <Skeleton className="mx-auto h-10 w-3/4" />
              </div>
            ) : (
              <PieChart
                chartData={genderChartData}
                chartConfig={genderChartConfig}
                nameKey="gender"
                dataKey="value"
              />
            )}
          </div>

          <div className="my-6 h-[1px] w-full bg-mineshaft sm:my-0 sm:-ml-5 sm:h-72 sm:w-[1px]" />

          <div className="h-[300px] w-[210px]">
            <p className="text-sm text-dustygray">Membership by status</p>
            {isLoading ? (
              <div className="mt-5 space-y-5">
                <Skeleton className="h-[200px] w-[200px] rounded-full" />
                <Skeleton className="mx-auto h-10 w-3/4" />
              </div>
            ) : (
              <PieChart
                chartData={statusChartData}
                chartConfig={statusChartConfig}
                nameKey="status"
                dataKey="value"
              />
            )}
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
