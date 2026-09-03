"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Mountain, LayoutDashboard, CalendarDays, Vote, Wallet, Settings, User, Users, 
  ShieldAlert, Award, QrCode, Gavel, DollarSign, ChevronLeft, ChevronRight, 
  ChevronDown, FileText, LockKeyhole, FolderCheck, ShieldCheck, Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const memberMenuItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Kartu Anggota (MR-02)", href: "/membership", icon: Award },
  { name: "Direktori Anggota", href: "/directory", icon: Users },
  { name: "Kegiatan (EV-01)", href: "/events", icon: CalendarDays },
  { name: "Musyawarah & Vote", href: "/governance", icon: Vote },
  { name: "Keuangan (FN-01)", href: "/finance", icon: Wallet },
  { name: "Dokumen Legal (DC-01)", href: "/documents", icon: FileText },
  { name: "Pusat Banding (MR-04)", href: "/appeals", icon: User },
];

const adminSubMenuItems = [
  { name: "Manajemen Kegiatan", href: "/admin/events", icon: CalendarDays },
  { name: "Scanner QR Presensi", href: "/admin/events/scanner", icon: QrCode },
  { name: "Ruang Kontrol Governance", href: "/admin/governance", icon: Gavel },
  { name: "Matriks Keuangan Nirlaba", href: "/admin/finance", icon: DollarSign },
  { name: "Vault Legal & Dokumen", href: "/admin/documents", icon: FolderCheck },
  { name: "Audit Log UU PDP", href: "/admin/audit-logs", icon: ShieldCheck },
  { name: "Audit Banding Pengawas", href: "/admin/appeals", icon: ShieldAlert },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdminSubMenuOpen, setIsAdminSubMenuOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdminActive = pathname.startsWith("/admin");

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. MOBILE TOP HEADER (Visible only on < lg screens) */}
      {/* ========================================================================= */}
      <header className="lg:hidden flex items-center justify-between bg-[#0d4f54] text-white px-4 py-3 sticky top-0 z-40 border-b border-white/10 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Buka Menu Navigasi"
          >
            <Menu className="h-5 w-5 text-amber-300" />
          </button>

          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white">
              <Mountain className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <h1 className="font-extrabold text-xs tracking-wider leading-none">PROVOKASI</h1>
              <p className="text-[9px] font-bold text-amber-300/90 tracking-widest uppercase">Komunitas LIO</p>
            </div>
          </Link>
        </div>

        <Link href="/membership" className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border-2 border-amber-300/80 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-[#0d4f54] text-white font-bold text-[10px]">DI</AvatarFallback>
          </Avatar>
        </Link>
      </header>

      {/* ========================================================================= */}
      {/* 2. MOBILE DRAWER SLIDE-OVER (Visible on mobile when open) */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content Panel */}
          <div className="relative w-4/5 max-w-xs bg-[#0d4f54] text-white h-full flex flex-col p-4 shadow-2xl z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-white/15">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Mountain className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <h2 className="font-extrabold text-sm text-white leading-tight">PROVOKASI</h2>
                  <p className="text-[10px] font-bold text-amber-300 tracking-wider">Komunitas LIO</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Tutup Menu"
              >
                <X className="h-5 w-5 text-amber-300" />
              </button>
            </div>

            {/* Mobile Menu Nav Links */}
            <nav className="flex-1 space-y-1.5 py-2 overflow-y-auto scrollbar-hide">
              <p className="text-[10px] font-extrabold text-white/50 uppercase tracking-wider px-3 mb-1">
                Portal Anggota
              </p>
              {memberMenuItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href) && !item.href.startsWith("/admin"));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 h-10 px-3.5 rounded-xl text-xs font-bold transition-all",
                      isActive 
                        ? "bg-white text-[#0d4f54] shadow-md" 
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <item.icon className="h-4.5 w-4.5 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              <div className="w-full my-3 border-t border-white/15"></div>

              <p className="text-[10px] font-extrabold text-white/50 uppercase tracking-wider px-3 mb-1">
                Konsol Pengawas & Admin
              </p>
              
              <button
                onClick={() => setIsAdminSubMenuOpen(prev => !prev)}
                className={cn(
                  "flex items-center justify-between w-full h-10 px-3.5 rounded-xl text-xs font-bold transition-all text-left",
                  isAdminActive 
                    ? "bg-amber-400/20 text-amber-200 border border-amber-300/40" 
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className="h-4.5 w-4.5 shrink-0 text-amber-300" />
                  <span>Konsol Admin</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isAdminSubMenuOpen ? "rotate-180" : "")} />
              </button>

              {isAdminSubMenuOpen && (
                <div className="mt-1 ml-3 pl-3 border-l-2 border-amber-300/30 space-y-1">
                  {adminSubMenuItems.map((subItem) => {
                    const isSubActive = pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 h-8 px-3 rounded-lg text-xs transition-all",
                          isSubActive 
                            ? "bg-white text-[#0d4f54] font-extrabold shadow-sm" 
                            : "text-white/70 hover:bg-white/10 hover:text-white font-medium"
                        )}
                      >
                        <subItem.icon className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{subItem.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </nav>

            {/* Mobile Footer Profile */}
            <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between">
              <Link href="/membership" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border-2 border-amber-300/80">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-[#0d4f54] text-white font-bold text-xs">DI</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Dwi Ishak M.</p>
                  <p className="text-[10px] text-amber-300 font-extrabold uppercase">Anggota Aktif</p>
                </div>
              </Link>
              <Link 
                href="/settings" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                title="Pengaturan"
              >
                <Settings className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DESKTOP SIDEBAR (Visible only on lg+ screens) */}
      {/* ========================================================================= */}
      <div 
        className={cn(
          "hidden lg:flex h-screen flex-col bg-[#0d4f54] text-white py-5 shadow-2xl z-30 shrink-0 transition-all duration-300 relative border-r border-white/10",
          isExpanded ? "w-64 px-4" : "w-20 items-center px-2"
        )}
      >
        {/* Expand / Collapse Toggle Button */}
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className="absolute -right-3.5 top-7 bg-slate-900 border border-slate-700 text-white rounded-full p-1 shadow-lg hover:bg-slate-800 hover:scale-110 transition-all z-50 cursor-pointer"
          title={isExpanded ? "Ciutkan Sidebar" : "Perluas Sidebar"}
        >
          {isExpanded ? <ChevronLeft className="h-4 w-4 text-amber-300" /> : <ChevronRight className="h-4 w-4 text-amber-300" />}
        </button>

        {/* Logo Header */}
        <div className={cn("mb-6 flex items-center gap-3 w-full px-2", isExpanded ? "justify-start" : "justify-center")}>
          <Link href="/" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
            <Mountain className="h-6 w-6 text-amber-300" />
          </Link>
          {isExpanded && (
            <div className="overflow-hidden">
              <h1 className="font-extrabold text-sm tracking-wide text-white leading-tight">PROVOKASI</h1>
              <p className="text-[10px] font-bold text-amber-300/90 tracking-widest uppercase">Komunitas LIO</p>
            </div>
          )}
        </div>

        {/* Navigation Links List */}
        <nav className="flex flex-1 flex-col space-y-1.5 overflow-y-auto scrollbar-hide w-full pr-0.5">
          
          {/* Section Title when Expanded */}
          {isExpanded && (
            <p className="text-[10px] font-extrabold text-white/50 uppercase tracking-wider px-3 mb-1">
              Portal Anggota
            </p>
          )}

          {/* Member Items */}
          {memberMenuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href) && !item.href.startsWith("/admin"));
            return (
              <Link
                key={item.name}
                href={item.href}
                title={!isExpanded ? item.name : undefined}
                className={cn(
                  "group relative flex items-center rounded-2xl transition-all duration-200 cursor-pointer",
                  isExpanded ? "h-10 px-3.5 gap-3.5 w-full" : "h-10 w-10 justify-center mx-auto",
                  isActive 
                    ? "bg-white text-[#0d4f54] shadow-lg font-bold" 
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" />
                
                {isExpanded && (
                  <span className="text-xs font-bold truncate">{item.name}</span>
                )}

                {/* Tooltip when collapsed */}
                {!isExpanded && (
                  <span className="absolute left-16 rounded-lg bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs font-bold text-white shadow-xl opacity-0 transition-all duration-200 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="w-full my-2 border-t border-white/15"></div>

          {/* GROUPED ADMIN CONSOLE SUB-MENU */}
          {isExpanded && (
            <p className="text-[10px] font-extrabold text-white/50 uppercase tracking-wider px-3 mb-1">
              Konsol Pengawas & Admin
            </p>
          )}

          <div className="w-full">
            {/* Admin Parent Item */}
            <button
              onClick={() => {
                if (!isExpanded) setIsExpanded(true);
                setIsAdminSubMenuOpen(prev => !prev);
              }}
              title={!isExpanded ? "Konsol Admin & Pengawas" : undefined}
              className={cn(
                "group relative flex items-center rounded-2xl transition-all duration-200 w-full text-left cursor-pointer",
                isExpanded ? "h-10 px-3.5 justify-between" : "h-10 w-10 justify-center mx-auto",
                isAdminActive 
                  ? "bg-amber-400/20 text-amber-200 border border-amber-300/40 font-bold" 
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3.5">
                <ShieldAlert className="h-4.5 w-4.5 shrink-0 text-amber-300" />
                {isExpanded && <span className="text-xs font-bold truncate">Konsol Admin</span>}
              </div>

              {isExpanded && (
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isAdminSubMenuOpen ? "transform rotate-180" : "")} />
              )}

              {/* Tooltip when collapsed */}
              {!isExpanded && (
                <span className="absolute left-16 rounded-lg bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs font-bold text-white shadow-xl opacity-0 transition-all duration-200 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  Konsol Admin (7 Sub-Menu)
                </span>
              )}
            </button>

            {/* Sub-menu Collapsible Accordion (Shown when Expanded & Open) */}
            {isExpanded && isAdminSubMenuOpen && (
              <div className="mt-1.5 ml-4 pl-3 border-l-2 border-amber-300/30 space-y-1">
                {adminSubMenuItems.map((subItem) => {
                  const isSubActive = pathname === subItem.href;
                  return (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={cn(
                        "flex items-center gap-2.5 h-8 px-3 rounded-xl text-xs transition-all cursor-pointer",
                        isSubActive 
                          ? "bg-white text-[#0d4f54] font-black shadow-md" 
                          : "text-white/70 hover:bg-white/10 hover:text-white font-medium"
                      )}
                    >
                      <subItem.icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate text-[11px]">{subItem.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

        </nav>

        {/* Bottom Profile Footer */}
        <div className={cn("mt-auto flex items-center pt-3 border-t border-white/10 w-full", isExpanded ? "justify-between px-2" : "justify-center flex-col space-y-3")}>
          <Link href="/membership" className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-amber-300/60 cursor-pointer hover:border-amber-300 transition-colors shadow-md shrink-0">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-[#0d4f54] text-white font-bold text-xs">DI</AvatarFallback>
            </Avatar>
            
            {isExpanded && (
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">Dwi Ishak M.</p>
                <p className="text-[10px] text-amber-300 font-extrabold uppercase">Anggota Aktif</p>
              </div>
            )}
          </Link>

          <Link href="/settings" title="Pengaturan" className="flex h-9 w-9 items-center justify-center rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors shrink-0">
            <Settings className="h-4.5 w-4.5" />
          </Link>
        </div>

      </div>
    </>
  );
}
