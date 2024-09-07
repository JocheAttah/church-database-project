"use client";

import BackButton from "@/components/back-button";
import Card from "@/components/card";
import MemberTable from "@/components/tables/members/members-table";
import { createClient } from "@/utils/supabase/client";
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
        <MemberTable
          cellFellowshipId={cellFellowship?.id}
          isLoadingCellFellowship={isLoading}
          title={`${cellFellowship?.name} ${cellFellowship?.type} Members`}
          loadingTitle={isLoading}
        />
      </Card>
    </>
  );
};

export default FellowshipCellName;
