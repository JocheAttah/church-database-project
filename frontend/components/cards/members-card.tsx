import Card from "@/components/card";
import GrowthIcon from "@/components/icons/growth-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useMembership } from "@/hooks/useMembership";
import { useMemo } from "react";
import MembershipWhiskeyIcon from "../icons/nav/membership-icon-w";

const MembersCard = () => {
  const { qualificationData, previousQualificationData, isLoading } =
    useMembership();

  const currentMembers = qualificationData.filter(
    (member) => member.qualification === "Member",
  ).length;

  const lastMonthMembers = previousQualificationData.filter(
    (member) => member.qualification === "Member",
  ).length;

  const membersGrowth = useMemo(() => {
    if (!currentMembers || !lastMonthMembers) return 0;
    return ((currentMembers - lastMonthMembers) / lastMonthMembers) * 100;
  }, [currentMembers, lastMonthMembers]);

  return (
    <Card className="w-full space-y-6 xl:max-w-[300px]">
      <div className="flex items-center gap-3.5">
        <div className="rounded-[3px] bg-white/2 p-2.5">
          <MembershipWhiskeyIcon width={20} height={20} filled />
        </div>
        <p className="text-sm text-dustygray">Members and Disciples</p>
      </div>

      {isLoading ? (
        <Skeleton className="h-9 w-10" />
      ) : (
        <h1 className="duration-500 animate-in fade-in slide-in-from-bottom-3">
          {currentMembers}
        </h1>
      )}

      <div className="flex items-center text-xs">
        {isLoading ? (
          <Skeleton className="h-5 w-40" />
        ) : (
          <div className="flex items-center duration-500 animate-in fade-in slide-in-from-bottom-3">
            <GrowthIcon />
            <p
              className={`ml-1 ${membersGrowth >= 0 ? "text-junglegreen" : "text-red-500"}`}
            >
              {membersGrowth.toFixed(1)}%
            </p>
            <p className="ml-2 text-dustygray">in the last month</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MembersCard;
