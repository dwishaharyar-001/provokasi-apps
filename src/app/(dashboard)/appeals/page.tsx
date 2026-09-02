"use client";

import { useState } from "react";
import { AlertCircle, Upload, CheckCircle2, FileText, CalendarDays, Clock, ShieldAlert, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface AppealHistoryItem {
  id: string;
  year: number;
  date: string;
  status: "submitted" | "under_review" | "approved" | "rejected";
  reason: string;
  supervisorNotes?: string;
}

const initialHistory: AppealHistoryItem[] = [
  {
    id: "app-1",
    year: 2026,
    date: "01 Sept 2026",
    status: "under_review",
    reason: "Kekeliruan pencatatan presensi Forum Berkala Maret. Saya hadir secara fisik dan memiliki dokumentasi foto bersama panitia.",
    supervisorNotes: "Sedang dalam audit pencatatan presensi oleh Dewan Pengawas.",
  }
];

export default function AppealPage() {
  const [history, setHistory] = useState<AppealHistoryItem[]>(initialHistory);
  const [reason, setReason] = useState("");
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const handleSubmitAppeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    const newItem: AppealHistoryItem = {
      id: `app-${Date.now()}`,
      year: 2026,
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      status: "submitted",
      reason: reason,
    };

    setHistory(prev => [newItem, ...prev]);
    setReason("");
    setIsSubmittedSuccess(true);
  };

  return (
    <div className="flex h-full w-full bg-white rounded-tl-[40px] shadow-sm my-4 mr-4 border overflow-hidden">
      
      {/* SECONDARY SIDEBAR (Appeals History) */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-6 border-b">
          <span className="text-[10px] font-extrabold text-[#0eb7b7] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase">
            MR-04 Workflow
          </span>
          <h2 className="text-xl font-bold text-gray-800 mt-2">Pusat Banding</h2>
          <p className="text-xs text-gray-500 mt-1">Keberatan Evaluasi Keaktifan</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Riwayat Pengajuan Anda</h3>
          
          {history.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 cursor-pointer transition-colors space-y-2">
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  item.status === "under_review" ? "bg-amber-100 text-amber-800" :
                  item.status === "approved" ? "bg-green-100 text-green-800" :
                  item.status === "rejected" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                }`}>
                  {item.status === "under_review" ? "Dalam Review" : item.status}
                </span>
                <span className="text-[10px] text-gray-400 font-bold">{item.year}</span>
              </div>
              
              <p className="text-xs text-gray-800 line-clamp-2 font-medium">{item.reason}</p>
              
              <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium pt-1 border-t">
                <CalendarDays className="w-3 h-3" /> {item.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA (Appeal Form & Timeline MR-04) */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd] overflow-y-auto">
        <div className="p-10 max-w-3xl mx-auto w-full space-y-6">
           
           <div>
             <span className="text-[10px] font-extrabold text-[#0eb7b7] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase">
               MR-04 Dispute & Appeal
             </span>
             <h1 className="text-3xl font-black text-gray-900 mt-2">Formulir Banding Keaktifan Anggota</h1>
             <p className="text-gray-500 text-xs mt-1 leading-relaxed">
               Jika Anda merasa ada kekeliruan dalam rekapitulasi data evaluasi keaktifan tahunan Anda, Anda berhak mengajukan keberatan langsung ke Dewan Pengawas selambat-lambatnya **14 hari pasca-pengumuman**.
             </p>
           </div>

           {/* SLA Countdown Warning Banner */}
           <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex gap-4 items-start text-xs">
             <Clock className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
             <div className="space-y-1">
               <h4 className="font-bold text-rose-900 text-sm">Batas Waktu Pengajuan Banding (SLA 14 Hari)</h4>
               <p className="text-rose-800/80 leading-relaxed">
                 Pengumuman evaluasi 2026 dirilis pada 01 Sept 2026. Sisa waktu pengajuan banding Anda: <strong className="text-rose-900">12 Hari lagi (Batas: 15 Sept 2026)</strong>.
               </p>
             </div>
           </div>

           {!isSubmittedSuccess ? (
             <form onSubmit={handleSubmitAppeal} className="space-y-6">
               <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Tahun Evaluasi Terkait</label>
                    <Input value="2026 (Siklus 12 Bulan)" disabled className="bg-gray-50 border-none font-bold text-xs" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Alasan Banding & Rincian Keberatan</label>
                    <textarea 
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                      className="w-full h-32 rounded-xl bg-gray-50 border border-gray-200 p-4 text-xs focus:outline-none focus:ring-1 focus:ring-[#0eb7b7] resize-none" 
                      placeholder="Jelaskan secara rinci alasan keberatan Anda. Contoh: 'Saya hadir di Forum Bulan Maret namun QR presensi saya error saat itu...'"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Lampiran Bukti Pendukung (Foto/Dokumen)</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="w-10 h-10 bg-teal-50 text-[#0eb7b7] rounded-full flex items-center justify-center mx-auto mb-2">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-gray-700">Unggah Bukti Dokumentasi</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">PDF, JPG, atau PNG (Maks 5MB)</p>
                    </div>
                  </div>
               </div>

               <div className="flex justify-end pt-2">
                  <Button type="submit" className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white rounded-xl shadow-lg shadow-teal-500/20 py-6 px-8 font-bold text-xs flex gap-2">
                    <FileText className="w-4 h-4" /> Kirim Pengajuan Banding ke Pengawas
                  </Button>
               </div>
             </form>
           ) : (
             <div className="bg-white border rounded-3xl p-8 text-center shadow-sm space-y-4">
               <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                 <CheckCircle2 className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-gray-900">Banding Berhasil Terkirim!</h3>
               <p className="text-xs text-gray-500 max-w-md mx-auto">
                 Pengajuan Anda telah diteruskan ke **Dewan Pengawas**. Anda akan menerima notifikasi hasil pemeriksaan dalam 3-5 hari kerja.
               </p>
               <Button onClick={() => setIsSubmittedSuccess(false)} className="bg-[#0eb7b7] text-white font-bold rounded-xl text-xs px-6">
                 Ajukan Banding Lainnya
               </Button>
             </div>
           )}

        </div>
      </div>

    </div>
  );
}
