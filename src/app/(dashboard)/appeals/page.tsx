"use client";

import { AlertCircle, Upload, CheckCircle2, FileText, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AppealPage() {
  return (
    <div className="flex h-full w-full bg-white rounded-tl-[40px] shadow-sm my-4 mr-4 border overflow-hidden">
      
      {/* SECONDARY SIDEBAR (Appeals History) */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Pusat Banding</h2>
          <p className="text-xs text-gray-500 mt-1">Status Keaktifan Anggota</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Riwayat Pengajuan</h3>
          
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 cursor-pointer transition-colors relative">
             <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Dalam Review
              </p>
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Evaluasi Keaktifan 2026</h4>
            <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
              <CalendarDays className="w-3 h-3" /> Diajukan 2 hari lalu
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA (Appeal Form) */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd] overflow-y-auto">
        <div className="p-10 max-w-3xl mx-auto w-full">
           
           <div className="mb-8">
             <h1 className="text-3xl font-extrabold text-gray-900">Formulir Banding Status Aktif</h1>
             <p className="text-gray-500 mt-2">
               Jika Anda merasa ada kekeliruan dalam rekapitulasi data evaluasi keaktifan tahunan Anda, silakan ajukan banding paling lambat 14 hari pasca-pengumuman.
             </p>
           </div>

           <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-8 flex gap-4 items-start">
             <AlertCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
             <div>
               <h4 className="font-bold text-rose-900 text-sm mb-1">Pemberitahuan Status Saat Ini</h4>
               <p className="text-sm text-rose-800/80">
                 Status keaktifan Anda untuk tahun evaluasi 2026 adalah <strong>Tidak Memenuhi Syarat</strong> (Hanya memenuhi 1 dari 3 syarat minimum). Hak suara DPT Anda saat ini dinonaktifkan.
               </p>
             </div>
           </div>

           <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
             <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Tahun Evaluasi</label>
                  <Input value="2026" disabled className="bg-gray-50 border-none font-bold" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Alasan Banding / Keberatan</label>
                  <textarea 
                    className="w-full h-32 rounded-xl bg-gray-50 border border-gray-200 p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#0eb7b7] resize-none" 
                    placeholder="Jelaskan secara rinci alasan keberatan Anda. Contoh: 'Saya hadir di Forum Bulan Maret namun QR presensi saya error saat itu...'"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Lampiran Bukti (Opsional)</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-teal-50 text-[#0eb7b7] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-gray-700">Unggah Dokumen Pendukung</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, atau PNG (Maks 5MB)</p>
                  </div>
                </div>
             </div>

             <div className="flex justify-end pt-4">
                <Button className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white rounded-xl shadow-lg shadow-teal-500/20 py-6 px-8 font-bold text-md">
                  Kirim Pengajuan Banding
                </Button>
             </div>
           </form>

        </div>
      </div>

    </div>
  );
}
