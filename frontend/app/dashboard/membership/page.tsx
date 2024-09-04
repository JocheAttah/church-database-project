"use client";

import Card from "@/components/card";
import { PieChart } from "@/components/charts/pie-chart";
import GrowthIcon from "@/components/icons/growth-icon";
import MembershipIcon from "@/components/icons/nav/membership-icon";
import MembershipBourBonIcon from "@/components/icons/nav/membership-icon-b";
import MembershipWhiskeyIcon from "@/components/icons/nav/membership-icon-w";
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
import { useMembership } from "@/hooks/useMembership";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { genderChartConfig } from "../chart-data";

const Membership = () => {
  const { totalCount, qualificationData, isLoading } = useMembership();
  const { genderChartData, isLoadingGender } = useGenderChartData();

  return (
    <div className="flex w-full flex-col">
      <h1 className="mb-5">Membership</h1>
      <div className="flex w-full flex-1 flex-col items-start md:flex-row">
        <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-3">
          {/* Total membership */}
          <Card className="space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="rounded-[3px] bg-white/2 p-2.5">
                <MembershipIcon width={20} height={20} filled />
              </div>
              <p className="text-sm text-dustygray">Total membership</p>
            </div>

            {isLoading ? (
              <Skeleton className="h-9 w-10" />
            ) : (
              <h1 className="duration-500 animate-in fade-in slide-in-from-bottom-3">
                {totalCount}
              </h1>
            )}

            <div className="flex items-center text-xs">
              <GrowthIcon />
              <p className="ml-1 text-junglegreen">1.7%</p>
              <p className="ml-2 text-dustygray">in the last month</p>
            </div>
          </Card>
          {/* Workers in Training */}
          <Card className="space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="rounded-[3px] bg-white/2 p-2.5">
                <MembershipBourBonIcon width={20} height={20} filled />
              </div>
              <p className="text-sm text-dustygray">Workers in Training</p>
            </div>

            {isLoading ? (
              <Skeleton className="h-9 w-10" />
            ) : (
              <h1 className="duration-500 animate-in fade-in slide-in-from-bottom-3">
                {
                  qualificationData.filter(
                    (member) => member.qualification === "Worker",
                  ).length
                }
              </h1>
            )}

            <div className="flex items-center text-xs">
              <GrowthIcon />
              <p className="ml-1 text-junglegreen">16%</p>
              <p className="ml-2 text-dustygray">in the last month</p>
            </div>
          </Card>
          {/* Members and Disciples */}
          <Card className="space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="rounded-[3px] bg-white/2 p-2.5">
                <MembershipWhiskeyIcon width={20} height={20} filled />
              </div>
              <p className="text-sm text-dustygray">Members and Disciples</p>
            </div>

            {isLoading ? (
              <Skeleton className="h-9 w-10" />
            ) : (
              <h1 className="duration-500 animate-in fade-in slide-in-from-bottom-3">
                {
                  qualificationData.filter(
                    (member) => member.qualification === "Member",
                  ).length
                }
              </h1>
            )}

            <div className="flex items-center text-xs">
              <GrowthIcon />
              <p className="ml-1 text-junglegreen">16%</p>
              <p className="ml-2 text-dustygray">in the last month</p>
            </div>
          </Card>
        </div>
        {/* Gender Chart */}
        <Card className="mt-8 h-[180px] w-full md:ml-5 md:mt-0 md:w-[207px]">
          {isLoadingGender ? (
            <div className="flex flex-col items-center justify-center space-y-5">
              <Skeleton className="h-[100px] w-[100px] rounded-full" />
              <Skeleton className="h-8 w-3/4" />
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
    </div>
  );
};

export default Membership;
