"use client";
import BackButton from "@/components/back-button";
import Card from "@/components/card";
import SearchInput from "@/components/search-input";
import AttendanceMeetingTable from "@/components/tables/attendance-meeting-table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FellowshipCellNameProps = { params: { "meeting-id": string } };
export type Selectors = "attendance" | "workers" | "members-disciples";

const AttendanceMeeting = ({ params }: FellowshipCellNameProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState<Selectors>("attendance");

  return (
    <>
      <BackButton text="Attendance" />

      <div className="mb-8 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Card
          className={cn(
            "flex flex-1 cursor-pointer flex-col space-y-7 pb-10 pt-7",
            selected === "attendance" && "border border-white",
          )}
          onClick={() => setSelected("attendance")}
        >
          <p className="text-sm text-dustygray">Overall Attendance</p>
          <h1>2,876</h1>
        </Card>
        <Card
          className={cn(
            "flex flex-1 cursor-pointer flex-col space-y-7 pb-10 pt-7",
            selected === "workers" && "border border-white",
          )}
          onClick={() => setSelected("workers")}
        >
          <p className="text-sm text-dustygray">Workers in Attendance</p>
          <h1>300</h1>
        </Card>
        <Card
          className={cn(
            "flex flex-1 cursor-pointer flex-col space-y-7 pb-10 pt-7",
            selected === "members-disciples" && "border border-white",
          )}
          onClick={() => setSelected("members-disciples")}
        >
          <p className="text-sm text-dustygray">
            Members and Disciples in Attendance
          </p>
          <h1>2,576</h1>
        </Card>
        <Card className="flex flex-1 flex-col space-y-7 pb-10 pt-7">
          <p className="text-sm text-dustygray">Absentees</p>
          <h1>150</h1>
        </Card>
      </div>

      <Card className="space-y-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap items-center gap-5">
            <h2>Sunday Service, 11/03/2024</h2>
            <SearchInput />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button variant="secondary">Download</Button>
            <div className="flex items-center gap-1 text-sm text-dustygray">
              <FunnelIcon width={24} height={24} />
              <span>Filter</span>
            </div>
          </div>
        </div>
        <AttendanceMeetingTable selected={selected} />

        <div className="flex flex-wrap items-center justify-between gap-5">
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
      </Card>
    </>
  );
};

export default AttendanceMeeting;
