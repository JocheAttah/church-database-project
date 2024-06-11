import ActivitiesIcon from "../icons/nav/activities-icon";
import AttendanceIcon from "../icons/nav/attendance-icon";
import DashboardIcon from "../icons/nav/dashboard-icon";
import FellowshipsIcon from "../icons/nav/fellowships-icon";
import GivingIcon from "../icons/nav/giving-icon";
import MembershipIcon from "../icons/nav/membership-icon";
import ReportsIcon from "../icons/nav/reports-icon";
import UserAccessIcon from "../icons/nav/user-access-icon";
import Logo from "../logo";
import NavItem from "./nav-item";

const SideNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 top-0 flex h-screen w-full max-w-[210px] flex-col items-center border-r border-r-mineshaft px-4 py-8 text-sm text-dustygray">
      <Logo className="mb-11" width={70} height={32.08} />
      <ul className="w-full space-y-6">
        <NavItem title="Dashboard" Icon={DashboardIcon} href="/dashboard" />
        <NavItem
          title="Membership"
          Icon={MembershipIcon}
          href="/dashboard/membership"
        />
        <NavItem
          title="Fellowships"
          Icon={FellowshipsIcon}
          href="/dashboard/fellowships"
        />
        <NavItem
          title="Attendance"
          Icon={AttendanceIcon}
          href="/dashboard/attendance"
        />
        <NavItem title="Giving" Icon={GivingIcon} href="/dashboard/giving" />
        <NavItem
          title="Activities"
          Icon={ActivitiesIcon}
          href="/dashboard/activities"
        />
        <NavItem title="Reports" Icon={ReportsIcon} href="/dashboard/reports" />
        <NavItem
          title="User Access"
          Icon={UserAccessIcon}
          href="/dashboard/user-access"
        />
      </ul>
    </nav>
  );
};

export default SideNav;