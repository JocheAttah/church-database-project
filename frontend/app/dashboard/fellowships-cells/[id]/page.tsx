"use client";

import BackButton from "@/components/back-button";
import Card from "@/components/card";
import SearchInput from "@/components/search-input";
import MemberTable from "@/components/tables/members-table";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";

type FellowshipCellNameProps = { params: { id: string } };

const FellowshipCellName = ({ params }: FellowshipCellNameProps) => {
  const supabase = createClient();

  const { data: cellFellowship, isLoading } = useQuery({
    queryKey: ["cell_fellowship", params.id],
    queryFn: async () => {
      const { data: cellFellowship, error } = await supabase
        .from("cell_fellowship")
        .select("id, name, type")
        .eq("id", params.id)
        .single();

      if (cellFellowship) {
        return cellFellowship;
      } else {
        throw error;
      }
    },
  });

  if (!isLoading && !cellFellowship)
    return (
      <>
        <BackButton text="Fellowships/Cells" />
        <p>Fellowship/Cell not found</p>
      </>
    );

  return (
    <>
      <BackButton text="Fellowships/Cells" />

      <Card className="space-y-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap items-center gap-5">
            {isLoading ? (
              <Skeleton className="h-9 w-36" />
            ) : (
              <h2 className="duration-500 animate-in fade-in slide-in-from-bottom-3">
                {cellFellowship?.name} {cellFellowship?.type}
              </h2>
            )}
            <SearchInput />
          </div>
          <div className="flex items-center gap-1 text-sm text-dustygray">
            <FunnelIcon width={24} height={24} />
            <span>Filter</span>
          </div>
        </div>
        <MemberTable
          cellFellowshipId={cellFellowship?.id}
          isLoadingCellFellowship={isLoading}
        />
      </Card>
    </>
  );
};

export default FellowshipCellName;
