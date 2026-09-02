"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mountain, MessageSquare, LayoutDashboard, CalendarDays, Vote, Wallet, FileText, Settings, User, Users, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Direktori", href: "/directory", icon: Users },
  { name: "Agenda", href: "/events", icon: CalendarDays },
  { name: "E-Voting", href: "/governance", icon: Vote },
  { name: "Keuangan", href: "/finance", icon: Wallet },
  { name: "Dokumen", href: "/legal", icon: FileText },
  { name: "Banding", href: "/appeals", icon: User },
  { name: "Admin (Pengawas)", href: "/admin/appeals", icon: ShieldAlert },
  { name: "Admin (Kegiatan)", href: "/admin/events", icon: CalendarDays },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-[72px] flex-col items-center bg-[#0d4f54] py-6 shadow-xl z-10">
      {/* Logo */}
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
        <Mountain className="h-6 w-6" />
      </div>

      {/* Nav Menu */}
      <nav className="flex flex-1 flex-col items-center space-y-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              title={item.name}
              className={cn(
                "group relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-200",
                isActive 
                  ? "bg-white text-[#0d4f54] shadow-md" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {/* Tooltip on hover */}
              <span className="absolute left-14 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col items-center space-y-4">
        <Link href="/settings" className="flex h-12 w-12 items-center justify-center rounded-2xl text-white/70 hover:bg-white/10 hover:text-white transition-colors">
          <Settings className="h-5 w-5" />
        </Link>
        <Avatar className="h-10 w-10 border-2 border-white/20 cursor-pointer hover:border-white transition-colors">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-[#0d4f54] text-white">DI</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
