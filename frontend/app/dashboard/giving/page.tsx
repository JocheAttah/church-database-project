"use client";

import Card from "@/components/card";
import ChevronDownIcon from "@/components/icons/chevron-down-icon";
import GrowthIcon from "@/components/icons/growth-icon";
import SearchInput from "@/components/search-input";
import GivingTable from "@/components/tables/GivingTable";
import { Button } from "@/components/ui/button";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
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
import { formatFileSize } from "@/utils/formatFileSize";
import { truncateMiddle } from "@/utils/truncateText";
import { DocumentIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import formatDate from "@/utils/formatDate";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

const Giving = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const givingConfig = [
    { key: "offering", label: "Offering" },
    { key: "monthlyPledge", label: "Monthly Pledge" },
    { key: "facilityGiving", label: "Facility Giving" },
    { key: "pastor'sHonorarium", label: "Pastor's Honorarium" },
  ];

  const formSchema = z.object({
    type: z.string(),
    amount: z.string(),
    desc: z.string(),
    date: z.date(),
    file: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      amount: "",
      desc: "",
      date: undefined,
      file: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex w-full flex-col">
      <h1 className="mb-5">Giving</h1>
      <div className="flex w-[80%] flex-1 flex-col items-start md:flex-row">
        <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-3">
          {/* Total membership */}
          <Card className="space-y-6">
            <div className="flex items-center gap-3.5">
              <p className="text-sm text-dustygray">Available balance</p>
            </div>
            <h1>₦10,000</h1>
          </Card>
          {/* Workers in Training */}
          <Card className="space-y-6">
            <div className="flex items-center gap-3.5">
              <p className="text-sm text-dustygray">Total inflow</p>
            </div>

            <h1>₦3,120,050</h1>

            <div className="flex items-center text-xs">
              <GrowthIcon />
              <p className="ml-1 text-junglegreen">16%</p>
              <p className="ml-2 text-dustygray">in the last month</p>
            </div>
          </Card>
          {/* Members and Disciples */}
          <Card className="space-y-6">
            <div className="flex items-center gap-3.5">
              <p className="text-sm text-dustygray">Total outflow</p>
            </div>

            <h1>₦2,120,050</h1>

            <div className="flex items-center text-xs">
              <GrowthIcon />
              <p className="ml-1 text-junglegreen">16%</p>
              <p className="ml-2 text-dustygray">in the last month</p>
            </div>
          </Card>
        </div>
      </div>
      {/* Table */}
      <div className="mt-8 rounded-md bg-shark p-4">
        <Card>
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="flex items-center">
                  <div className="mr-4 flex flex-row items-center">
                    <p className="text-xl text-white">Inflow</p>
                    <ChevronDownIcon className="h-6 w-6" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <p>Outflow</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <SearchInput />
            </div>
            <div className="flex flex-row items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">New inflow</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>New inflow</DialogTitle>
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
                                Type
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
                                    {givingConfig.map(
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
                        {/* Amount */}
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-dustygray">
                                Amount
                              </FormLabel>
                              <FormControl>
                                <Input disabled type="text" placeholder="₦" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Amount */}
                        <FormField
                          control={form.control}
                          name="desc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-dustygray">
                                Description
                              </FormLabel>
                              <FormControl>
                                <Input
                                  disabled
                                  type="text"
                                  placeholder="Enter text"
                                />
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
                                    onSelect={field.onChange}
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
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <Button
                              variant="secondary"
                              className="bg-sapphire-700 text-white"
                              type="submit"
                            >
                              Save
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </Form>
                  </div>
                </DialogContent>
              </Dialog>
              <FunnelIcon className="ml-[10px] size-8 text-dustygray" />
              <p className="text-sm text-dustygray">Filter</p>
            </div>
          </div>
        </Card>
        <GivingTable />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-5">
          <p className="text-xs text-dustygray">
            Showing 1 to 10 of 120 results
          </p>
          <Pagination className="mx-0 w-fit justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Giving;
