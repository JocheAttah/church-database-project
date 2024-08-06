"use client";

import ArrowSmallLeftIcon from "@/components/icons/arrow-small-left-icon";
import { useRouter } from "next/navigation";

type FellowshipCellNameProps = { params: { name: string } };

const FellowshipCellName = ({ params }: FellowshipCellNameProps) => {
  const router = useRouter();

  return (
    <div>
      <div
        className="flex w-fit cursor-pointer items-center gap-1.5 self-end text-dustygray hover:underline"
        onClick={router.back}
      >
        <ArrowSmallLeftIcon />
        <p className="text-xs">Fellowships/Cells</p>
      </div>

      {params.name}
    </div>
  );
};

export default FellowshipCellName;
