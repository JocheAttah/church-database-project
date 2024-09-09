"use client";
import Card from "@/components/card";
import AttendanceTable from "@/components/tables/attendance-table";
import { Button } from "@/components/ui/button";
import UploadDialog from "@/components/upload-dialog";
import { useCSVUpload } from "@/hooks/useCSVUpload";
import { useMeetingTypes } from "@/hooks/useMeetingTypes";
import convertDateFormat from "@/utils/convertDateFormat";
import { useMemo, useState } from "react";
import { z } from "zod";

const Attendance = () => {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const { meetingTypes } = useMeetingTypes();

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
        attendance: z
          .string()
          .min(1, "Attendance is required")
          .refine((val) => !isNaN(Number(val)), "Attendance must be a number")
          .transform(Number),
        meeting_type: z.enum(meetingTypes as [string, ...string[]], {
          errorMap: () => ({ message: "Invalid meeting type" }),
        }),
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
  });

  return (
    <>
      <h1 className="mb-10">Attendance</h1>
      <Card className="space-y-5 p-6">
        <AttendanceTable
          actionButton={
            <Button
              variant="secondary"
              onClick={() => setOpenUploadDialog(true)}
            >
              Upload attendance
            </Button>
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
    </>
  );
};

export default Attendance;
