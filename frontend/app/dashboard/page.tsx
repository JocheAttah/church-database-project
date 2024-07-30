"use client";
import Card from "@/components/card";
import { Donut } from "@/components/donut";
import GrowthIcon from "@/components/icons/growth-icon";
import GivingIcon from "@/components/icons/nav/giving-icon";
import MembershipIcon from "@/components/icons/nav/membership-icon";
import { ChartConfig } from "@/components/ui/chart";

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

const Dashboard = () => {
  return (
    <>
      <h1 className="mb-5">Dashboard</h1>
      <div className="grid grid-cols-4 gap-x-5 gap-y-8">
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

        <Card className="col-span-2 row-span-2">ajdlfasd</Card>
        <Card className="col-span-2">
          <div className="flex items-center justify-around">
            <div>
              <p className="text-sm text-dustygray">Membership by gender</p>
              <Donut
                chartData={genderChartData}
                chartConfig={genderChartConfig}
                nameKey="gender"
                dataKey="value"
              />
            </div>
            <div className="h-72 w-[1px] bg-mineshaft" />
            <div>
              <p className="text-sm text-dustygray">Membership by status</p>
              <Donut
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
