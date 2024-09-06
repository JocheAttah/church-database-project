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
import MemberTable from "@/components/tables/MembersTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { genderChartConfig } from "../chart-data";

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
      dob: "",
      class: "",
      discipled_by: "",
    },
    mode: "all",
  });

  const [open, setOpen] = useState(false);

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
    },
    onError: (error) => {
      console.error("Error adding member:", error);
      toast.error("Error adding member");
    },
    onSettled: () => {
      setOpen(false);
    },
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
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <Dialog>
                    <DialogTrigger>Upload Excel Sheet</DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Excel Sheet</DialogTitle>
                        <DialogDescription />
                      </DialogHeader>
                      <div className="h-[1px] w-full bg-mineshaft" />
                      <Uploader />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="submit" variant="secondary">
                            Update list
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <MemberDialog
                    isOpen={open}
                    onClose={setOpen}
                    trigger={<DialogTrigger>Add Single Member</DialogTrigger>}
                    title="Add Member"
                    isPending={isPending}
                    form={form}
                    onSubmit={onSubmit}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <MemberTable />
      </Card>
    </>
  );
};

export default Membership;
