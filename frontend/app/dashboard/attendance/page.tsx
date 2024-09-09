"use client";
import Card from "@/components/card";
import AttendanceTable from "@/components/tables/attendance-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Uploader from "@/components/Uploader";
import { useMeetingTypes } from "@/hooks/useMeetingTypes";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { format, isValid, parse } from "date-fns";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const Attendance = () => {
  const [uploadedData, setUploadedData] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const queryClient = useQueryClient();
  const { meetingTypes, isLoading: isLoadingMeetingTypes } = useMeetingTypes();

  // Add this helper function to convert date strings
  const convertDateFormat = (dateString: string): string | null => {
    const formats = ["dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd"];

    for (const dateFormat of formats) {
      const parsedDate = parse(dateString, dateFormat, new Date());
      if (isValid(parsedDate)) {
        return format(parsedDate, "yyyy-MM-dd");
      }
    }

    return null;
  };

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

  // Function to validate a single row
  const validateRow = (row: any, rowIndex: number) => {
    try {
      const validatedRow = attendanceRowSchema.parse(row);
      return { rowIndex, validatedData: validatedRow };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          rowIndex,
          errors: error.errors.map(
            (err) => `${err.path.join(".")}: ${err.message}`,
          ),
        };
      } else if (error instanceof Error) {
        return { rowIndex, errors: [error.message] };
      }
      return { rowIndex, errors: ["Unknown error occurred"] };
    }
  };

  // Function to validate all rows
  const validateAttendanceData = (data: any[]) => {
    const errors: { rowIndex: number; errors: string[] }[] = [];
    const validatedData: any[] = [];

    data.forEach((row, index) => {
      const result = validateRow(row, index + 1);
      if (result.errors) {
        errors.push(result);
      } else {
        // TODO: Get the current user
        validatedData.push({ ...result.validatedData, created_by: "Pastor" });
      }
    });

    return { errors, validatedData };
  };

  const handleUpdateAttendance = async () => {
    setLoading(true);
    if (uploadedData.length === 0) {
      toast.error("No data to update");
      setLoading(false);
      return;
    }

    const { errors, validatedData } = validateAttendanceData(uploadedData);

    if (errors.length > 0) {
      errors.forEach(({ rowIndex, errors }) => {
        toast.error(`Row ${rowIndex} has errors:`, {
          description: errors.join(", "),
        });
      });
      setLoading(false);
      return;
    }

    const supabase = createClient();

    try {
      // Step 1: Insert validated data into staging table
      const { error: stagingError } = await supabase
        .from("attendance_staging")
        .insert(validatedData);

      if (stagingError) throw stagingError;

      // Step 2: Perform the upsert from staging to attendance table
      const { error: upsertError } = await supabase.rpc(
        "upsert_attendance_from_staging",
      );

      if (upsertError) throw upsertError;

      toast.success("Attendance updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["attendance"],
        refetchType: "all",
      });
      setOpenUploadDialog(false);
    } catch (error) {
      console.error("Error updating attendance:", error);
      toast.error("Error updating attendance");
    } finally {
      setUploadedData([]);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="mb-10">Attendance</h1>
      <Card className="space-y-5 p-6">
        <AttendanceTable
          actionButton={
            <Dialog open={openUploadDialog} onOpenChange={setOpenUploadDialog}>
              <DialogTrigger asChild>
                <Button variant="secondary">Upload attendance</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload attendance</DialogTitle>
                  <DialogDescription />
                </DialogHeader>
                <div className="border-t border-mineshaft pt-7 text-white">
                  <Uploader onFileUpload={(data) => setUploadedData(data)} />
                  <DialogFooter className="mt-7">
                    <Button
                      variant="secondary"
                      loading={loading}
                      onClick={handleUpdateAttendance}
                      disabled={uploadedData.length === 0}
                    >
                      Upload
                    </Button>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
          }
        />
      </Card>
    </>
  );
};

export default Attendance;
