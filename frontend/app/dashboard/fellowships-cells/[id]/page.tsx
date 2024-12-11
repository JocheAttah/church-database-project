"use client";

import BackButton from "@/components/back-button";
import Card from "@/components/card";
import MembersCard from "@/components/cards/members-card";
import TotalMembershipCard from "@/components/cards/total-membership-card";
import WorkersCard from "@/components/cards/workers-card";
import type { MemberType } from "@/components/dialogs/member-dialog";
import MemberDialog, {
  memberFormSchema,
} from "@/components/dialogs/member-dialog";
import MemberTable from "@/components/tables/members/members-table";
import { Button } from "@/components/ui/button";
import { useAddMember } from "@/hooks/useAddMember";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

  const defaultValues = {
    first_name: "",
    last_name: "",
    gender: "",
    marital_status: "",
    qualification: "",
    cell_fellowship_id: cellFellowship?.id,
    phone: "",
    email: "",
    dob: null,
    class: "",
    discipled_by: "",
  };

  const form = useForm<MemberType>({
    resolver: zodResolver(memberFormSchema),
    defaultValues,
    mode: "all",
    values: cellFellowship
      ? {
          ...defaultValues,
          cell_fellowship_id: cellFellowship.id,
        }
      : undefined,
  });

  const { addMember, isPending, openAddMemberDialog, setOpenAddMemberDialog } =
    useAddMember({ form });

  function onSubmit(values: MemberType) {
    addMember(values);
  }

  const [qualificationFilter, setQualificationFilter] = useState<string | null>(
    null,
  );

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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:flex">
        <TotalMembershipCard
          active={qualificationFilter === null}
          onClick={() =>
            qualificationFilter !== null && setQualificationFilter(null)
          }
          cellFellowshipId={cellFellowship?.id}
          isLoadingCellFellowship={isLoading}
        />
        <WorkersCard
          active={qualificationFilter === "Worker"}
          onClick={() =>
            qualificationFilter !== "Worker" && setQualificationFilter("Worker")
          }
          cellFellowshipId={cellFellowship?.id}
          isLoadingCellFellowship={isLoading}
        />
        <MembersCard
          active={qualificationFilter === "Member"}
          onClick={() =>
            qualificationFilter !== "Member" && setQualificationFilter("Member")
          }
          cellFellowshipId={cellFellowship?.id}
          isLoadingCellFellowship={isLoading}
        />
      </div>

      <Card className="mt-8 space-y-5 p-6">
        <MemberTable
          cellFellowshipId={cellFellowship?.id}
          qualificationFilter={qualificationFilter}
          isLoadingCellFellowship={isLoading}
          title={`${cellFellowship?.name} ${cellFellowship?.type} Members`}
          loadingTitle={isLoading}
          actionButton={
            <Button
              variant="secondary"
              onClick={() => setOpenAddMemberDialog(true)}
            >
              Add Member
            </Button>
          }
        />
      </Card>

      <MemberDialog
        isOpen={openAddMemberDialog}
        onClose={setOpenAddMemberDialog}
        title="Add Member"
        isPending={isPending}
        form={form}
        onSubmit={onSubmit}
        disableFellowshipId
      />
    </>
  );
};

export default FellowshipCellName;
