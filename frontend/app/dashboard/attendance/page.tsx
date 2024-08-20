import Card from "@/components/card";
import SearchInput from "@/components/search-input";
import AttendanceTable from "@/components/tables/attendance-table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { FunnelIcon } from "@heroicons/react/24/outline";

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

const Attendance = () => {
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
            <Button variant="secondary">Upload attendance</Button>
            <div className="flex items-center gap-1 text-sm text-dustygray">
              <FunnelIcon width={24} height={24} />
              <span>Filter</span>
            </div>
          </div>
        </div>
        <AttendanceTable />

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

export default Attendance;
