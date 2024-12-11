"use client";

import Card from "@/components/card";
import GrowthIndicator from "@/components/growth-indicator";
import GivingTable from "@/components/tables/giving/giving-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useGiving } from "@/hooks/useGiving";
import formatMoney from "@/utils/formatMoney";
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
  const {
    balance,
    totalInflow,
    totalOutflow,
    // inflowChangePercent,
    // outflowChangePercent,
    isLoading,
  } = useGiving();

  console.log(
    files,
    setFiles,
    givingConfig,
    form,
    onSubmit,
    isCalendarOpen,
    setIsCalendarOpen,
  );

  return (
    <>
      <h1 className="mb-5">Giving</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:flex">
        <Card className="w-full space-y-6 xl:max-w-[300px]">
          <p className="text-sm text-dustygray">Available balance</p>
          {isLoading ? (
            <Skeleton className="h-9 w-32" />
          ) : (
            <h1 className="duration-500 animate-in fade-in slide-in-from-bottom-3">
              {formatMoney(balance)}
            </h1>
          )}
        </Card>

        <Card className="w-full space-y-6 xl:max-w-[300px]">
          <p className="text-sm text-dustygray">Total inflow</p>
          {isLoading ? (
            <Skeleton className="h-9 w-32" />
          ) : (
            <h1 className="duration-500 animate-in fade-in slide-in-from-bottom-3">
              {formatMoney(totalInflow)}
            </h1>
          )}
          <GrowthIndicator growthPercentage={0} isLoading={isLoading} />
        </Card>

        <Card className="w-full space-y-6 xl:max-w-[300px]">
          <p className="text-sm text-dustygray">Total outflow</p>
          {isLoading ? (
            <Skeleton className="h-9 w-32" />
          ) : (
            <h1 className="duration-500 animate-in fade-in slide-in-from-bottom-3">
              {formatMoney(totalOutflow)}
            </h1>
          )}
          <GrowthIndicator growthPercentage={0} isLoading={isLoading} />
        </Card>
      </div>

      <Card className="mt-8 space-y-5 p-6">
        <GivingTable />
      </Card>
    </>
  );
};

export default Giving;
