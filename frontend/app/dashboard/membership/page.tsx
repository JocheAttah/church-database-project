"use client";

import Card from "@/components/card";
import MembersCard from "@/components/cards/members-card";
import TotalMembershipCard from "@/components/cards/total-membership-card";
import WorkersCard from "@/components/cards/workers-card";
import { PieChart } from "@/components/charts/pie-chart";
import MemberDialog, {
  memberFormSchema,
  MemberType,
} from "@/components/dialogs/member-dialog";
import MemberTable from "@/components/tables/members/members-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import UploadDialog from "@/components/upload-dialog";
import { useCellFellowships } from "@/hooks/useCellFellowships";
import { useCSVUpload } from "@/hooks/useCSVUpload";
import { useGenderChartData } from "@/hooks/useGenderChartData";
import convertDateFormat from "@/utils/convertDateFormat";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { genderChartConfig } from "../chart-data";

const Membership = () => {
  const { genderChartData, isLoadingGender } = useGenderChartData();
  const { cellFellowships, isLoading: isLoadingCellFellowships } =
    useCellFellowships();

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
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: MemberType) => {
      const supabase = createClient();
      const { error } = await supabase.from("members").insert(values);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["cell_fellowship"],
        refetchType: "all",
      });
      toast.success("Member added successfully");
      setOpenAddMemberDialog(false);
      form.reset();
    },
    onError: (error) => {
      console.error("Error adding member:", error);
      toast.error("Error adding member", {
        description: error.message,
      });
    },
  });

  const memberRowSchema = useMemo(() => {
    return z.object({
      first_name: z.string().min(1, "First name is required"),
      middle_name: z.string().optional(),
      last_name: z.string().min(1, "Last name is required"),
      gender: z.enum(["Male", "Female"], {
        errorMap: () => ({
          message: "Gender must be either 'Male' or 'Female'",
        }),
      }),
      marital_status: z.enum(["Single", "Married"], {
        errorMap: () => ({
          message: "Marital status must be either 'Single' or 'Married'",
        }),
      }),
      qualification: z.enum(["Worker", "Member"], {
        errorMap: () => ({
          message: "Qualification must be either 'Worker' or 'Member'",
        }),
      }),
      cell_fellowship: z.union(
        [
          z.enum(cellFellowships.map((cf) => cf.name) as [string, ...string[]]),
          z.literal(""),
        ],
        {
          errorMap: () => ({
            message: "Cell fellowship must be a valid cell fellowship or empty",
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
      class: z.enum(["Working Class", "Unemployed", "Student"], {
        errorMap: () => ({
          message: "Class must be 'Working Class', 'Unemployed', or 'Student'",
        }),
      }),
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

  function onSubmit(values: MemberType) {
    mutate(values);
  }

  return (
    <>
      <h1 className="mb-5">Membership</h1>
      <div className="grid grid-cols-4 gap-6">
        <TotalMembershipCard />
        <WorkersCard />
        <MembersCard />
        <Card className="col-span-4 flex items-center justify-center space-y-6 sm:col-span-2 xl:col-span-1">
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
        </Card>
      </div>

      <Card className="mt-8 space-y-5 p-6">
        <MemberTable
          title="Membership List"
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
