import Card from "@/components/card";
import GrowthIcon from "@/components/icons/growth-icon";
import MembershipIcon from "@/components/icons/nav/membership-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useMembership } from "@/hooks/useMembership";
import { useMemo } from "react";

const TotalMembershipCard = () => {
  const { totalCount, previousCount, isLoading } = useMembership();

  const membershipGrowth = useMemo(() => {
    if (!totalCount || !previousCount) return 0;
    return ((totalCount - previousCount) / previousCount) * 100;
  }, [totalCount, previousCount]);

  return (
    <Card className="col-span-4 space-y-6 sm:col-span-2 xl:col-span-1">
      <div className="flex items-center gap-3.5">
        <div className="rounded-[3px] bg-white/2 p-2.5">
          <MembershipIcon width={20} height={20} filled />
        </div>
        <p className="text-sm text-dustygray">Total membership</p>
      </div>
      {isLoading ? (
        <Skeleton className="h-9 w-10" />
      ) : (
        <h1 className="duration-500 animate-in fade-in slide-in-from-bottom-3">
          {totalCount}
        </h1>
      )}

      <div className="flex items-center text-xs">
        {isLoading ? (
          <Skeleton className="h-5 w-40" />
        ) : (
          <div className="flex items-center duration-500 animate-in fade-in slide-in-from-bottom-3">
            <GrowthIcon />
            <p
              className={`ml-1 ${membershipGrowth >= 0 ? "text-junglegreen" : "text-red-500"}`}
            >
              {membershipGrowth.toFixed(1)}%
            </p>
            <p className="ml-2 text-dustygray">in the last month</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TotalMembershipCard;
