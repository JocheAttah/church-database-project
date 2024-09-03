"use client";
import SideNav from "@/components/nav/side-nav";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { startHolyLoader } from "holy-loader";
import { LogOutIcon, MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOutAction } from "../actions";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hideSideNav, setHideSideNav] = useState(true);
  const isMobileScreen = useMediaQuery("(max-width: 1023px)");
  const router = useRouter();

  return (
    <section className="min-h-screen bg-woodsmoke text-white">
      <SideNav hideSideNav={hideSideNav} setHideSideNav={setHideSideNav} />

      {isMobileScreen && !hideSideNav && (
        <div className="fixed inset-0 z-10 bg-white/2 backdrop-blur-md" />
      )}

      <div className="p-8 lg:ml-[105px] xl:ml-[210px]">
        <nav className="fixed left-0 right-0 top-0 z-10 flex h-14 w-full items-center justify-between border-b border-b-mineshaft bg-shark px-4 lg:hidden">
          <button
            className="flex items-center justify-center"
            onClick={() => setHideSideNav(!hideSideNav)}
          >
            <MenuIcon className="text-white" />
          </button>

          <div
            className="flex items-center justify-center"
            onClick={() => {
              startHolyLoader();
              signOutAction();
            }}
          >
            <LogOutIcon />
          </div>
        </nav>

        <div className="mt-14 lg:mt-0">{children}</div>
      </div>
    </section>
  );
}
