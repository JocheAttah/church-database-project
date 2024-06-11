"use client";
import { cn } from "@/lib/utils";
import NavIconProps from "@/types/nav-icon-props";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentType, useState } from "react";

type NavItemProps = {
  title: string;
  Icon: ComponentType<NavIconProps>;
  href: string;
};

const NavItem = ({ title, Icon, href }: NavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const isCurrentPath = pathname === href;
  const isActive = isHovered || isCurrentPath;

  const baseClasses =
    "flex items-center gap-2.5 rounded-[50px] px-4 py-2 transition-all duration-200";
  const hoverActiveClasses = "bg-white/[0.02] text-white";

  return (
    <>
      <li
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          href={href}
          className={cn(
            baseClasses,
            isActive && hoverActiveClasses,
            isCurrentPath && "font-semibold",
          )}
        >
          <Icon filled={isActive} /> <span>{title}</span>
        </Link>
      </li>
    </>
  );
};

export default NavItem;
