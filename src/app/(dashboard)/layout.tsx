import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen overflow-x-hidden lg:overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto w-full min-w-0">
        {children}
      </main>
    </div>
  );
}
