"use client";

import Card from "@/components/card";
import ArrowSmallLeftIcon from "@/components/icons/arrow-small-left-icon";
import SearchInput from "@/components/search-input";
import FellowshipsCellsTable from "@/components/tables/fellowships-cells-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import data from "../data";

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
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap items-center gap-5">
            <h2>{data.find((item) => item.key === params.name)?.name}</h2>
            <SearchInput />
          </div>
          <div className="flex items-center gap-1 text-sm text-dustygray">
            <FunnelIcon width={24} height={24} />
            <span>Filter</span>
          </div>
        </div>
        <FellowshipsCellsTable name={params.name} />

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
    </div>
  );
};

export default FellowshipCellName;
