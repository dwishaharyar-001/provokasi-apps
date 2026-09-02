"use client";

import { Search, Bell, Zap, MessageCircle, MoreHorizontal, Check, QrCode, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="flex h-full w-full bg-white rounded-tl-[40px] shadow-sm my-4 mr-4 border overflow-hidden">
      
      {/* 1. SECONDARY SIDEBAR (Activities / Messages List) */}
      <div className="w-80 border-r bg-white flex flex-col">
        {/* Header List */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Aktivitas Anda</h2>
          <div className="flex items-center gap-4 mt-6">
            <Button className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white rounded-full px-6 shadow-md shadow-teal-500/20 w-full flex gap-2">
              <QrCode className="w-4 h-4" /> Scan Presensi
            </Button>
            <Button variant="outline" size="icon" className="rounded-full shrink-0">
              <Search className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
          
          <div className="flex gap-4 mt-6 border-b pb-2">
            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <div className="relative">
                <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
                <span className="absolute -top-1 -right-2 bg-gray-100 text-gray-600 text-[10px] font-bold px-1.5 rounded-full">5</span>
              </div>
              <div className="h-1 w-6 bg-transparent mt-1"></div>
            </div>
            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <div className="relative">
                <MessageCircle className="w-5 h-5 text-[#0eb7b7]" />
                <span className="absolute -top-1 -right-2 bg-amber-500 text-white text-[10px] font-bold px-1.5 rounded-full">8</span>
              </div>
              <div className="h-1 w-6 bg-[#0eb7b7] rounded-full mt-1"></div>
            </div>
          </div>
        </div>

        {/* List Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="text-sm font-bold text-gray-800 mb-4 px-2 flex justify-between">
            Tugas Mendatang
            <span className="text-gray-400 cursor-pointer"><MoreHorizontal className="w-4 h-4"/></span>
          </div>
          
          {/* Card Item 1 */}
          <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 cursor-pointer transition-colors hover:bg-teal-50">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-white shadow-sm">
                  <AvatarImage src="https://i.pravatar.cc/150?u=1" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-gray-900">Forum Bulanan</p>
                  <p className="text-xs text-gray-500">Panitia Acara</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-500">09:47 AM</span>
            </div>
            <p className="text-sm text-gray-600 truncate">Persiapan materi untuk sesi besok...</p>
            <div className="mt-3 flex">
              <span className="text-[10px] font-bold px-2 py-1 bg-[#0eb7b7] text-white rounded-full uppercase tracking-wider">
                WAJIB HADIR
              </span>
            </div>
          </div>

          {/* Card Item 2 */}
          <div className="p-4 rounded-2xl border border-transparent hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold shadow-sm">
                  FN
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Iuran Tahunan</p>
                  <p className="text-xs text-gray-500">Bendahara Pusat</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-500">Kemarin</span>
            </div>
            <p className="text-sm text-gray-600 truncate flex gap-1 items-center">
               <CreditCard className="w-3 h-3"/> Iuran 2026 belum dilunasi
            </p>
            <div className="mt-3 flex">
              <span className="text-[10px] font-bold px-2 py-1 border border-amber-500 text-amber-500 rounded-full uppercase tracking-wider">
                BUTUH PERHATIAN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd]">
        {/* Top Header */}
        <div className="h-20 border-b flex items-center justify-between px-8 bg-white">
           <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Cari anggota, agenda, dokumen..." 
              className="w-full rounded-full bg-gray-50 border-gray-200 pl-10 shadow-inner text-sm focus-visible:ring-1 focus-visible:ring-[#0eb7b7]" 
            />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-amber-500 cursor-pointer hover:bg-amber-50 p-2 rounded-full transition-colors">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div className="relative cursor-pointer hover:bg-gray-50 p-2 rounded-full transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#0eb7b7] border-2 border-white"></span>
            </div>
            
            <div className="flex items-center gap-3 pl-4 border-l cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">Dwi Ishak M.</p>
                <p className="text-xs text-gray-500 font-medium">Anggota LIO-08</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-[#0eb7b7] transition-all">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>DI</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Status Header */}
          <div className="flex flex-col items-center justify-center py-10">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white shadow-xl mb-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="text-2xl">DI</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-4 right-0 bg-[#0eb7b7] rounded-full p-1 border-2 border-white">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">Dwi Ishak M. Wibowo</h1>
            <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
               Anggota Aktif <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> PKDI-2026-08013
            </p>
            <p className="text-sm text-gray-400 mt-4 max-w-md text-center">
              Ini adalah awal perjalanan Anda di tahun evaluasi 2026. Pantau progres keaktifan Anda di bawah ini.
            </p>
            <div className="mt-6 border rounded-full px-4 py-1.5 text-sm font-semibold text-gray-600 shadow-sm flex items-center gap-2 cursor-pointer hover:bg-gray-50">
              Tahun 2026 <span className="text-gray-400">▼</span>
            </div>
          </div>

          {/* Activity Cards (Chat-like bubbles for style) */}
          <div className="max-w-2xl mx-auto space-y-6 mt-4">
            
            <div className="flex gap-4 items-end">
              <Avatar className="h-8 w-8 mb-1">
                <AvatarFallback className="bg-gray-200 text-xs">S</AvatarFallback>
              </Avatar>
              <div className="bg-white border rounded-2xl rounded-bl-none p-4 shadow-sm text-sm text-gray-700 max-w-md">
                Halo Dwi! Status keaktifan Anda tahun ini sudah mencapai <strong className="text-[#0eb7b7]">4/3 kehadiran kegiatan</strong>. Pertahankan!
              </div>
            </div>

             <div className="flex gap-4 items-end justify-end">
              <div className="bg-[#0eb7b7] text-white rounded-2xl rounded-br-none p-4 shadow-sm text-sm max-w-md text-right">
                Terima kasih! Saya akan hadir di kelas Lanjutan bulan depan sebagai fasilitator.
              </div>
            </div>
            <div className="text-center text-xs text-gray-400 font-medium">09:48 AM</div>
          </div>

        </div>
      </div>

      {/* 3. RIGHT SIDEBAR (Detail / Stats) */}
      <div className="w-80 border-l bg-[#fafcfc] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
           <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#0eb7b7]"/> Kartu Digital
           </h3>
           <span className="text-[#0eb7b7] font-bold text-sm cursor-pointer hover:underline">Perbesar</span>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {/* Card Mock */}
          <div className="bg-gradient-to-br from-[#0d4f54] to-[#0eb7b7] p-5 rounded-2xl text-white shadow-lg relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="font-bold tracking-widest text-sm opacity-80 flex items-center gap-2">
                PROVOKASI
                <span className="bg-amber-400 text-amber-900 text-[8px] px-1.5 py-0.5 rounded-sm font-black flex items-center gap-1 shadow-sm">
                  <Zap className="w-2 h-2 fill-current" /> PIN EMAS
                </span>
              </div>
              <div className="w-10 h-6 bg-white/20 rounded-md backdrop-blur-sm"></div>
            </div>
            <div className="space-y-1 mb-4">
              <p className="text-xs opacity-80">Nama Anggota</p>
              <p className="font-bold text-lg">DWI ISHAK</p>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] opacity-80">Berlaku Hingga</p>
                <p className="font-mono text-sm font-semibold">09 / 2029</p>
              </div>
              <QrCode className="w-10 h-10 opacity-90" />
            </div>
          </div>

          {/* Accordion / List Data */}
          <div className="space-y-4">
            <div className="flex justify-between items-center cursor-pointer border-b pb-2">
              <h4 className="font-bold text-gray-800 text-sm">Status Keaktifan</h4>
              <span className="text-gray-400">▲</span>
            </div>
            
            <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#0eb7b7] rounded-l-xl"></div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Syarat Kehadiran</p>
              <h5 className="font-bold text-gray-800 text-sm">4 Kehadiran Terpenuhi</h5>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                <div className="bg-[#0eb7b7] h-1.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#0eb7b7] rounded-l-xl"></div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Syarat Penugasan</p>
              <h5 className="font-bold text-gray-800 text-sm">1x Jadi Fasilitator</h5>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                <div className="bg-[#0eb7b7] h-1.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border shadow-sm space-y-2 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 rounded-l-xl"></div>
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Iuran Tahunan</p>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-700 rounded-md">Belum Lunas</span>
              </div>
              <h5 className="font-bold text-gray-800 text-sm">Rp 0 / Rp 120.000</h5>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>

             <div className="flex justify-between items-center cursor-pointer border-b pb-2 mt-6">
              <h4 className="font-bold text-gray-800 text-sm">Hak Suara DPT</h4>
              <span className="text-gray-400">▼</span>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}

function CalendarDaysIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
