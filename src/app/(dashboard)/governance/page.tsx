"use client";

import { Search, Bell, Zap, Users, AlertTriangle, Vote, Info, CheckCircle2, FileCheck2, LockKeyhole } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function GovernancePage() {
  return (
    <div className="flex h-full w-full bg-white rounded-tl-[40px] shadow-sm my-4 mr-4 border overflow-hidden">
      
      {/* 1. SECONDARY SIDEBAR (Assembly Agendas) */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">E-Voting</h2>
          <div className="relative mt-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Cari agenda musyawarah..." 
              className="w-full rounded-full bg-gray-50 border-gray-200 pl-10 text-sm focus-visible:ring-[#0eb7b7]" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Active Voting Session */}
          <div className="p-4 rounded-2xl bg-[#0eb7b7]/10 border border-[#0eb7b7] cursor-pointer transition-colors relative">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-white bg-rose-500 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                LIVE
              </p>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Vote Terbuka</span>
            </div>
            <h3 className="font-bold text-gray-900 leading-tight mb-2">Pengesahan RKAT 2027</h3>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#0eb7b7]">Agenda #02</span>
              <span className="text-gray-500">Tersisa 14 mnt</span>
            </div>
          </div>

          {/* Pending Voting Session */}
          <div className="p-4 rounded-2xl border border-transparent hover:bg-gray-50 cursor-pointer transition-colors opacity-70">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Menunggu
              </p>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Vote Tertutup</span>
            </div>
            <h3 className="font-bold text-gray-800 leading-tight mb-2">Pemilihan Pengurus Inti</h3>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-gray-400">Agenda #03</span>
              <span className="flex items-center gap-1 text-gray-400"><LockKeyhole className="w-3 h-3"/> Terkunci</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA (Voting Booth) */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd]">
        <div className="h-20 border-b flex items-center justify-end px-8 bg-white">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-amber-500 cursor-pointer hover:bg-amber-50 p-2 rounded-full transition-colors">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div className="relative cursor-pointer hover:bg-gray-50 p-2 rounded-full transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex items-center gap-3 pl-4 border-l cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">Dwi Ishak M.</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-[#0eb7b7] transition-all">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>DI</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-2xl mx-auto">
             <div className="mb-6 flex justify-between items-end">
               <div>
                 <p className="text-sm font-bold text-[#0eb7b7] tracking-widest uppercase mb-1">Musyawarah Tahunan 2026</p>
                 <h1 className="text-3xl font-extrabold text-gray-900">Pengesahan RKAT 2027</h1>
               </div>
               <div className="text-right">
                 <p className="text-xs text-gray-500 font-bold uppercase">Total Hak Suara Anda</p>
                 <p className="text-2xl font-black text-gray-800">2 <span className="text-sm text-gray-500 font-medium">Suara</span></p>
               </div>
             </div>

             <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 mb-8">
               <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
               <p className="text-sm text-amber-900 leading-relaxed">
                 Pemungutan suara ini bersifat <strong>TERBUKA</strong>. Pilihan Anda akan tercatat beserta nama Anda di dalam notula musyawarah. Hak suara Anda berjumlah 2 (1 suara pribadi + 1 suara mandat dari <strong>Irvan Jie</strong>).
               </p>
             </div>

             <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Pilihan Suara</h3>
             
             <div className="space-y-4">
                <label className="flex items-center justify-between p-5 rounded-2xl border-2 border-gray-100 hover:border-[#0eb7b7] bg-white cursor-pointer group transition-all hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-[#0eb7b7] flex items-center justify-center">
                      {/* Active state mockup (empty for now) */}
                    </div>
                    <span className="text-lg font-bold text-gray-800">Menerima & Setuju</span>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-gray-200 group-hover:text-[#0eb7b7] transition-colors" />
                </label>

                <label className="flex items-center justify-between p-5 rounded-2xl border-2 border-gray-100 hover:border-rose-400 bg-white cursor-pointer group transition-all hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-rose-400 flex items-center justify-center"></div>
                    <span className="text-lg font-bold text-gray-800">Menolak</span>
                  </div>
                </label>

                <label className="flex items-center justify-between p-5 rounded-2xl border-2 border-gray-100 hover:border-gray-400 bg-white cursor-pointer group transition-all hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-gray-400 flex items-center justify-center"></div>
                    <span className="text-lg font-bold text-gray-800">Abstain (Tdk. Memberikan Suara)</span>
                  </div>
                </label>
             </div>

             <div className="mt-8 flex justify-end">
               <Button className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white rounded-xl shadow-lg shadow-teal-500/20 py-6 px-8 font-bold text-md flex gap-2">
                 <Vote className="w-5 h-5"/> Kirim Suara Sekarang
               </Button>
             </div>
          </div>
        </div>
      </div>

      {/* 3. RIGHT SIDEBAR (Quorum Monitor) */}
      <div className="w-80 border-l bg-[#fafcfc] flex flex-col">
        <div className="p-6 border-b">
           <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-500"/> Live Quorum
           </h3>
        </div>
        
        <div className="p-6 overflow-y-auto">
          
          <div className="bg-white p-5 rounded-2xl border shadow-sm mb-6 text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status Kehadiran</p>
            <h4 className="text-4xl font-black text-[#0eb7b7] mb-2">72.4%</h4>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
              <div className="bg-[#0eb7b7] h-2 rounded-full" style={{ width: '72.4%' }}></div>
            </div>
            <p className="text-[10px] font-bold text-green-600 uppercase bg-green-50 py-1 rounded-full border border-green-100">
              KUORUM SAH TERCAPAI
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Total DPT Aktif</span>
              <span className="font-bold text-gray-800">120 Org</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t pt-3">
              <span className="text-gray-500 font-medium">Hadir Fisik/Zoom</span>
              <span className="font-bold text-gray-800">65 Org</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t pt-3">
              <span className="text-gray-500 font-medium">Via Surat Kuasa</span>
              <span className="font-bold text-amber-600">22 Mandat</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t pt-3 bg-gray-50 p-2 rounded-lg">
              <span className="text-gray-800 font-bold">Total Suara</span>
              <span className="font-black text-gray-900 text-lg">87 Suara</span>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2 font-medium">Syarat minimal 1/2 + 1 (61 Suara)</p>
          </div>

        </div>
      </div>
      
    </div>
  );
}
