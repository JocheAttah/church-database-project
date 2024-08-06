"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import ActivitiesIcon from "../icons/nav/activities-icon";
import AttendanceIcon from "../icons/nav/attendance-icon";
import DashboardIcon from "../icons/nav/dashboard-icon";
import FellowshipsCellsIcon from "../icons/nav/fellowships-cells-icon";
import GivingIcon from "../icons/nav/giving-icon";
import MembershipIcon from "../icons/nav/membership-icon";
import ReportsIcon from "../icons/nav/reports-icon";
import UserAccessIcon from "../icons/nav/user-access-icon";
import RightArrowIcon from "../icons/right-arrow-icon";
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
  {
    title: "Activities",
    Icon: ActivitiesIcon,
    href: "/dashboard/activities",
  },
  {
    title: "Reports",
    Icon: ReportsIcon,
    href: "/dashboard/reports",
  },
  {
    title: "User Access",
    Icon: UserAccessIcon,
    href: "/dashboard/user-access",
  },
];

type SideNavProps = {
  hideSideNav: boolean;
  setHideSideNav: Dispatch<SetStateAction<boolean>>;
};

const SideNav = ({ hideSideNav, setHideSideNav }: SideNavProps) => {
  const sidebarRef = useClickOutside(
    () => !hideSideNav && setHideSideNav(true),
  );

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

      <div className="mt-[25dvh] hidden w-full items-center justify-center gap-3 rounded-2.5 bg-shark px-2 py-4 text-white lg:flex">
        <Image
          className="rounded-full"
          src="/images/profile-pic.png"
          alt="Profile Picture"
          width={40}
          height={40}
        />
        <span className="lg:hidden xl:block">David Attah</span>
        <RightArrowIcon className="lg:hidden xl:block" />
      </div>
    </nav>
  );
};

export default SideNav;
