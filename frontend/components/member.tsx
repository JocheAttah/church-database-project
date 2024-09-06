import Card from "@/components/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCellFellowships } from "@/hooks/useCellFellowships";
import { cn } from "@/lib/utils";
import formatDate from "@/utils/formatDate";
import { createClient } from "@/utils/supabase/client";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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

  const { cellFellowships } = useCellFellowships();

  const displayData = fieldConfigurations.map(({ name, label }) => ({
    key: label,
    value:
      name === "cell_fellowship_id"
        ? `${userData?.cell_fellowship?.name} ${
            userData?.cell_fellowship?.type
          }`
        : userData?.[name],
  }));

  const genderConfig = [
    { key: "Male", label: "Male" },
    { key: "Female", label: "Female" },
  ];
  const maritalConfig = [
    { key: "Single", label: "Single" },
    { key: "Married", label: "Married" },
  ];
  const qualificationConfig = [
    { key: "Worker", label: "Worker in Training" },
    { key: "Member", label: "Member" },
  ];
  const fellowshipsCellConfig = cellFellowships.map(({ id, name }) => ({
    key: id,
    label: name,
  }));
  const classConfig = [
    { key: "Working Class", label: "Working Class" },
    { key: "Unemployed", label: "Unemployed" },
    { key: "Student", label: "Student" },
  ];

  const formSchema = z.object({
    first_name: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),
    last_name: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
    gender: z.string().min(1, { message: "Gender must be selected" }),
    marital_status: z
      .string()
      .min(1, { message: "Marital status must be selected" }),
    qualification: z
      .string()
      .min(1, { message: "Qualification must be selected" }),
    cell_fellowship_id: z
      .number()
      .min(1, { message: "Fellowship/Cell must be selected" })
      .nullable(),
    phone: z
      .string()
      .refine((value) => value === "" || value.length >= 11, {
        message: "Phone number must be at least 11 characters",
      })
      .optional(),
    email: z.string().email().optional().or(z.literal("")),
    dob: z.string(),
    class: z.string().min(1, { message: "Class must be selected" }),
    discipled_by: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "",
      marital_status: "",
      qualification: "",
      cell_fellowship_id: null,
      phone: "",
      email: "",
      dob: "",
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
          cell_fellowship_id: userData.cell_fellowship_id ?? null,
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
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const supabase = createClient();
      const { error } = await supabase
        .from("members")
        .update(values)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member", id] });
      toast.success("Member updated successfully");
    },
    onError: (error) => {
      console.error("Error updating member:", error);
      toast.error("Error updating member");
    },
    onSettled: () => {
      setOpen(false);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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
              {key === "Date of Birth"
                ? formatDate(value)
                : !value
                  ? "-"
                  : value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary">Edit User</Button>
          </DialogTrigger>
          <DialogContent className="max-w-7xl">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="border-t border-mineshaft pt-7 text-white">
              <Form {...form}>
                <form>
                  <div className="grid grid-cols-2 gap-x-5 gap-y-10">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-dustygray">
                            First Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border-mineshaft text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-dustygray">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border-mineshaft text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-dustygray">
                            Gender
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="border border-mineshaft text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="border border-mineshaft">
                                {genderConfig.map(({ key, label }, index) => (
                                  <SelectItem value={key} key={index}>
                                    {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="marital_status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-dustygray">
                            Marital Status
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="border border-mineshaft text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="border border-mineshaft">
                                {maritalConfig.map(({ key, label }, index) => (
                                  <SelectItem value={key} key={index}>
                                    {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-dustygray">
                            Date of Birth
                          </FormLabel>
                          <Popover modal>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "flex w-full border border-mineshaft bg-transparent pl-3 text-left font-normal hover:bg-transparent hover:text-inherit",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    formatDate(field.value)
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarDaysIcon className="ml-auto h-4 w-4" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  field.onChange(
                                    date ? format(date, "yyyy-MM-dd") : "",
                                  )
                                }
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="qualification"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-dustygray">
                            Qualification
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="border border-mineshaft text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="border border-mineshaft">
                                {qualificationConfig.map(
                                  ({ key, label }, index) => (
                                    <SelectItem value={key} key={index}>
                                      {label}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cell_fellowship_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-dustygray">
                            Fellowship/Cell
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                              defaultValue={field.value?.toString() ?? ""}
                            >
                              <SelectTrigger className="border border-mineshaft text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="border border-mineshaft">
                                {fellowshipsCellConfig.map(
                                  ({ key, label }, index) => (
                                    <SelectItem
                                      value={key.toString()}
                                      key={index}
                                    >
                                      {label}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="class"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-dustygray">
                            Class
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="border border-mineshaft text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="border border-mineshaft">
                                {classConfig.map(({ key, label }, index) => (
                                  <SelectItem value={key} key={index}>
                                    {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-dustygray">
                            Phone
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border-mineshaft text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-dustygray">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border-mineshaft text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="discipled_by"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs text-dustygray">
                            Discipled By
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border-mineshaft text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter className="mt-4 flex justify-end">
                    <Button
                      variant="secondary"
                      type="submit"
                      loading={isPending}
                      onClick={(e) => {
                        e.preventDefault();
                        const result = form.trigger();
                        result.then((isValid) => {
                          if (isValid) {
                            form.handleSubmit(onSubmit)();
                          }
                        });
                      }}
                    >
                      Save
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export default Member;
