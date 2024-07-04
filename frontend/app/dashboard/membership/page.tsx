import Card from "@/components/card";
import GrowthIcon from "@/components/icons/growth-icon";
import MembershipIcon from "@/components/icons/nav/membership-icon";
import MembershipBourBonIcon from "@/components/icons/nav/membership-icon-b";
import MembershipWhiskeyIcon from "@/components/icons/nav/membership-icon-w";
import { Button } from "@/components/ui/button";
import { FunnelIcon } from "@heroicons/react/24/outline";

const Membership = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-1 flex-row">
        <div className="grid w-full grid-cols-3 gap-x-5 gap-y-8">
          {/* Total membership */}
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
          {/* Workers in Training */}
          <Card className="space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="rounded-[3px] bg-white/2 p-2.5">
                <MembershipBourBonIcon width={20} height={20} filled />
              </div>
              <p className="text-sm text-dustygray">Workers in Training</p>
            </div>

            <h1>300</h1>

            <div className="flex items-center text-xs">
              <GrowthIcon />
              <p className="ml-1 text-junglegreen">16%</p>
              <p className="ml-2 text-dustygray">in the last month</p>
            </div>
          </Card>
          {/* Members and Disciples */}
          <Card className="space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="rounded-[3px] bg-white/2 p-2.5">
                <MembershipWhiskeyIcon width={20} height={20} filled />
              </div>
              <p className="text-sm text-dustygray">Members and Disciples</p>
            </div>

            <h1>7,700</h1>

            <div className="flex items-center text-xs">
              <GrowthIcon />
              <p className="ml-1 text-junglegreen">16%</p>
              <p className="ml-2 text-dustygray">in the last month</p>
            </div>
          </Card>
        </div>
        {/* Gender Chart */}
        <Card className="ml-5 w-[207px]"></Card>
      </div>
      {/* Table */}
      <div className="mt-8">
        <Card>
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <p className="text-xl text-white">Membership list</p>
              {/* //Add search comp */}
            </div>
            <div className="flex flex-row items-center">
              <FunnelIcon className="mr-[5px] size-8 text-dustygray" />
              <p className="text-sm text-dustygray">Filter</p>
              <Button
                className="ml-6 w-full bg-sapphire-700 hover:bg-sapphire-800 active:bg-sapphire-900"
                type="submit"
              >
                Update list
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Membership;
