"use client";
import Card from "@/components/card";
import MembershipIcon from "@/components/icons/nav/membership-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useMembership } from "@/hooks/useMembership";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import { useMemo } from "react";
import GrowthIndicator from "../growth-indicator";

type TotalMembershipCardProps = {
  active?: boolean;
  cellFellowshipId?: number;
  isLoadingCellFellowship?: boolean;
} & ComponentPropsWithoutRef<"div">;

const TotalMembershipCard = ({
  active,
  className,
  cellFellowshipId,
  isLoadingCellFellowship,
  ...props
}: TotalMembershipCardProps) => {
  const pathname = usePathname();
  const isMembershipPage =
    pathname === "/dashboard/membership" ||
    pathname.includes("/dashboard/fellowships-cells/");

  const {
    totalCount,
    previousCount,
    isLoading: isLoadingMembership,
  } = useMembership({
    cellFellowshipId,
  });
  const isLoading = isLoadingCellFellowship || isLoadingMembership;

  const membershipGrowth = useMemo(() => {
    if (!totalCount || !previousCount) return 0;
    return ((totalCount - previousCount) / previousCount) * 100;
  }, [totalCount, previousCount]);

  return (
    <Card
      className={cn(
        "w-full space-y-6 transition-all duration-200",
        isMembershipPage && "cursor-pointer xl:max-w-[300px]",
        isMembershipPage && !active && "hover:ring-1 hover:ring-white",
        active && "ring-2 ring-white",
        className,
      )}
      {...props}
    >
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

      <GrowthIndicator
        growthPercentage={membershipGrowth}
        isLoading={isLoading}
      />
    </Card>
  );
};

export default TotalMembershipCard;
