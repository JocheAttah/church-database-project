import Card from "@/components/card";
import { cn } from "@/lib/utils";
import formatDate from "@/utils/formatDate";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import MemberDialog, {
  MemberType,
  memberFormSchema,
} from "./dialogs/member-dialog";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const Member = ({ id }: { id: string }) => {
  const fieldConfigurations = [
    { name: "first_name", label: "First Name" },
    { name: "last_name", label: "Last Name" },
    { name: "gender", label: "Gender" },
    { name: "marital_status", label: "Marital Status" },
    { name: "qualification", label: "Qualification" },
    { name: "cell_fellowship_id", label: "Fellowship/Cell" },
    { name: "phone", label: "Phone" },
    { name: "email", label: "Email Address" },
    { name: "dob", label: "Date of Birth" },
    { name: "class", label: "Class" },
    { name: "discipled_by", label: "Discipled By" },
  ] as const;

  const { data: userData, isLoading } = useQuery({
    queryKey: ["member", id],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("members")
        .select("*, cell_fellowship(name,type)")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const getValue = (name: string) => {
    const userCellFellowship = userData?.cell_fellowship;
    if (name === "cell_fellowship_id") {
      return userCellFellowship
        ? `${userCellFellowship.name} ${userCellFellowship.type}`
        : "-";
    }
    if (name === "dob") {
      return formatDate(userData?.dob);
    }
    return (
      (userData?.[name as keyof typeof userData] as string | number | null) ||
      "-"
    );
  };

  const displayData = fieldConfigurations.map(({ name, label }) => ({
    key: label,
    value: getValue(name),
  }));

  const form = useForm<MemberType>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "",
      marital_status: "",
      qualification: "",
      cell_fellowship_id: undefined,
      phone: "",
      email: "",
      dob: null,
      class: "",
      discipled_by: "",
    },
    mode: "all",
    values: userData
      ? {
          first_name: userData.first_name,
          last_name: userData.last_name,
          gender: userData.gender,
          marital_status: userData.marital_status,
          qualification: userData.qualification,
          cell_fellowship_id: userData.cell_fellowship_id ?? undefined,
          phone: userData.phone ?? "",
          email: userData.email ?? "",
          dob: userData.dob,
          class: userData.class,
          discipled_by: userData.discipled_by ?? "",
        }
      : undefined,
  });

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: MemberType) => {
      const supabase = createClient();
      const { error } = await supabase
        .from("members")
        .update(values)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["member"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["members"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["cell_fellowship"],
        refetchType: "all",
      });
      toast.success("Member updated successfully");
    },
    onError: (error) => {
      console.error("Error updating member:", error);
      toast.error("Error updating member", {
        description: error.message,
      });
    },
    onSettled: () => {
      setOpen(false);
    },
  });

  function onSubmit(values: MemberType) {
    // Check if any values have changed
    const hasChanged = Object.keys(values).some(
      (key) =>
        values[key as keyof typeof values] !==
        userData?.[key as keyof typeof userData],
    );

    // Only mutate if there are changes
    if (hasChanged) {
      return mutate(values);
    }
    setOpen(false);
  }

  if (isLoading)
    return (
      <Card className="p-10">
        <div className="mb-4 flex flex-wrap items-center gap-16">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-10 w-24" />
        </div>
      </Card>
    );
  if (!userData) return <div>Member not found</div>;

  return (
    <Card className="p-10">
      <div className="mb-4 flex flex-wrap items-center gap-16">
        {displayData.map(({ key, value }, index) => (
          <div className="space-y-2" key={index}>
            <p className="text-sm text-dustygray">{key}</p>
            <p
              className={cn(
                "font-semibold",
                !(key === "Email Address") && "capitalize",
              )}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Edit Member
        </Button>
        <MemberDialog
          isOpen={open}
          onClose={setOpen}
          form={form}
          title="Edit Member"
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </div>
    </Card>
  );
};

export default Member;
