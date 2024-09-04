import Card from "@/components/card";
import GrowthIcon from "@/components/icons/growth-icon";
import MembershipBourBonIcon from "@/components/icons/nav/membership-icon-b";
import { Skeleton } from "@/components/ui/skeleton";
import { useMembership } from "@/hooks/useMembership";
import { useMemo } from "react";

const WorkersCard = () => {
  const { qualificationData, previousQualificationData, isLoading } =
    useMembership();

  const currentWorkers = qualificationData.filter(
    (member) => member.qualification === "Worker",
  ).length;

  const lastMonthWorkers = previousQualificationData.filter(
    (member) => member.qualification === "Worker",
  ).length;

  const workersGrowth = useMemo(() => {
    if (!currentWorkers || !lastMonthWorkers) return 0;
    return ((currentWorkers - lastMonthWorkers) / lastMonthWorkers) * 100;
  }, [currentWorkers, lastMonthWorkers]);

  return (
    <Card className="col-span-4 space-y-6 sm:col-span-2 xl:col-span-1">
      <div className="flex items-center gap-3.5">
        <div className="rounded-[3px] bg-white/2 p-2.5">
          <MembershipBourBonIcon width={20} height={20} filled />
        </div>
        <p className="text-sm text-dustygray">Workers in Training</p>
      </div>
      {isLoading ? (
        <Skeleton className="h-9 w-10" />
      ) : (
        <h1 className="duration-500 animate-in fade-in slide-in-from-bottom-3">
          {currentWorkers}
        </h1>
      )}

      <div className="flex items-center text-xs">
        {isLoading ? (
          <Skeleton className="h-5 w-40" />
        ) : (
          <div className="flex items-center duration-500 animate-in fade-in slide-in-from-bottom-3">
            <GrowthIcon />
            <p
              className={`ml-1 ${workersGrowth >= 0 ? "text-junglegreen" : "text-red-500"}`}
            >
              {workersGrowth.toFixed(1)}%
            </p>
            <p className="ml-2 text-dustygray">in the last month</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WorkersCard;
