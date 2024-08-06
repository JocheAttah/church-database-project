"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import NavIconProps from "@/types/nav-icon-props";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentType, Dispatch, SetStateAction, useState } from "react";
import NavTooltip from "./nav-tooltip";

type NavItemProps = {
  title: string;
  Icon: ComponentType<NavIconProps>;
  href: string;
  setHideSideNav: Dispatch<SetStateAction<boolean>>;
};

const NavItem = ({ title, Icon, href, setHideSideNav }: NavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const isCurrentPath = pathname === href;
  const isActive = isHovered || isCurrentPath;

  const isLgScreenOnly = useMediaQuery(
    "(min-width: 1024px) and (max-width: 1279px)",
  );

  const listItem = (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={href}
        onClick={() => setHideSideNav(true)}
        className={cn(
          "flex items-center gap-2.5 rounded-[50px] px-4 py-2 transition-all duration-200 lg:justify-center xl:justify-normal",
          isActive && "bg-white/2 text-white",
          isCurrentPath && "font-semibold",
        )}
      >
        <Icon filled={isActive} />
        <span className="lg:hidden xl:block">{title}</span>
      </Link>
    </li>
  );
  return isLgScreenOnly ? (
    <NavTooltip
      className={"bg-shark text-white"}
      content={<Link href={href}>{title}</Link>}
    >
      {listItem}
    </NavTooltip>
  ) : (
    listItem
  );
};

export default NavItem;
