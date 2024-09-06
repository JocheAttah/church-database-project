"use client";

import Card from "@/components/card";
import MembersCard from "@/components/cards/members-card";
import TotalMembershipCard from "@/components/cards/total-membership-card";
import WorkersCard from "@/components/cards/workers-card";
import { PieChart } from "@/components/charts/pie-chart";
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
import { FunnelIcon } from "@heroicons/react/24/outline";
import { genderChartConfig } from "../chart-data";

const Membership = () => {
  const { genderChartData, isLoadingGender } = useGenderChartData();

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
                <DropdownMenuItem>Add Single Member</DropdownMenuItem>
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
