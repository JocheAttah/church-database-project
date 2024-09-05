import { useAttendance } from "@/hooks/useAttendance";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ChevronDownIcon from "../icons/chevron-down-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const AttendanceTable = () => {
  const supabase = createClient();
  const [page, setPage] = useState(1);

  const { totalCount } = useAttendance();

  const { data, isLoading } = useQuery({
    queryKey: ["attendance", page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("attendance")
        .select("*")
        .range((page - 1) * 10, page * 10 - 1);

      if (error) throw error;

      return { attendance: data };
    },
  });
  const { attendance } = data ?? { attendance: [] };

  return (
    <>
      <Table>
        <TableHeader className="bg-woodsmoke">
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Meeting Type</TableHead>
            <TableHead>Attendance</TableHead>
            <TableHead>Absentees</TableHead>
            <TableHead>Meeting Date</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index} className="even:bg-shark-darker">
                  <TableCell>
                    <Skeleton className="h-4 w-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                </TableRow>
              ))
            : attendance.map((meeting, index) => (
                <TableRow key={index} className="even:bg-shark-darker">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{meeting.meeting_type}</TableCell>
                  <TableCell>{meeting.attendance}</TableCell>
                  <TableCell>{meeting.absentee}</TableCell>
                  <TableCell>{meeting.meeting_date}</TableCell>
                  <TableCell>{meeting.created_at}</TableCell>
                  <TableCell>{meeting.created_by}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center">
                        <span>Actions</span>
                        <ChevronDownIcon />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {/* TODO: decide on what to do with the detailed attendance page */}
                        {/* <DropdownMenuItem>
                          <Link href={`attendance/${meeting.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-5">
        {attendance.length > 0 && (
          <p className="text-xs text-dustygray">
            Showing 1 to {attendance.length} of {totalCount} results
          </p>
        )}
        {!isLoading && totalCount > attendance.length && (
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
        )}
      </div>
    </>
  );
};

export default AttendanceTable;
