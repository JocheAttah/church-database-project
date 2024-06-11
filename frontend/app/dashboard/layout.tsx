export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-woodsmoke min-h-screen text-white">
      <nav></nav>
      {children}
    </section>
  );
}
