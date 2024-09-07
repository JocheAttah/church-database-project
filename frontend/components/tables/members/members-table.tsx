import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMembership } from "@/hooks/useMembership";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function MemberTable({
  cellFellowshipId,
  isLoadingCellFellowship,
  title,
  loadingTitle,
  actionButton,
}: {
  cellFellowshipId?: number;
  isLoadingCellFellowship?: boolean;
  title: string;
  loadingTitle?: boolean;
  actionButton?: ReactNode;
}) {
  const supabase = createClient();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const getMembersByCellFellowship = async (
    cellFellowshipId: number,
    page: number,
    pageSize: number,
  ) => {
    const { count } = await supabase
      .from("members")
      .select("*", { count: "exact", head: true })
      .eq("cell_fellowship_id", cellFellowshipId);

    const { data, error } = await supabase
      .from("members")
      .select("*, cell_fellowship(name,type)")
      .eq("cell_fellowship_id", cellFellowshipId)
      .order("created_at")
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (error) throw error;
    return { members: data, totalCount: count || 0 };
  };

  const { data, isLoading: isLoadingMembers } = useQuery({
    queryKey: [
      "members",
      pagination.pageIndex,
      pagination.pageSize,
      cellFellowshipId,
    ],
    queryFn: async () => {
      if (cellFellowshipId) {
        return getMembersByCellFellowship(
          cellFellowshipId,
          pagination.pageIndex + 1,
          pagination.pageSize,
        );
      }
      const { data, error } = await supabase
        .from("members")
        .select("*, cell_fellowship(name,type)")
        .order("created_at")
        .range(
          pagination.pageIndex * pagination.pageSize,
          (pagination.pageIndex + 1) * pagination.pageSize - 1,
        );

      if (error) throw error;
      return { members: data, totalCount: 0 };
    },
  });

  const isLoading = isLoadingCellFellowship || isLoadingMembers;

  const { members, totalCount: totalMembersInCellFellowship } = data ?? {
    members: [],
    totalCount: 0,
  };

  const [open, setOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const { totalCount: totalMembers } = useMembership();
  const currentCount = members.length;
  const totalCount = cellFellowshipId
    ? totalMembersInCellFellowship
    : totalMembers;

  const queryClient = useQueryClient();

  const { mutate: deleteMember, isPending: isDeletingMember } = useMutation({
    mutationFn: async (memberId: number) => {
      const { error } = await supabase
        .from("members")
        .delete()
        .eq("id", memberId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["cell_fellowship"],
        refetchType: "all",
      });
      toast.success("Member deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting member:", error);
      toast.error("Error deleting member", {
        description: error.message,
      });
    },
    onSettled: () => {
      setOpen(false);
      setSelectedMemberId(null);
    },
  });

  return (
    <>
      <DataTable
        actionButton={actionButton}
        loading={isLoading}
        loadingTitle={loadingTitle}
        title={title}
        columns={columns({
          setOpen,
          setSelectedMemberId,
          pagination,
        })}
        data={members}
        pagination={{
          ...pagination,
          pageCount: Math.ceil(totalCount / pagination.pageSize),
          onPaginationChange: setPagination,
        }}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this member?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isDeletingMember}
              onClick={(e) => {
                e.preventDefault();
                if (selectedMemberId !== null) {
                  deleteMember(selectedMemberId);
                }
              }}
            >
              {isDeletingMember ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
