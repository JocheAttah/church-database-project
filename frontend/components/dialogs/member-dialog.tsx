"use client";
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
import { Input } from "@/components/ui/input";
import { useCellFellowships } from "@/hooks/useCellFellowships";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const memberFormSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  gender: z.string().optional(),
  marital_status: z.string().optional(),
  qualification: z.string().optional(),
  cell_fellowship_id: z
    .number()
    .min(1, { message: "Fellowship/Cell must be selected" }),
  phone: z
    .string()
    .refine((value) => value === "" || value.length >= 11, {
      message: "Phone number must be at least 11 characters",
    })
    .optional(),
  email: z.string().email().optional().or(z.literal("")),
  dob: z.string().optional().nullable(),
  class: z.string().optional(),
  discipled_by: z.string().optional(),
});

export type MemberType = z.infer<typeof memberFormSchema>;

type MemberDialogProps = {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  title: string;
  isPending: boolean;
  form: UseFormReturn<MemberType>;
  onSubmit: (values: MemberType) => void;
};

const MemberDialog = ({
  isOpen,
  onClose,
  title,
  isPending,
  form,
  onSubmit,
}: MemberDialogProps) => {
  const { cellFellowships } = useCellFellowships();

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
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
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
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
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
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
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
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
                      <FormLabel>Marital Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select marital status" />
                          </SelectTrigger>
                          <SelectContent>
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
                      <FormLabel>Date of Birth</FormLabel>
                      <DatePicker
                        value={field.value || ""}
                        onChange={(date) => field.onChange(date)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qualification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualification</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select qualification" />
                          </SelectTrigger>
                          <SelectContent>
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
                      <FormLabel>Fellowship/Cell</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          defaultValue={field.value?.toString() ?? ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select fellowship/cell" />
                          </SelectTrigger>
                          <SelectContent>
                            {fellowshipsCellConfig.map(
                              ({ key, label }, index) => (
                                <SelectItem value={key.toString()} key={index}>
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
                      <FormLabel>Class</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
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
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
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
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email address" {...field} />
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
                      <FormLabel>Discipled By</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter discipled by" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="mt-7 flex justify-end">
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
  );
};

export default MemberDialog;
