import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { useMeetingTypes } from "@/hooks/useMeetingTypes";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type AttendanceDialogProps = {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};

const formSchema = z.object({
  meeting_type_id: z
    .string()
    .min(1, { message: "Meeting type must be selected" }),
  meeting_date: z.string().min(1, { message: "Meeting date is required" }),
  adults: z
    .string()
    .min(1, { message: "Adults must be a valid number greater than 0" }),
  children: z
    .string()
    .min(1, { message: "Children must be a valid number greater than 0" }),
  absentee: z
    .string()
    .min(1, { message: "Absentees must be a valid number greater than 0" }),
});

type AttendanceFormValues = z.infer<typeof formSchema>;

const AttendanceDialog = ({ isOpen, onClose }: AttendanceDialogProps) => {
  const { meetingTypes } = useMeetingTypes();
  const { data: currentUser } = useGetCurrentUser();
  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meeting_type_id: "",
      meeting_date: "",
      adults: "",
      children: "",
      absentee: "",
    },
    mode: "all",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: AttendanceFormValues) => {
      if (!currentUser) throw new Error("User not found");

      const supabase = createClient();

      const { error } = await supabase.from("attendance").insert({
        meeting_type_id: Number(values.meeting_type_id),
        meeting_date: values.meeting_date,
        adults: Number(values.adults),
        children: Number(values.children),
        absentee: Number(values.absentee),
        created_by_id: currentUser.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["attendance"],
        refetchType: "all",
      });
      toast.success("Attendance added successfully");
      onClose(false);
      form.reset();
    },
    onError: (error) => {
      console.error("Error adding attendance:", error);
      toast.error("Error adding attendance", {
        description: error.message,
      });
    },
  });

  const handleSubmit = (values: AttendanceFormValues) => {
    mutate(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Single Meeting</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="border-t border-mineshaft pt-7 text-white">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="meeting_type_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meeting type</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a meeting type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {meetingTypes.map(({ id, type_name }, index) => (
                            <SelectItem value={id.toString()} key={index}>
                              {type_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="meeting_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meeting date</FormLabel>
                      <DatePicker
                        error={!!form.formState.errors.meeting_date}
                        value={field.value || ""}
                        onChange={(date) => field.onChange(date)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="adults"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adults</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter attendance (adults)"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="children"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Children</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter attendance (children)"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="absentee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Absentees</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter absentees"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="mt-7">
                <Button variant="secondary" type="submit" loading={isPending}>
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceDialog;
