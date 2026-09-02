"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mountain, LayoutDashboard, CalendarDays, Vote, Wallet, FileText, Settings, User, Users, ShieldAlert, Award, QrCode, Gavel, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Kartu Anggota (MR-02)", href: "/membership", icon: Award },
  { name: "Direktori Anggota", href: "/directory", icon: Users },
  { name: "Kegiatan (EV-01)", href: "/events", icon: CalendarDays },
  { name: "Musyawarah & E-Voting", href: "/governance", icon: Vote },
  { name: "Keuangan Member (FN-01)", href: "/finance", icon: Wallet },
  { name: "Pusat Banding (MR-04)", href: "/appeals", icon: User },
  
  // Section Admin & Pengawas
  { name: "Admin (Kegiatan)", href: "/admin/events", icon: CalendarDays },
  { name: "Admin (Scanner QR)", href: "/admin/events/scanner", icon: QrCode },
  { name: "Admin (Governance)", href: "/admin/governance", icon: Gavel },
  { name: "Admin (Matriks Keuangan)", href: "/admin/finance", icon: DollarSign },
  { name: "Admin (Pengawas Banding)", href: "/admin/appeals", icon: ShieldAlert },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-[76px] flex-col items-center bg-[#0d4f54] py-5 shadow-xl z-20 shrink-0">
      {/* Logo */}
      <Link href="/" className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
        <Mountain className="h-6 w-6 text-amber-300" />
      </Link>

      {/* Nav Menu */}
      <nav className="flex flex-1 flex-col items-center space-y-2 overflow-y-auto scrollbar-hide w-full px-2">
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href) && item.href.length > 1);
          const isAdminDivider = idx === 7; // Index before Admin section
          
          return (
            <div key={item.name} className="w-full flex flex-col items-center">
              {isAdminDivider && (
                <div className="w-8 h-[1px] bg-white/20 my-1.5"></div>
              )}
              
              <Link
                href={item.href}
                title={item.name}
                className={cn(
                  "group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-white text-[#0d4f54] shadow-lg font-bold scale-105" 
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="h-4.5 w-4.5" />
                {/* Tooltip on hover */}
                <span className="absolute left-14 rounded-lg bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs font-bold text-white shadow-xl opacity-0 transition-all duration-200 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  {item.name}
                </span>
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col items-center space-y-3 pt-3 border-t border-white/10 w-full">
        <Link href="/settings" title="Pengaturan" className="flex h-9 w-9 items-center justify-center rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors">
          <Settings className="h-4.5 w-4.5" />
        </Link>
        <Link href="/membership">
          <Avatar className="h-9 w-9 border-2 border-amber-300/60 cursor-pointer hover:border-amber-300 transition-colors shadow-md">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-[#0d4f54] text-white font-bold text-xs">DI</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}
