"use client";

import ChevronDownIcon from "@/components/icons/chevron-down-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Tables } from "@/utils/database.types";
import formatDate from "@/utils/formatDate";
import formatMoney from "@/utils/formatMoney";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import type { GivingType } from "./giving-table";

type Giving = Tables<"inflow" | "outflow">;

export const columns: ({
  selectedType,
  pagination,
}: {
  pagination: { pageIndex: number; pageSize: number };
  selectedType: GivingType;
}) => ColumnDef<Giving>[] = ({ pagination, selectedType }) => {
  const baseColumns = [
    {
      accessorKey: "serial_number",
      header: "S/N",
      cell: ({ row }) => {
        const { pageIndex, pageSize } = pagination;
        return pageIndex * pageSize + row.index + 1;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => formatMoney(row.original.amount),
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => formatDate(row.original.date, "do MMM, yyyy"),
    },
    {
      accessorKey: "created_by",
      header: "Created By",
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => {
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                <span>Actions</span>
                <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href={`#`}>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ] satisfies ColumnDef<Giving>[];

  const outflowColumns = [
    {
      accessorKey: "period",
      header: "Period",
    },
    {
      accessorKey: "beneficiary",
      header: "Beneficiary",
    },
    {
      accessorKey: "approved_by",
      header: "Approved By",
    },
  ] satisfies ColumnDef<Giving>[];

  if (selectedType === "outflow") {
    return [
      ...baseColumns.slice(0, 3),
      outflowColumns[0],
      baseColumns[3],
      baseColumns[4],
      outflowColumns[1],
      baseColumns[5],
      outflowColumns[2],
      baseColumns[6],
    ] as ColumnDef<Giving>[];
  }

  return baseColumns;
};
