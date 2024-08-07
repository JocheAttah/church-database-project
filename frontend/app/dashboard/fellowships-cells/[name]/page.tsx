"use client";

import Card from "@/components/card";
import ArrowSmallLeftIcon from "@/components/icons/arrow-small-left-icon";
import FellowshipCellsTable from "@/components/tables/fellowship-cells-table";
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

      <Card className="p-6">
        <h2 className="mb-5">
          {data.find((item) => item.key === params.name)?.name}
        </h2>
        <FellowshipCellsTable />
      </Card>
    </div>
  );
};

export default FellowshipCellName;
