import type { MemberType } from "@/components/dialogs/member-dialog";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

type UseAddMemberProps = {
  form: UseFormReturn<MemberType>;
};

export const useAddMember = ({ form }: UseAddMemberProps) => {
  const queryClient = useQueryClient();
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: MemberType) => {
      const supabase = createClient();
      const { error } = await supabase.from("members").insert(values);
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
      toast.success("Member added successfully");
      setOpenAddMemberDialog(false);
      form.reset();
    },
    onError: (error) => {
      console.error("Error adding member:", error);
      toast.error("Error adding member", {
        description: error.message,
      });
    },
  });

  return {
    addMember: mutate,
    isPending,
    openAddMemberDialog,
    setOpenAddMemberDialog,
  };
};
