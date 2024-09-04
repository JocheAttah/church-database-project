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
      <div className="mt-8 rounded-md bg-shark p-4">
        <Card>
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <p className="mr-4 text-xl text-white">Membership list</p>
              <SearchInput />
            </div>
            <div className="flex flex-row items-center">
              <FunnelIcon className="mr-[5px] size-8 text-dustygray" />
              <p className="text-sm text-dustygray">Filter</p>
              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="ml-6 w-full rounded-md bg-sapphire-700 px-[20px] py-2.5 text-sm hover:bg-sapphire-800 active:bg-sapphire-900"
                      type="submit"
                    >
                      Update membership
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <DialogTrigger>Upload Excel Sheet</DialogTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <p>Add Single Member</p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Excel Sheet</DialogTitle>
                  </DialogHeader>
                  <div className="h-[1px] w-full bg-mineshaft" />
                  <Uploader />
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="rounded-md bg-sapphire-700 text-sm hover:bg-sapphire-800 active:bg-sapphire-900"
                    >
                      Update list
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Card>
        <MemberTable />
      </div>
    </>
  );
};

export default Membership;
