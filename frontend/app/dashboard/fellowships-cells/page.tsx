"use client";
import Card from "@/components/card";
import TotalMembershipCard from "@/components/cards/total-membership-card";
import ArrowSmallRightIcon from "@/components/icons/arrow-small-right-icon";
import FellowshipsCellsIcon from "@/components/icons/nav/fellowships-cells-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useCellFellowships } from "@/hooks/useCellFellowships";
import Link from "next/link";

const FellowshipsCells = () => {
  const { cellFellowships, isLoading } = useCellFellowships();
  return (
    <>
      <h1 className="mb-5">Fellowships/Cells</h1>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3">
        <TotalMembershipCard className="col-span-1 sm:col-span-1 xl:col-span-1" />

        {isLoading ? (
          <>
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="flex flex-col space-y-6">
                <div className="flex items-center gap-3.5">
                  <Skeleton className="h-10 w-10 rounded-[3px]" />
                  <Skeleton className="h-4 w-32" />
                </div>

                <Skeleton className="h-9 w-24" />

                <div className="flex items-center self-end">
                  <Skeleton className="mr-2 h-4 w-28" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </Card>
            ))}
          </>
        ) : (
          cellFellowships.map(({ name, type, id, memberCount }) => (
            <Link key={id} href={`fellowships-cells/${id}`}>
              <Card className="flex flex-col space-y-6">
                <div className="flex items-center gap-3.5">
                  <div className="rounded-[3px] bg-white/2 p-2.5">
                    <FellowshipsCellsIcon width={20} height={20} filled />
                  </div>
                  <p className="text-sm text-dustygray">{`${name} ${type}`}</p>
                </div>

                <h1 className="duration-500 animate-in fade-in slide-in-from-bottom-3">
                  {memberCount.toLocaleString()}
                </h1>

                <div className="flex items-center self-end text-dustygray">
                  <p className="text-xs">View membership</p>
                  <ArrowSmallRightIcon />
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default FellowshipsCells;
