"use client";
import Card from "@/components/card";
import GrowthIcon from "@/components/icons/growth-icon";
import GivingIcon from "@/components/icons/nav/giving-icon";
import MembershipIcon from "@/components/icons/nav/membership-icon";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  return (
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
          <p className="text-junglegreen ml-1">1.7%</p>
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
          <p className="text-junglegreen ml-1">16%</p>
          <p className="ml-2 text-dustygray">in the last month</p>
        </div>
      </Card>

      <Card className="col-span-2 row-span-2">ajdlfasd</Card>
      <Card className="col-span-2">
        <Doughnut data={data} />
      </Card>
    </div>
  );
};

export default Dashboard;
