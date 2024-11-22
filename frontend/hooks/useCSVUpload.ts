import { Database } from "@/utils/database.types";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const useCSVUpload = <T extends z.ZodType>({
  schema,
  stagingTable,
  upsertFunction,
  invalidateQueries,
  setOpenUploadDialog,
  createdBy,
}: {
  schema: T;
  stagingTable: keyof Database["public"]["Tables"];
  upsertFunction: keyof Database["public"]["Functions"];
  invalidateQueries: string[];
  setOpenUploadDialog: (open: boolean) => void;
  createdBy?: string;
}) => {
  const [uploadedData, setUploadedData] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const validateRow = (row: any, rowIndex: number) => {
    try {
      const validatedRow = schema.parse(row);
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

  const validateData = (data: any[]) => {
    const errors: { rowIndex: number; errors: string[] }[] = [];
    const validatedData: any[] = [];

    data.forEach((row, index) => {
      const result = validateRow(row, index + 1);
      if (result.errors) {
        errors.push(result);
      } else {
        validatedData.push({
          ...result.validatedData,
          // TODO: change this to use the current user id on the attendance table
          ...(createdBy ? { created_by: createdBy } : {}),
        });
      }
    });

    return { errors, validatedData };
  };

  const handleUpload = async () => {
    setLoading(true);
    if (uploadedData.length === 0) {
      toast.error("No data to update");
      setLoading(false);
      return;
    }

    const { errors, validatedData } = validateData(uploadedData);

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
      const { error: stagingError } = await supabase
        .from(stagingTable)
        .insert(validatedData);

      if (stagingError) throw stagingError;

      const { error: upsertError } = await supabase.rpc(upsertFunction);

      if (upsertError) throw upsertError;

      toast.success("Data updated successfully");
      invalidateQueries.forEach((query) => {
        queryClient.invalidateQueries({
          queryKey: [query],
          refetchType: "all",
        });
      });
      setOpenUploadDialog(false);
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating data");
    } finally {
      setUploadedData([]);
      setLoading(false);
    }
  };

  return {
    uploadedData,
    setUploadedData,
    loading,
    handleUpload,
  };
};
