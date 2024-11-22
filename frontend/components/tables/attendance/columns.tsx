"use client";

import ChevronDownIcon from "@/components/icons/chevron-down-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tables } from "@/utils/database.types";
import formatDate from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";

type Attendance = Tables<"attendance_with_meeting_type">;

export const columns: ({
  setOpen,
  setSelectedMeetingId,
  pagination,
}: {
  setOpen: (open: boolean) => void;
  setSelectedMeetingId: (meetingId: number | null) => void;
  pagination: { pageIndex: number; pageSize: number };
}) => ColumnDef<Attendance>[] = ({
  setOpen,
  setSelectedMeetingId,
  pagination,
}) => [
  {
    accessorKey: "serial_number",
    header: "S/N",
    cell: ({ row }) => {
      const { pageIndex, pageSize } = pagination;
      return pageIndex * pageSize + row.index + 1;
    },
  },
  {
    accessorKey: "meeting_type",
    header: "Meeting Type",
    cell: ({ row }) => {
      return row.original.meeting_type || "-";
    },
  },
  {
    accessorKey: "attendance",
    header: "Attendance",
  },
  {
    accessorKey: "absentee",
    header: "Absentees",
  },
  {
    accessorKey: "meeting_date",
    header: "Meeting Date",
    cell: ({ row }) => formatDate(row.original.meeting_date, "dd/MM/yyyy"),
  },
  {
    accessorKey: "created_at",
    header: "Date Created",
    cell: ({ row }) => formatDate(row.original.created_at, "dd/MM/yyyy"),
  },
  {
    accessorKey: "created_by",
    header: "Created By",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
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
            <DropdownMenuItem
              onSelect={() => {
                setSelectedMeetingId(row.original.id);
                setOpen(true);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
