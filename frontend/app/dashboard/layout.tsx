import SideNav from "@/components/nav/sidenav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-woodsmoke text-white">
      <SideNav />
      <div className="p-8 sm:ml-[210px]">{children}</div>
    </section>
  );
}
