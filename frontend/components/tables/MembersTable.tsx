import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMembership } from "@/hooks/useMembership";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import ChevronDownIcon from "../icons/chevron-down-icon";
import Pill from "../pill";
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

export default function MemberTable({
  cellFellowshipId,
  isLoadingCellFellowship,
}: {
  cellFellowshipId?: number;
  isLoadingCellFellowship?: boolean;
}) {
  const [page, setPage] = useState(1);
  const supabase = createClient();

  const getMembersByCellFellowship = async (
    cellFellowshipId: number,
    page: number,
  ) => {
    const { count } = await supabase
      .from("members")
      .select("*", { count: "exact", head: true })
      .eq("cell_fellowship_id", cellFellowshipId);

    const { data, error } = await supabase
      .from("members")
      .select("*, cell_fellowship(name,type)")
      .eq("cell_fellowship_id", cellFellowshipId)
      .range((page - 1) * 10, page * 10 - 1);

    if (error) throw error;
    return { members: data, totalCount: count || 0 };
  };

  const { data, isLoading: isLoadingMembers } = useQuery({
    queryKey: ["members", page, cellFellowshipId],
    queryFn: async () => {
      if (cellFellowshipId) {
        return getMembersByCellFellowship(cellFellowshipId, page);
      }
      const { data, error } = await supabase
        .from("members")
        .select("*, cell_fellowship(name,type)")
        .range((page - 1) * 10, page * 10 - 1);

      if (error) throw error;
      return { members: data, totalCount: 0 };
    },
  });

  const isLoading = isLoadingCellFellowship || isLoadingMembers;

  const { members, totalCount: totalMembersInCellFellowship } = data ?? {
    members: [],
    totalCount: 0,
  };

  const { totalCount: totalMembers } = useMembership();
  const currentCount = members.length;
  const totalCount = cellFellowshipId
    ? totalMembersInCellFellowship
    : totalMembers;

  return (
    <>
      <Table>
        <TableHeader className="bg-woodsmoke">
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>First name</TableHead>
            <TableHead>Last name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone number</TableHead>
            <TableHead>Membership Status</TableHead>
            <TableHead>Cell/Fellowship</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index} className="even:bg-shark-darker">
                <TableCell>
                  <Skeleton className="h-4 w-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
              </TableRow>
            ))
          ) : currentCount > 0 ? (
            members.map((member, index) => (
              <TableRow key={member.id} className="even:bg-shark-darker">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{member.first_name}</TableCell>
                <TableCell>{member.last_name}</TableCell>
                <TableCell>{member.gender}</TableCell>
                <TableCell>{member.phone ?? "-"}</TableCell>
                <TableCell>{member.qualification}</TableCell>
                <TableCell>
                  {member.cell_fellowship
                    ? `${member.cell_fellowship.name} ${
                        member.cell_fellowship.type
                      }`
                    : "-"}
                </TableCell>
                <TableCell>
                  {member.qualification === "Worker" ? (
                    <Pill>
                      <span className="text-greenhaze">Consistent</span>
                    </Pill>
                  ) : (
                    <Pill>
                      <span className="text-bourbon">Inconsistent</span>
                    </Pill>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center">
                      <span>Actions</span>
                      <ChevronDownIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link href={`membership/${member.id}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="pointer-events-none">
              <TableCell colSpan={9} className="text-center">
                <p className="mt-6">No results found</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!isLoading && currentCount > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-5">
          <p className="text-xs text-dustygray">
            Showing 1 to {currentCount} of {totalCount} results
          </p>
          {totalCount > currentCount && (
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
      )}
    </>
  );
}
