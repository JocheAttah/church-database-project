"use client";

import Card from "@/components/card";
import GrowthIcon from "@/components/icons/growth-icon";
import SearchInput from "@/components/search-input";
import GivingTable from "@/components/tables/giving-table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import formatMoney from "@/utils/formatMoney";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <>
      <h1 className="mb-5">Giving</h1>
      <div className="mb-6 grid grid-cols-1 flex-wrap gap-5 sm:grid-cols-2 md:grid-cols-3 xl:flex">
        <Card className="w-full space-y-6 xl:max-w-[300px]">
          <p className="text-sm text-dustygray">Available balance</p>
          <h1>{formatMoney(1000000)}</h1>
        </Card>

        <Card className="w-full space-y-6 xl:max-w-[300px]">
          <p className="text-sm text-dustygray">Total inflow</p>
          <h1>{formatMoney(3120050)}</h1>
          <div className="flex items-center text-xs">
            <GrowthIcon />
            <p className="ml-1 text-junglegreen">1.7%</p>
            <p className="ml-2 text-dustygray">in the last month</p>
          </div>
        </Card>

        <Card className="w-full space-y-6 xl:max-w-[300px]">
          <p className="text-sm text-dustygray">Total outflow</p>
          <h1>{formatMoney(2120050)}</h1>
          <div className="flex items-center text-xs">
            <GrowthIcon />
            <p className="ml-1 text-junglegreen">1.7%</p>
            <p className="ml-2 text-dustygray">in the last month</p>
          </div>
        </Card>
      </div>

      <Card className="space-y-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap items-center gap-5">
            <h2>Inflow</h2>
            <SearchInput />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button variant="secondary">New Inflow</Button>
            <div className="flex items-center gap-1 text-sm text-dustygray">
              <FunnelIcon width={24} height={24} />
              <span>Filter</span>
            </div>
          </div>
        </div>
        <GivingTable />

        <div className="flex flex-wrap items-center justify-between gap-5">
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
      </Card>
    </>
  );
};

export default Giving;
