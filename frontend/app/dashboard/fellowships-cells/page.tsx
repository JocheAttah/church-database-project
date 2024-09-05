import Card from "@/components/card";
import TotalMembershipCard from "@/components/cards/total-membership-card";
import ArrowSmallRightIcon from "@/components/icons/arrow-small-right-icon";
import FellowshipsCellsIcon from "@/components/icons/nav/fellowships-cells-icon";
import Link from "next/link";
import data from "./data";

const FellowshipsCells = () => {
  return (
    <>
      <h1 className="mb-5">Fellowships/Cells</h1>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3">
        <TotalMembershipCard className="col-span-1 sm:col-span-1 xl:col-span-1" />

        {data.map(({ name, key, size }) => (
          <Link key={key} href={`fellowships-cells/${key}`}>
            <Card className="flex flex-col space-y-6">
              <div className="flex items-center gap-3.5">
                <div className="rounded-[3px] bg-white/2 p-2.5">
                  <FellowshipsCellsIcon width={20} height={20} filled />
                </div>
                <p className="text-sm text-dustygray">{name}</p>
              </div>

              <h1>{size.toLocaleString()}</h1>

              <div className="flex items-center self-end text-dustygray">
                <p className="text-xs">View membership</p>
                <ArrowSmallRightIcon />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default FellowshipsCells;
