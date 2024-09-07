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
import SearchInput from "@/components/search-input";
import MemberTable from "@/components/tables/members/members-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Uploader from "@/components/Uploader";
import { useGenderChartData } from "@/hooks/useGenderChartData";
import { createClient } from "@/utils/supabase/client";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, isValid, parse } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { genderChartConfig } from "../chart-data";

// Define a schema for a single member row
const memberRowSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, "Last name is required"),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Gender must be either 'Male' or 'Female'" }),
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
  cell_fellowship: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
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

// Add this helper function to convert date strings
const convertDateFormat = (dateString: string): string | null => {
  const formats = ["dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd"];

  for (const dateFormat of formats) {
    const parsedDate = parse(dateString, dateFormat, new Date());
    if (isValid(parsedDate)) {
      return format(parsedDate, "yyyy-MM-dd");
    }
  }

  return null;
};

// Function to validate a single row
const validateRow = (row: any, rowIndex: number) => {
  try {
    const validatedRow = memberRowSchema.parse(row);
    return { rowIndex, validatedData: validatedRow };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        rowIndex,
        errors: error.errors.map(
          (err) => `${err.path.join(".")}: ${err.message}`,
        ),
      };
    }
    return { rowIndex, errors: ["Unknown error occurred"] };
  }
};

// Function to validate all rows
const validateCsvData = (data: any[]) => {
  const errors: { rowIndex: number; errors: string[] }[] = [];
  const validatedData: any[] = [];

  data.forEach((row, index) => {
    const result = validateRow(row, index + 1);
    if (result.errors) {
      errors.push(result);
    } else {
      validatedData.push(result.validatedData);
    }
  });

  return { errors, validatedData };
};

const Membership = () => {
  const { genderChartData, isLoadingGender } = useGenderChartData();

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
  const [uploadedData, setUploadedData] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handleUpdateMembers = async () => {
    setLoading(true);
    if (uploadedData.length === 0) {
      toast.error("No data to update");
      setLoading(false);
      return;
    }

    // Validate the data
    const { errors, validatedData } = validateCsvData(uploadedData);

    if (errors.length > 0) {
      // Display validation errors
      errors.forEach(({ rowIndex, errors }) => {
        toast.error(`Row ${rowIndex} has errors:`, {
          description: errors.join(", "),
        });
      });
      setLoading(false);
      return;
    }

    const supabase = createClient();

    try {
      // Step 1: Insert validated data into staging table
      const { error: stagingError } = await supabase
        .from("members_staging")
        .insert(validatedData);

      if (stagingError) throw stagingError;

      // Step 2: Perform the upsert from staging to members table
      const { error: upsertError } = await supabase.rpc(
        "upsert_members_from_staging",
      );

      if (upsertError) throw upsertError;

      // Step 3: Clear the staging table
      const { error: clearError } = await supabase
        .from("members_staging")
        .delete()
        .neq("id", 0); // This will delete all rows

      if (clearError) throw clearError;

      toast.success("Members updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["members"],
        refetchType: "all",
      });
      setOpenUploadDialog(false);
    } catch (error) {
      console.error("Error updating members:", error);
      toast.error("Error updating members");
    } finally {
      setUploadedData([]);
      setLoading(false);
    }
  };

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
      {/* Table */}
      <Card className="mt-8 space-y-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap items-center gap-5">
            <h2>Membership list</h2>
            <SearchInput />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-dustygray">
              <FunnelIcon width={24} height={24} />
              <span>Filter</span>
            </div>
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
          </div>
        </div>
        <MemberTable />
      </Card>

      <Dialog open={openUploadDialog} onOpenChange={setOpenUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Excel Sheet</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="border-t border-mineshaft pt-7 text-white">
            <Uploader onFileUpload={(data) => setUploadedData(data)} />
            <DialogFooter className="mt-7">
              <Button
                variant="secondary"
                loading={loading}
                onClick={handleUpdateMembers}
                disabled={uploadedData.length === 0}
              >
                Update list
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

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
