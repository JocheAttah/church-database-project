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

type Member = Tables<"members"> & {
  cell_fellowship: {
    name: string;
    type: string;
  } | null;
};

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
  },
  {
    accessorKey: "cell_fellowship",
    header: "Cell/Fellowship",
    cell: ({ row }) => {
      const cellFellowship = row.original.cell_fellowship;
      return cellFellowship
        ? `${cellFellowship.name} ${cellFellowship.type}`
        : "-";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Pill>
        <span
          className={
            row.original.qualification === "Worker"
              ? "text-greenhaze"
              : "text-bourbon"
          }
        >
          {row.original.qualification === "Worker"
            ? "Consistent"
            : "Inconsistent"}
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
