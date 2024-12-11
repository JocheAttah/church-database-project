import Card from "@/components/card";
import GrowthIcon from "@/components/icons/growth-icon";
import MembershipBourBonIcon from "@/components/icons/nav/membership-icon-b";
import { Skeleton } from "@/components/ui/skeleton";
import { useMembership } from "@/hooks/useMembership";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import { useMemo } from "react";

type WorkersCardProps = {
  active?: boolean;
  cellFellowshipId?: number;
  isLoadingCellFellowship?: boolean;
} & ComponentPropsWithoutRef<"div">;

const WorkersCard = ({
  active,
  className,
  cellFellowshipId,
  isLoadingCellFellowship,
  ...props
}: WorkersCardProps) => {
  const {
    qualificationData,
    previousQualificationData,
    isLoading: isLoadingMembership,
  } = useMembership({ cellFellowshipId });
  const isLoading = isLoadingCellFellowship || isLoadingMembership;

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
    <Card
      className={cn(
        "w-full cursor-pointer space-y-6 transition-all duration-200 xl:max-w-[300px]",
        active ? "ring-2 ring-white" : "hover:ring-1 hover:ring-white",
        className,
      )}
      {...props}
    >
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
