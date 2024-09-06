"use client";
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
import { cn } from "@/lib/utils";
import formatDate from "@/utils/formatDate";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
    .optional(),
  phone: z
    .string()
    .refine((value) => value === "" || value.length >= 11, {
      message: "Phone number must be at least 11 characters",
    })
    .optional(),
  email: z.string().email().optional().or(z.literal("")),
  dob: z.string().optional().nullable(),
  class: z.string().min(1, { message: "Class must be selected" }),
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
                      <FormLabel className="text-xs text-dustygray">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter first name"
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
                          placeholder="Enter last name"
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
                          <SelectTrigger className="border border-mineshaft text-white data-[placeholder]:text-dustygray hover:data-[placeholder]:text-white">
                            <SelectValue placeholder="Select gender" />
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
                          <SelectTrigger className="border border-mineshaft text-white data-[placeholder]:text-dustygray hover:data-[placeholder]:text-white">
                            <SelectValue placeholder="Select marital status" />
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
                                !field.value && "text-dustygray",
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
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(
                                date ? formatDate(date, "yyyy-MM-dd") : "",
                              )
                            }
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            autoFocus
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
                          <SelectTrigger className="border border-mineshaft text-white data-[placeholder]:text-dustygray hover:data-[placeholder]:text-white">
                            <SelectValue placeholder="Select qualification" />
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
                          <SelectTrigger className="border border-mineshaft text-white data-[placeholder]:text-dustygray hover:data-[placeholder]:text-white">
                            <SelectValue placeholder="Select fellowship/cell" />
                          </SelectTrigger>
                          <SelectContent className="border border-mineshaft">
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
                      <FormLabel className="text-xs text-dustygray">
                        Class
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="border border-mineshaft text-white data-[placeholder]:text-dustygray hover:data-[placeholder]:text-white">
                            <SelectValue placeholder="Select class" />
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
                          placeholder="Enter phone number"
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
                          placeholder="Enter email address"
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
                          placeholder="Enter discipled by"
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
  );
};

export default MemberDialog;
