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

  const baseClasses =
    "flex items-center lg:justify-center xl:justify-normal gap-2.5 rounded-[50px] px-4 py-2 transition-all duration-200";
  const hoverActiveClasses = "bg-white/2 text-white";

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
          baseClasses,
          isActive && hoverActiveClasses,
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
      className={hoverActiveClasses}
      content={<Link href={href}>{title}</Link>}
    >
      {listItem}
    </NavTooltip>
  ) : (
    listItem
  );
};

export default NavItem;
