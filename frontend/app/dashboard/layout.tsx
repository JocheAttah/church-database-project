"use client";
import SideNav from "@/components/nav/side-nav";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hideSideNav, setHideSideNav] = useState(true);
  const isMobileScreen = useMediaQuery("(max-width: 1023px)");

  return (
    <section className="min-h-screen bg-woodsmoke text-white">
      <SideNav hideSideNav={hideSideNav} setHideSideNav={setHideSideNav} />

      {isMobileScreen && !hideSideNav && (
        <div className="fixed inset-0 z-10 bg-white/2 backdrop-blur-md" />
      )}

      <div className="p-8 lg:ml-[105px] xl:ml-[210px]">
        <nav className="fixed left-0 right-0 top-0 z-[5px] flex h-14 w-full items-center justify-between border-b border-b-mineshaft bg-shark px-4 lg:hidden">
          <button
            className="flex items-center justify-center"
            onClick={() => setHideSideNav(!hideSideNav)}
          >
            <MenuIcon className="text-white" />
          </button>

          <div className="flex items-center justify-center">
            <Image
              className="rounded-full"
              src="/images/profile-pic.png"
              alt="Profile Picture"
              width={40}
              height={40}
            />
          </div>
        </nav>

        <div className="mt-14 lg:mt-0">{children}</div>
      </div>
    </section>
  );
}
