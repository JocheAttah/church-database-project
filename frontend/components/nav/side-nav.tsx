"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { startHolyLoader } from "holy-loader";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import AttendanceIcon from "../icons/nav/attendance-icon";
import DashboardIcon from "../icons/nav/dashboard-icon";
import FellowshipsCellsIcon from "../icons/nav/fellowships-cells-icon";
import GivingIcon from "../icons/nav/giving-icon";
import MembershipIcon from "../icons/nav/membership-icon";
import Logo from "../logo";
import NavItem from "./nav-item";

const sideMenu = [
  {
    title: "Dashboard",
    Icon: DashboardIcon,
    href: "/dashboard",
  },
  {
    title: "Membership",
    Icon: MembershipIcon,
    href: "/dashboard/membership",
  },
  {
    title: "Fellowships/Cells",
    Icon: FellowshipsCellsIcon,
    href: "/dashboard/fellowships-cells",
  },
  {
    title: "Attendance",
    Icon: AttendanceIcon,
    href: "/dashboard/attendance",
  },
  {
    title: "Giving",
    Icon: GivingIcon,
    href: "/dashboard/giving",
  },
  // {
  //   title: "Activities",
  //   Icon: ActivitiesIcon,
  //   href: "/dashboard/activities",
  // },
  // {
  //   title: "Reports",
  //   Icon: ReportsIcon,
  //   href: "/dashboard/reports",
  // },
  // {
  //   title: "User Access",
  //   Icon: UserAccessIcon,
  //   href: "/dashboard/user-access",
  // },
];

type SideNavProps = {
  hideSideNav: boolean;
  setHideSideNav: Dispatch<SetStateAction<boolean>>;
};

const SideNav = ({ hideSideNav, setHideSideNav }: SideNavProps) => {
  const sidebarRef = useClickOutside(
    () => !hideSideNav && setHideSideNav(true),
  );
  const router = useRouter();

  return (
    <nav
      ref={sidebarRef}
      className={cn(
        "no-scrollbar fixed bottom-0 left-0 top-0 z-20 flex h-screen w-full max-w-[210px] flex-col items-center overflow-y-scroll border-r border-r-mineshaft bg-woodsmoke px-4 py-8 text-sm text-dustygray transition duration-200 ease-in-out lg:w-[105px] lg:translate-x-0 xl:w-full",
        hideSideNav && "-translate-x-full",
      )}
    >
      <Logo className="mb-11" width={70} height={32} />
      <ul className="w-full space-y-4">
        {sideMenu.map(({ title, Icon, href }) => (
          <NavItem
            key={title}
            title={title}
            Icon={Icon}
            href={href}
            setHideSideNav={setHideSideNav}
          />
        ))}
      </ul>

      <div
        className="group mt-[25dvh] flex w-full cursor-pointer items-center gap-2.5 rounded-[50px] px-4 py-2 transition-all duration-200 hover:bg-white/2 hover:text-white lg:justify-center xl:justify-normal"
        onClick={() => {
          startHolyLoader();
          router.push("/login");
        }}
      >
        <LogOutIcon className="group-hover:text-red-500" />
        <span className="lg:hidden xl:block">Logout</span>
      </div>
    </nav>
  );
};

export default SideNav;
