"use client";
import Card from "@/components/card";
import SearchInput from "@/components/search-input";
import AttendanceTable from "@/components/tables/attendance-table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import Uploader from "@/components/Uploader";
import { cn } from "@/lib/utils";
import formatDate from "@/utils/formatDate";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const data = [
  {
    name: "Durumi Fellowship",
    key: "durumi",
    size: 2100,
  },
  {
    name: "Wuse Fellowship",
    key: "wuse",
    size: 2100,
  },
  {
    name: "Jikwoyi Cell",
    key: "jikwoyi",
    size: 2100,
  },
  {
    name: "Lugbe Cell",
    key: "lugbe",
    size: 2100,
  },
  {
    name: "Pigbakasa Cell",
    key: "pigbakasa",
    size: 2100,
  },
  {
    name: "Karu Fellowship",
    key: "karu",
    size: 2100,
  },
  {
    name: "Kuje Cell",
    key: "kuje",
    size: 2100,
  },
  {
    name: "Lokogoma Cell",
    key: "lokogoma",
    size: 2100,
  },
  {
    name: "Kubwa Cell",
    key: "kubwa",
    size: 2100,
  },
];

const meetingConfig = [
  { key: "sunday", label: "Sunday Service" },
  { key: "midweek", label: "Midweek Service" },
  { key: "fellowshipCell", label: "Cell/Fellowship Meeting" },
  { key: "prayer", label: "Prayer Group" },
];

const Attendance = () => {
  const formSchema = z.object({
    type: z.string(),
    date: z.date(),
    file: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      date: undefined,
      file: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <>
      <h1 className="mb-10">Attendance</h1>
      <Card className="space-y-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap items-center gap-5">
            <h2>Attendance breakdown</h2>
            <SearchInput />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-dustygray">
              <FunnelIcon width={24} height={24} />
              <span>Filter</span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Upload attendance</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload attendance</DialogTitle>
                </DialogHeader>
                <div className="border-t border-mineshaft pt-5 text-white">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-7"
                    >
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs text-dustygray">
                              Meeting type
                            </FormLabel>
                            <FormControl>
                              <Select>
                                <SelectTrigger
                                  className="border border-mineshaft text-white"
                                  {...field}
                                >
                                  <SelectValue placeholder="Select a option" />
                                </SelectTrigger>
                                <SelectContent className="border border-mineshaft">
                                  {meetingConfig.map(
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
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs text-dustygray">
                              Meeting date
                            </FormLabel>
                            <Popover
                              open={isCalendarOpen}
                              onOpenChange={setIsCalendarOpen}
                              modal
                            >
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
                                      formatDate(field.value, "dd/MM/yyyy")
                                    ) : (
                                      <span>DD/MM/YYYY</span>
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
                                  selected={field.value}
                                  onSelect={(date) => {
                                    field.onChange(
                                      date
                                        ? formatDate(date, "yyyy-MM-dd")
                                        : "",
                                    );
                                    setIsCalendarOpen(false);
                                  }}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Uploader onFileUpload={() => {}} />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="secondary" type="submit">
                            Upload
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <AttendanceTable />
      </Card>
    </>
  );
};

export default Attendance;
