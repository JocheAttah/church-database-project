import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../ui/data-table";
import { columns } from "./attendance/columns";

const AttendanceTable = ({
  actionButton,
}: {
  actionButton: React.ReactNode;
}) => {
  const supabase = createClient();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: [
      "attendance",
      pagination.pageIndex,
      pagination.pageSize,
      globalFilter,
    ],
    queryFn: async () => {
      const query = supabase
        .from("attendance_with_meeting_type")
        .select("*", { count: "exact" });

      if (globalFilter) {
        query.or([`meeting_type.ilike.%${globalFilter}%`].join(","));
      }

      const { data, error, count } = await query
        .order("meeting_date", { ascending: false })
        .range(
          pagination.pageIndex * pagination.pageSize,
          (pagination.pageIndex + 1) * pagination.pageSize - 1,
        );

      if (error) throw error;
      return {
        data,
        totalCount: count || 0,
      };
    },
  });

  const { data: attendance, totalCount } = data ?? {
    data: [],
    totalCount: 0,
  };

  const [open, setOpen] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(
    null,
  );

  const queryClient = useQueryClient();

  const { mutate: deleteAttendance, isPending: isDeletingAttendance } =
    useMutation({
      mutationFn: async (meetingId: number) => {
        const { error } = await supabase
          .from("attendance")
          .delete()
          .eq("id", meetingId);
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["attendance"],
          refetchType: "all",
        });
        toast.success("Attendance deleted successfully");
      },
      onError: (error) => {
        console.error("Error deleting attendance:", error);
        toast.error("Error deleting attendance", {
          description: error.message,
        });
      },
      onSettled: () => {
        setOpen(false);
        setSelectedMeetingId(null);
      },
    });

  return (
    <>
      <DataTable
        loading={isLoading}
        title="Attendance Records"
        actionButton={actionButton}
        columns={columns({
          setOpen,
          setSelectedMeetingId,
          pagination,
        })}
        data={attendance}
        pagination={{
          ...pagination,
          pageCount: Math.ceil(totalCount / pagination.pageSize),
          onPaginationChange: setPagination,
        }}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Attendance</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this attendance record?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isDeletingAttendance}
              onClick={(e) => {
                e.preventDefault();
                if (selectedMeetingId !== null) {
                  deleteAttendance(selectedMeetingId);
                }
              }}
            >
              {isDeletingAttendance ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AttendanceTable;
