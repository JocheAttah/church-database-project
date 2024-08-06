import Card from "@/components/card";
import ArrowSmallRightIcon from "@/components/icons/arrow-small-right-icon";
import GrowthIcon from "@/components/icons/growth-icon";
import FellowshipsCellsIcon from "@/components/icons/nav/fellowships-cells-icon";
import MembershipIcon from "@/components/icons/nav/membership-icon";

const data = [
  {
    name: "Durumi Fellowship",
    size: 2100,
    data: [],
  },
  {
    name: "Wuse Fellowship",
    size: 2100,
    data: [],
  },
  {
    name: "Jikwoyi Cell",
    size: 2100,
    data: [],
  },
  {
    name: "Lugbe Cell",
    size: 2100,
    data: [],
  },
  {
    name: "Pigbakasa Cell",
    size: 2100,
    data: [],
  },
  {
    name: "Karu Fellowship",
    size: 2100,
    data: [],
  },
  {
    name: "Kuje Cell",
    size: 2100,
    data: [],
  },
  {
    name: "Lokogoma Cell",
    size: 2100,
    data: [],
  },
  {
    name: "Kubwa Cell",
    size: 2100,
    data: [],
  },
];
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

        {data.map(({ name, data, size }) => (
          <Card key={name} className="flex flex-col space-y-6">
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
        ))}
      </div>
    </>
  );
};

export default FellowshipsCells;
