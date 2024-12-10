"use client";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UploadDialog from "@/components/upload-dialog";
import { useAddMember } from "@/hooks/useAddMember";
import { useCellFellowships } from "@/hooks/useCellFellowships";
import { useCSVUpload } from "@/hooks/useCSVUpload";
import convertDateFormat from "@/utils/convertDateFormat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Membership = () => {
  // const { genderChartData, isLoadingGender } = useGenderChartData();
  const { cellFellowships } = useCellFellowships();

  const form = useForm<MemberType>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "",
      marital_status: "",
      qualification: "",
      cell_fellowship_id: undefined,
      phone: "",
      email: "",
      dob: null,
      class: "",
      discipled_by: "",
    },
    mode: "all",
  });

  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  const { addMember, isPending, openAddMemberDialog, setOpenAddMemberDialog } =
    useAddMember({
      form,
    });

  function onSubmit(values: MemberType) {
    addMember(values);
  }

  const memberRowSchema = useMemo(() => {
    return z.object({
      first_name: z.string().min(1, "First name is required"),
      middle_name: z.string().optional(),
      last_name: z.string().min(1, "Last name is required"),
      gender: z.union([z.enum(["Male", "Female"]), z.literal("")]),
      marital_status: z.union([z.enum(["Single", "Married"]), z.literal("")]),
      qualification: z.union([z.enum(["Worker", "Member"]), z.literal("")]),
      cell_fellowship: z.enum(
        cellFellowships.map((cf) => cf.name) as [string, ...string[]],
        {
          errorMap: () => ({
            message: "Cell fellowship must be a valid cell fellowship",
          }),
        },
      ),
      phone: z.string().optional(),
      email: z
        .string()
        .email("Invalid email address")
        .optional()
        .or(z.literal("")),
      dob: z
        .string()
        .optional()
        .transform((val) => {
          if (!val) return null;
          const convertedDate = convertDateFormat(val);
          if (!convertedDate) {
            throw new Error("Invalid date format");
          }
          return convertedDate;
        }),
      class: z.union([
        z.enum(["Working Class", "Unemployed", "Student"]),
        z.literal(""),
      ]),
      discipled_by: z.string().optional(),
    });
  }, [cellFellowships]);

  const {
    uploadedData,
    setUploadedData,
    loading,
    handleUpload: handleUpdateMembers,
  } = useCSVUpload({
    schema: memberRowSchema,
    stagingTable: "members_staging",
    upsertFunction: "upsert_members_from_staging",
    invalidateQueries: ["members", "cell_fellowship"],
    setOpenUploadDialog,
  });

  const [qualificationFilter, setQualificationFilter] = useState<string | null>(
    null,
  );

  return (
    <>
      <h1 className="mb-5">Membership</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:flex">
        <TotalMembershipCard
          active={qualificationFilter === null}
          onClick={() =>
            qualificationFilter !== null && setQualificationFilter(null)
          }
        />
        <WorkersCard
          active={qualificationFilter === "Worker"}
          onClick={() =>
            qualificationFilter !== "Worker" && setQualificationFilter("Worker")
          }
        />
        <MembersCard
          active={qualificationFilter === "Member"}
          onClick={() =>
            qualificationFilter !== "Member" && setQualificationFilter("Member")
          }
        />
        {/* <Card className="col-span-4 flex items-center justify-center space-y-6 sm:col-span-2 xl:col-span-1">
          {isLoadingGender ? (
            <div className="flex flex-col items-center space-y-5">
              <Skeleton className="h-[100px] w-[100px] rounded-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : (
            <PieChart
              chartData={genderChartData}
              chartConfig={genderChartConfig}
              nameKey="gender"
              dataKey="value"
              slim
            />
          )}
        </Card> */}
      </div>

      <Card className="mt-8 space-y-5 p-6">
        <MemberTable
          title="Membership List"
          qualificationFilter={qualificationFilter}
          actionButton={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">Update membership</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setOpenUploadDialog(true)}>
                  Upload Excel Sheet
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setOpenAddMemberDialog(true)}>
                  Add Single Member
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />
      </Card>

      <UploadDialog
        isOpen={openUploadDialog}
        onOpenChange={setOpenUploadDialog}
        title="Upload Excel Sheet"
        onUpload={handleUpdateMembers}
        onFileUpload={setUploadedData}
        loading={loading}
        uploadedDataLength={uploadedData.length}
      />

      <MemberDialog
        isOpen={openAddMemberDialog}
        onClose={setOpenAddMemberDialog}
        title="Add Member"
        isPending={isPending}
        form={form}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Membership;
