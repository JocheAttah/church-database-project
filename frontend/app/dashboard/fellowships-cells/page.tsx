import Card from "@/components/card";
import ArrowSmallRightIcon from "@/components/icons/arrow-small-right-icon";
import GrowthIcon from "@/components/icons/growth-icon";
import FellowshipsCellsIcon from "@/components/icons/nav/fellowships-cells-icon";
import MembershipIcon from "@/components/icons/nav/membership-icon";
import Link from "next/link";
import data from "./data";

const FellowshipsCells = () => {
  return (
    <>
      <h1 className="mb-5">Fellowships/Cells</h1>
      <div className="grid grid-cols-3 gap-7">
        <Card className="space-y-6">
          <div className="flex items-center gap-3.5">
            <div className="rounded-[3px] bg-white/2 p-2.5">
              <MembershipIcon width={20} height={20} filled />
            </div>
            <p className="text-sm text-dustygray">Total membership</p>
          </div>

          <h1>10,000</h1>

          <div className="flex items-center text-xs">
            <GrowthIcon />
            <p className="ml-1 text-junglegreen">1.7%</p>
            <p className="ml-2 text-dustygray">in the last month</p>
          </div>
        </Card>

        {data.map(({ name, key, size }) => (
          <Link key={key} href={`/dashboard/fellowships-cells/${key}`}>
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
