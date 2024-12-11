import ChevronDownIcon from "@/components/icons/chevron-down-icon";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { columns } from "./columns";

export type GivingType = "inflow" | "outflow";

const GivingTable = () => {
  const supabase = createClient();

  const [selectedType, setSelectedType] = useState<GivingType>("inflow");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [globalFilter, setGlobalFilter] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: [
      "giving",
      pagination.pageIndex,
      pagination.pageSize,
      globalFilter,
      selectedType,
    ],
    queryFn: async () => {
      const query = supabase.from(selectedType).select("*", { count: "exact" });

      // if (globalFilter) {
      //   query.or(
      //     [
      //       `first_name.ilike.%${globalFilter}%`,
      //       `last_name.ilike.%${globalFilter}%`,
      //       `phone.ilike.%${globalFilter}%`,
      //       `qualification.ilike.%${globalFilter}%`,
      //       `cell_fellowship.ilike.%${globalFilter}%`,
      //     ].join(","),
      //   );
      // }

      const { data, error, count } = await query
        .order("date", { ascending: false })
        .range(
          pagination.pageIndex * pagination.pageSize,
          (pagination.pageIndex + 1) * pagination.pageSize - 1,
        );

      if (error) throw error;
      return { data, totalCount: count || 0 };
    },
  });

  const { data: givingData, totalCount } = data ?? {
    data: [],
    totalCount: 0,
  };

  // const {
  //   uploadedData,
  //   setUploadedData,
  //   loading,
  //   handleUpload: handleUpdateAttendance,
  // } = useCSVUpload({
  //   schema: givingRowSchema,
  //   stagingTable: "giving_staging",
  //   upsertFunction: "upsert_giving_from_staging",
  //   invalidateQueries: ["giving"],
  //   setOpenUploadDialog,
  //   createdById: currentUser?.id,
  // });

  // const [openUploadDialog, setOpenUploadDialog] = useState(false);
  // const [openAddInflowDialog, setOpenAddInflowDialog] = useState(false);

  // const [open, setOpen] = useState(false);
  // const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  // const queryClient = useQueryClient();

  // const { mutate: deleteMember, isPending: isDeletingMember } = useMutation({
  //   mutationFn: async (memberId: number) => {
  //     const { error } = await supabase
  //       .from("members")
  //       .delete()
  //       .eq("id", memberId);
  //     if (error) throw error;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["members"],
  //       refetchType: "all",
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: ["cell_fellowship"],
  //       refetchType: "all",
  //     });
  //     toast.success("Member deleted successfully");
  //   },
  //   onError: (error) => {
  //     console.error("Error deleting member:", error);
  //     toast.error("Error deleting member", {
  //       description: error.message,
  //     });
  //   },
  //   onSettled: () => {
  //     setOpen(false);
  //     setSelectedMemberId(null);
  //   },
  // });

  return (
    <>
      <DataTable
        actionButton={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Update {selectedType}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuItem onSelect={() => setOpenUploadDialog(true)}>
                  Upload Excel Sheet
                </DropdownMenuItem> */}
              {/* <DropdownMenuItem onSelect={() => setOpenAddInflowDialog(true)}>
                  Add Single inflow
                </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        }
        loading={isLoading}
        title={
          <GivingTableTitle
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        }
        columns={columns({
          // setOpen,
          // setSelectedMemberId,
          selectedType,
          pagination,
        })}
        data={givingData}
        pagination={{
          ...pagination,
          pageCount: Math.ceil(totalCount / pagination.pageSize),
          onPaginationChange: setPagination,
        }}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
      />
      {/* <UploadDialog
        isOpen={openUploadDialog}
        onOpenChange={setOpenUploadDialog}
        title="Upload inflow"
        onUpload={handleUpdateAttendance}
        onFileUpload={setUploadedData}
        loading={loading}
        uploadedDataLength={uploadedData.length}
      /> */}
    </>
  );
};

const GivingTableTitle = ({
  selectedType,
  setSelectedType,
}: {
  selectedType: GivingType;
  setSelectedType: (type: GivingType) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <span>{selectedType === "inflow" ? "Inflow" : "Outflow"}</span>
        <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={() =>
            selectedType !== "inflow" && setSelectedType("inflow")
          }
          className={cn(selectedType === "inflow" && "bg-white/1")}
        >
          Inflow
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() =>
            selectedType !== "outflow" && setSelectedType("outflow")
          }
          className={cn(selectedType === "outflow" && "bg-white/1")}
        >
          Outflow
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GivingTable;
