"use client";

import ChevronDownIcon from "@/components/icons/chevron-down-icon";
import Pill from "@/components/pill";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tables } from "@/utils/database.types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type Member = Tables<"members_with_cell_fellowship">;

export const columns: ({
  setOpen,
  setSelectedMemberId,
  pagination,
}: {
  setOpen: (open: boolean) => void;
  setSelectedMemberId: (memberId: number | null) => void;
  pagination: { pageIndex: number; pageSize: number };
}) => ColumnDef<Member>[] = ({ setOpen, setSelectedMemberId, pagination }) => [
  {
    accessorKey: "serial_number",
    header: "S/N",
    cell: ({ row }) => {
      const { pageIndex, pageSize } = pagination;
      return pageIndex * pageSize + row.index + 1;
    },
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.original.gender;
      return gender ? gender : "-";
    },
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    cell: ({ row }) => {
      const phone = row.original.phone;
      return phone ? phone : "-";
    },
  },
  {
    accessorKey: "qualification",
    header: "Membership Status",
    cell: ({ row }) => {
      const qualification = row.original.qualification;
      return qualification ? qualification : "-";
    },
  },
  {
    accessorKey: "cell_fellowship",
    header: "Cell/Fellowship",
    accessorFn: (row) => {
      const cf = row.cell_fellowship;
      return cf ? cf : "-";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Pill>
        <span
          // TODO: uncomment this when the status is implemented
          // className={
          //   row.original.qualification === "Worker"
          //     ? "text-greenhaze"
          //     : "text-bourbon"
          // }
          className="text-greenhaze"
        >
          {/* {row.original.qualification === "Worker"
            ? "Consistent"
            : "Inconsistent"} */}
          Consistent
        </span>
      </Pill>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
              <span>Actions</span>
              <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={`membership/${row.original.id}`}>
                <DropdownMenuItem>View Details</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onSelect={() => {
                  setSelectedMemberId(row.original.id);
                  setOpen(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
