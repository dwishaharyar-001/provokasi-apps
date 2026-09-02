"use client";

import { Search, Bell, Shield, FileText, Check, X, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function AdminAppealsPage() {
  return (
    <div className="flex h-full w-full bg-white rounded-tl-[40px] shadow-sm my-4 mr-4 border overflow-hidden">
      
      {/* SECONDARY SIDEBAR (Appeals Queue) */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-6 border-b bg-amber-50/30">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-600" />
            Review Banding
          </h2>
          <p className="text-xs text-gray-500 mt-1">Konsol Khusus Pengawas</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Item 1 */}
          <div className="p-4 rounded-2xl bg-[#0eb7b7]/10 border border-[#0eb7b7] cursor-pointer transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-[#0eb7b7] uppercase tracking-wider">Menunggu Review</span>
              <span className="text-[10px] font-bold text-gray-500">2 jam lalu</span>
            </div>
            <h3 className="font-bold text-gray-900 leading-tight mb-1">Dwi Ishak M.</h3>
            <p className="text-xs text-gray-500">Evaluasi 2026 • LIO-08</p>
          </div>

          {/* Item 2 */}
          <div className="p-4 rounded-2xl border border-transparent hover:bg-gray-50 cursor-pointer transition-colors opacity-70">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 rounded-full uppercase tracking-wider">Disetujui</span>
              <span className="text-[10px] font-bold text-gray-400">Kemarin</span>
            </div>
            <h3 className="font-bold text-gray-700 leading-tight mb-1">Rina Kusuma</h3>
            <p className="text-xs text-gray-400">Evaluasi 2026 • LIO-10</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd]">
        <div className="h-20 border-b flex items-center justify-between px-8 bg-white">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Cari pengajuan..." 
              className="w-full rounded-full bg-gray-50 border-gray-200 pl-10 shadow-inner text-sm focus-visible:ring-1 focus-visible:ring-amber-500" 
            />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer hover:bg-gray-50 p-2 rounded-full transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex items-center gap-3 pl-4 border-l cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">Budi Santoso</p>
                <p className="text-xs font-bold text-amber-600">Dewan Pengawas</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-amber-500 transition-all">
                <AvatarImage src="https://i.pravatar.cc/150?u=3" />
                <AvatarFallback>BS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-3xl mx-auto">
            
            <div className="bg-white border rounded-3xl p-8 shadow-sm">
              <div className="flex items-start justify-between border-b pb-6 mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-gray-100">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Dwi Ishak M. Wibowo</h2>
                    <p className="text-gray-500 font-medium">PKDI-2026-08013 • LIO-08</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase">Status Pengajuan</p>
                  <p className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full mt-1 inline-block">Menunggu Review</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Alasan Banding (Dari Anggota)</h4>
                  <div className="bg-gray-50 p-4 rounded-xl text-gray-700 text-sm leading-relaxed border border-gray-100">
                    "Saya hadir di Forum Belajar bulan Maret 2026 secara offline, namun saat itu sistem QR Code sedang mengalami gangguan sehingga presensi saya tidak tercatat oleh mesin. Saya telah melampirkan foto kehadiran saya di ruangan."
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Lampiran Bukti</h4>
                  <div className="flex gap-3">
                    <div className="border rounded-xl p-3 flex items-center gap-3 w-64 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-gray-800 truncate">foto_kehadiran_maret.jpg</p>
                        <p className="text-xs text-gray-400">1.2 MB</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6 mt-6">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Keputusan Pengawas</h4>
                  <textarea 
                    className="w-full h-24 rounded-xl bg-white border border-gray-200 p-4 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none mb-4" 
                    placeholder="Tuliskan catatan atau alasan keputusan Anda..."
                  />
                  <div className="flex gap-4">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 font-bold shadow-lg shadow-green-500/20">
                      <Check className="w-5 h-5 mr-2" /> Setujui & Pulihkan Status
                    </Button>
                    <Button className="flex-1 bg-rose-500 hover:bg-rose-600 text-white rounded-xl h-12 font-bold shadow-lg shadow-rose-500/20">
                      <X className="w-5 h-5 mr-2" /> Tolak Banding
                    </Button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
