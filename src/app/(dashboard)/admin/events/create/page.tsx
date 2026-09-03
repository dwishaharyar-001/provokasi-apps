"use client";

import { ArrowLeft, Calendar, Save, CheckCircle2, Clock, MapPin, Users, Ticket, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function EventBuilderPage() {
  const [eventType, setEventType] = useState("forum_berkala");
  const [locationType, setLocationType] = useState("HYBRID");
  const [isPaid, setIsPaid] = useState(false);

  return (
    <div className="flex flex-col xl:flex-row min-h-full w-full bg-[#fcfdfd] rounded-xl lg:rounded-tl-[40px] shadow-sm my-2 lg:my-4 mr-0 lg:mr-4 border overflow-hidden">
      
      {/* 1. SECONDARY SIDEBAR (Builder Steps/Navigation) */}
      <div className="w-full xl:w-80 border-b xl:border-b-0 xl:border-r bg-white flex flex-col shrink-0">
        <div className="p-4 sm:p-6 border-b">
          <Link href="/admin/events" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-[#0eb7b7] mb-4 sm:mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
          </Link>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Event Builder</h2>
          <p className="text-xs text-gray-500 mt-1">Buat jadwal agenda baru</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Active Step */}
          <div className="p-4 rounded-2xl bg-[#0eb7b7]/10 border border-[#0eb7b7] flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-[#0eb7b7] text-white flex items-center justify-center font-bold text-xs mt-0.5 shadow-sm">1</div>
            <div>
              <p className="text-sm font-bold text-[#0d4f54]">Informasi Dasar</p>
              <p className="text-xs text-[#0eb7b7] mt-1 font-medium">Judul, Kategori & Deskripsi</p>
            </div>
          </div>
          
          {/* Pending Step */}
          <div className="p-4 rounded-2xl border border-transparent opacity-50 flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs mt-0.5">2</div>
            <div>
              <p className="text-sm font-bold text-gray-600">Jadwal & Lokasi</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-transparent opacity-50 flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs mt-0.5">3</div>
            <div>
              <p className="text-sm font-bold text-gray-600">Kapasitas & Tiket</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-transparent opacity-50 flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs mt-0.5">4</div>
            <div>
              <p className="text-sm font-bold text-gray-600">Publikasi</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA (Form) */}
      <div className="flex-1 overflow-y-auto">
        
        {/* Top Header */}
        <div className="h-20 border-b flex items-center justify-between px-10 bg-white sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-extrabold text-gray-900">Form Pembuatan Event Baru</h1>
            <p className="text-xs text-gray-500">Isi formulir di bawah ini dengan lengkap sebelum merilis event.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl font-bold h-10 border-gray-300">Simpan Draft</Button>
            <Button className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white rounded-xl shadow-lg shadow-teal-500/20 font-bold h-10 px-6 flex gap-2">
              <Save className="w-4 h-4" /> Publikasikan
            </Button>
          </div>
        </div>

        {/* Builder Form */}
        <div className="p-10 max-w-4xl mx-auto space-y-10 pb-20">
          
          {/* SECTION 1: Informasi Dasar */}
          <section className="bg-white border rounded-3xl p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6 border-b pb-4">
               <div className="p-2 bg-teal-50 text-[#0eb7b7] rounded-lg">
                 <Tag className="w-5 h-5" />
               </div>
               <h3 className="font-bold text-lg text-gray-800">1. Informasi Dasar</h3>
             </div>
             
             <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Judul Kegiatan</label>
                  <Input placeholder="Contoh: Kelas Kepemimpinan Lanjut Batch 12" className="rounded-xl bg-gray-50 border-gray-200 h-12 font-medium" />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Kategori Program</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["forum_berkala", "seminar", "workshop", "kelas_lanjutan"].map((type) => (
                      <div 
                        key={type}
                        onClick={() => setEventType(type)}
                        className={cn(
                          "border rounded-xl p-3 text-center cursor-pointer transition-all",
                          eventType === type ? "bg-[#0eb7b7]/10 border-[#0eb7b7] text-[#0d4f54] font-bold shadow-sm" : "bg-white hover:bg-gray-50 text-gray-600 font-medium"
                        )}
                      >
                        <span className="text-sm capitalize">{type.replace("_", " ")}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Deskripsi Singkat</label>
                  <textarea 
                    rows={4} 
                    placeholder="Jelaskan secara singkat tujuan dan materi dari kegiatan ini..."
                    className="w-full rounded-xl bg-gray-50 border border-gray-200 p-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#0eb7b7] resize-none"
                  ></textarea>
                </div>
             </div>
          </section>

          {/* SECTION 2: Jadwal & Lokasi */}
          <section className="bg-white border rounded-3xl p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6 border-b pb-4">
               <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
                 <Calendar className="w-5 h-5" />
               </div>
               <h3 className="font-bold text-lg text-gray-800">2. Jadwal & Lokasi</h3>
             </div>
             
             <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Tanggal Pelaksanaan</label>
                    <Input type="date" className="rounded-xl bg-gray-50 border-gray-200 h-12 font-medium" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Jam Mulai</label>
                      <Input type="time" className="rounded-xl bg-gray-50 border-gray-200 h-12 font-medium" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Jam Selesai</label>
                      <Input type="time" className="rounded-xl bg-gray-50 border-gray-200 h-12 font-medium" />
                   </div>
                 </div>
               </div>

               <div className="space-y-6">
                 <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Format Pelaksanaan</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["OFFLINE", "ONLINE", "HYBRID"].map((type) => (
                        <div 
                          key={type}
                          onClick={() => setLocationType(type)}
                          className={cn(
                            "border rounded-xl p-3 text-center cursor-pointer transition-all",
                            locationType === type ? "bg-amber-50 border-amber-500 text-amber-900 font-bold shadow-sm" : "bg-white hover:bg-gray-50 text-gray-600 font-medium"
                          )}
                        >
                          <span className="text-xs capitalize">{type}</span>
                        </div>
                      ))}
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex justify-between">
                      Detail Tempat (Venue/Link)
                      {locationType !== "OFFLINE" && <span className="text-[#0eb7b7]">Wajib Sertakan Link Zoom</span>}
                    </label>
                    <textarea 
                      rows={2} 
                      placeholder="Misal: Auditorium Utama Provokasi (Lt. 3) atau Tautan Zoom"
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 p-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    ></textarea>
                 </div>
               </div>
             </div>
          </section>

          {/* SECTION 3: Kapasitas & Tiket */}
          <section className="bg-white border rounded-3xl p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6 border-b pb-4">
               <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg">
                 <Ticket className="w-5 h-5" />
               </div>
               <h3 className="font-bold text-lg text-gray-800">3. Kapasitas & Tiket</h3>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Kuota Maksimal Peserta</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input type="number" placeholder="Contoh: 100" className="rounded-xl bg-gray-50 border-gray-200 h-12 font-medium pl-10" />
                  </div>
               </div>

               <div className="space-y-4">
                 <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">Jenis Akses / Tiket</label>
                 
                 <label className="flex items-start justify-between p-4 border rounded-xl hover:bg-gray-50 cursor-pointer transition-colors bg-white">
                    <div>
                      <h5 className="font-bold text-gray-800 text-sm mb-1">Berbayar (Paid Event)</h5>
                      <p className="text-xs text-gray-500 max-w-[200px]">Aktifkan opsi ini jika kegiatan membutuhkan kontribusi biaya pendaftaran (FN-01).</p>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0eb7b7]"></div>
                    </div>
                 </label>

                 {isPaid && (
                   <div className="space-y-2 pt-2 animate-in slide-in-from-top-2">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Harga Tiket (Rp)</label>
                      <Input type="number" placeholder="Contoh: 150000" className="rounded-xl bg-white border-[#0eb7b7] ring-1 ring-[#0eb7b7]/20 h-12 font-medium" />
                   </div>
                 )}
               </div>
             </div>
          </section>

        </div>
      </div>
    </div>
  );
}
