"use client";

import Card from "@/components/card";
import { PieChart } from "@/components/charts/pie-chart";
import GrowthIcon from "@/components/icons/growth-icon";
import MembershipIcon from "@/components/icons/nav/membership-icon";
import MembershipBourBonIcon from "@/components/icons/nav/membership-icon-b";
import MembershipWhiskeyIcon from "@/components/icons/nav/membership-icon-w";
import { Button } from "@/components/ui/button";
import { DocumentIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { CloudArrowDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { genderChartConfig, genderChartData } from "../chart-data";
import MemberTable from "@/components/tables/MembersTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import SearchInput from "@/components/search-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChevronDownIcon from "@/components/icons/chevron-down-icon";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Uploader from "@/components/Uploader";
import { useState } from "react";
import { formatFileSize } from "@/utils/formatFileSize";
import { truncateMiddle } from "@/utils/truncateText";

const Membership = () => {
  const [files, setFiles] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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

            <h1>10,000</h1>

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

            <h1>300</h1>

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

            <h1>7,700</h1>

            <div className="flex items-center text-xs">
              <GrowthIcon />
              <p className="ml-1 text-junglegreen">16%</p>
              <p className="ml-2 text-dustygray">in the last month</p>
            </div>
          </Card>
        </div>
        {/* Gender Chart */}
        <Card className="mt-8 h-[180px] w-full md:ml-5 md:mt-0 md:w-[207px]">
          <PieChart
            chartData={genderChartData}
            chartConfig={genderChartConfig}
            nameKey="gender"
            dataKey="value"
            slim
          />
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
                  <DropdownMenuTrigger className="flex items-center">
                    <Button
                      className="ml-6 w-full rounded-md bg-sapphire-700 px-[20px] py-2.5 text-sm hover:bg-sapphire-800 active:bg-sapphire-900"
                      type="submit"
                    >
                      Update membership
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      {/* <Link href={"/"}>Upload Excel Sheet</Link> */}
                      <DialogTrigger>Upload Excel Sheet</DialogTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/"}>Add Single Member</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Excel Sheet</DialogTitle>
                  </DialogHeader>
                  <div className="h-[1px] w-full bg-mineshaft" />
                  <Uploader setFiles={setFiles} />
                  {files && (
                    <div className="rounded-xl bg-[#1D1E20] px-2.5 pb-5 pt-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#232325]">
                            <DocumentIcon className="w-6 text-white" />
                          </div>
                          <div className="ml-1 w-[95%] overflow-hidden text-ellipsis whitespace-nowrap text-white">
                            <div className="text-sm">
                              {truncateMiddle(files[0]?.name, 50)}
                            </div>
                            <div className="text-[8px] text-[#979797]">
                              {formatFileSize(files[0]?.size)}
                            </div>
                          </div>
                        </div>

                        <div onClick={() => setFiles(null)}>
                          <XMarkIcon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      {/* progress */}
                      {/* <div className=""></div> */}
                    </div>
                  )}
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
        <div className="mt-4 flex flex-wrap items-center justify-between gap-5">
          <p className="text-xs text-dustygray">
            Showing 1 to 10 of 120 results
          </p>
          <Pagination className="mx-0 w-fit justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Membership;
