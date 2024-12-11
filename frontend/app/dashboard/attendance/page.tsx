"use client";
import Card from "@/components/card";
import AttendanceDialog from "@/components/dialogs/attendance-dialog";
import AttendanceTable from "@/components/tables/attendance/attendance-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UploadDialog from "@/components/upload-dialog";
import { useCSVUpload } from "@/hooks/useCSVUpload";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { useMeetingTypes } from "@/hooks/useMeetingTypes";
import convertDateFormat from "@/utils/convertDateFormat";
import { useMemo, useState } from "react";
import { z } from "zod";

const Attendance = () => {
  const { data: currentUser } = useGetCurrentUser();
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const { meetingTypes } = useMeetingTypes();
  const [openAddMeetingDialog, setOpenAddMeetingDialog] = useState(false);

  // Update the schema to match the database structure
  const attendanceRowSchema = useMemo(
    () =>
      z.object({
        meeting_date: z
          .string()
          .min(1, "Meeting date is required")
          .transform((val) => {
            if (!val) return null;
            const convertedDate = convertDateFormat(val);
            if (!convertedDate) {
              throw new Error("Invalid date format");
            }
            return convertedDate;
          }),
        adults: z
          .string()
          .min(1, "Adults is required")
          .refine((val) => !isNaN(Number(val)), "Adults must be a number")
          .transform(Number),
        children: z
          .string()
          .min(1, "Children is required")
          .refine((val) => !isNaN(Number(val)), "Children must be a number")
          .transform(Number),
        meeting_type: z.enum(
          meetingTypes.map((type) => type.type_name) as [string, ...string[]],
          {
            errorMap: () => ({ message: "Invalid meeting type" }),
          },
        ),
        absentee: z
          .string()
          .min(1, "Absentee is required")
          .refine((val) => !isNaN(Number(val)), "Absentee must be a number")
          .transform(Number),
      }),
    [meetingTypes],
  );

  const {
    uploadedData,
    setUploadedData,
    loading,
    handleUpload: handleUpdateAttendance,
  } = useCSVUpload({
    schema: attendanceRowSchema,
    stagingTable: "attendance_staging",
    upsertFunction: "upsert_attendance_from_staging",
    invalidateQueries: ["attendance"],
    setOpenUploadDialog,
    createdById: currentUser?.id,
  });

  return (
    <>
      <h1 className="mb-10">Attendance</h1>
      <Card className="space-y-5 p-6">
        <AttendanceTable
          actionButton={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">Update attendance</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setOpenUploadDialog(true)}>
                  Upload Excel Sheet
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setOpenAddMeetingDialog(true)}
                >
                  Add Single Meeting
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />
      </Card>
      <UploadDialog
        isOpen={openUploadDialog}
        onOpenChange={setOpenUploadDialog}
        title="Upload attendance"
        onUpload={handleUpdateAttendance}
        onFileUpload={setUploadedData}
        loading={loading}
        uploadedDataLength={uploadedData.length}
      />
      <AttendanceDialog
        isOpen={openAddMeetingDialog}
        onClose={setOpenAddMeetingDialog}
      />
    </>
  );
};

export default Attendance;
