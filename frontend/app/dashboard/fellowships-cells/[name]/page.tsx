"use client";

import Card from "@/components/card";
import ArrowSmallLeftIcon from "@/components/icons/arrow-small-left-icon";
import SearchInput from "@/components/search-input";
import FellowshipCellsTable from "@/components/tables/fellowship-cells-table";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { data } from "../page";

type FellowshipCellNameProps = { params: { name: string } };

const FellowshipCellName = ({ params }: FellowshipCellNameProps) => {
  const router = useRouter();

  return (
    <div>
      <div
        className="mb-11 flex w-fit cursor-pointer items-center gap-1.5 self-end text-dustygray hover:underline"
        onClick={router.back}
      >
        <ArrowSmallLeftIcon />
        <p className="text-xs">Fellowships/Cells</p>
      </div>

      <Card className="space-y-5 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <h2>{data.find((item) => item.key === params.name)?.name}</h2>
            <SearchInput />
          </div>
          <div className="flex items-center gap-1 text-sm text-dustygray">
            <FunnelIcon width={24} height={24} />
            <span>Filter</span>
          </div>
        </div>
        <FellowshipCellsTable />
      </Card>
    </div>
  );
};

export default FellowshipCellName;
