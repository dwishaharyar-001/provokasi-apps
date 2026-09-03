"use client";

import { useState } from "react";
import { Award, QrCode, ShieldCheck, Calendar, Clock, CheckCircle2, AlertCircle, ArrowRight, Download, Sparkles, Check, RefreshCw, FileText, LockKeyhole } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";

interface EvaluationParam {
  title: string;
  code: string;
  required: string;
  current: string;
  isMet: boolean;
  details: string;
}

export default function MembershipPage() {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // MR-03 Evaluation Engine Parameters Data (2 of 3 rule)
  const evaluationParams: EvaluationParam[] = [
    {
      title: "Kehadiran Kegiatan Resmi",
      code: "Syarat 1",
      required: "Minimal 3 Kegiatan",
      current: "4 Kegiatan Hadir",
      isMet: true,
      details: "Termasuk Forum Berkala Batch 12, Workshop Resolusi Konflik, dan Simposium Keuangan."
    },
    {
      title: "Partisipasi Panitia / Fasilitator",
      code: "Syarat 2",
      required: "Minimal 1 Penugasan",
      current: "2 Penugasan Resmi",
      isMet: true,
      details: "Bertugas sebagai Fasilitator Utama (Forum Berkala) dan Co-Host Zoom."
    },
    {
      title: "Kepatuhan Iuran Anggota",
      code: "Syarat 3",
      required: "Status Lunas / Waiver",
      current: "Iuran Lunas 2026",
      isMet: true,
      details: "Pembayaran iuran tahunan terverifikasi melalui Payment Gateway resmi."
    }
  ];

  const metCount = evaluationParams.filter(p => p.isMet).length;
  const isQualifiedActive = metCount >= 2;

  return (
    <div className="flex flex-col xl:flex-row min-h-full w-full bg-white rounded-xl lg:rounded-tl-[40px] shadow-sm my-2 lg:my-4 mr-0 lg:mr-4 border overflow-hidden">
      
      {/* 1. LEFT SIDEBAR - Evaluation Summary & Badge */}
      <div className="w-full xl:w-80 border-b xl:border-b-0 xl:border-r bg-[#fafcfc] flex flex-col p-4 sm:p-6 space-y-4 sm:space-y-6 shrink-0">
        <div>
          <span className="text-[10px] font-extrabold text-[#0eb7b7] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Modul 1: Membership
          </span>
          <h2 className="text-lg sm:text-xl font-black text-gray-900 mt-2">Status & Keaktifan</h2>
          <p className="text-xs text-gray-500 mt-1">Siklus Evaluasi 12 Bulan (MR-03)</p>
        </div>

        {/* MR-02 Gold Pin Status Card */}
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl relative overflow-hidden space-y-3">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mr-8 -mt-8"></div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-extrabold bg-white/20 px-2.5 py-0.5 rounded-full uppercase tracking-widest text-white backdrop-blur-md">
              PIN EMAS AKTIF
            </span>
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200" />
          </div>

          <div>
            <p className="text-xl sm:text-2xl font-black tracking-tight">Anggota Aktif</p>
            <p className="text-xs opacity-90 font-medium">Hak Suara DPT & Musyawarah Aktif</p>
          </div>

          <div className="pt-2 border-t border-white/20 flex justify-between items-center text-[10px] font-bold opacity-90">
            <span>Evaluasi 2026:</span>
            <span className="bg-white text-amber-900 px-2 py-0.5 rounded-full font-black">
              {metCount}/3 Syarat Dipenuhi
            </span>
          </div>
        </div>

        {/* Evaluation Engine Status Summary */}
        <div className="bg-white border rounded-2xl p-4 space-y-3 shadow-sm">
          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Kualifikasi AD/ART (MR-03)</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Aturan Minimum:</span>
              <span className="font-bold text-gray-900">2 dari 3 Syarat</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Poin Anda:</span>
              <span className="font-black text-[#0eb7b7]">{metCount} Syarat Met</span>
            </div>
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-gray-600">Status DPT:</span>
              <span className="font-bold text-green-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Terdaftar DPT
              </span>
            </div>
          </div>
        </div>

        {/* Appeal Navigation Link (MR-04) */}
        {!isQualifiedActive && (
          <Link href="/appeals" className="block w-full">
            <Button variant="outline" className="w-full h-11 border-rose-300 text-rose-600 hover:bg-rose-50 font-bold text-xs flex gap-2 rounded-xl">
              <AlertCircle className="w-4 h-4" /> Ajukan Banding Status (MR-04)
            </Button>
          </Link>
        )}
      </div>

      {/* 2. MAIN CONTENT AREA (Digital Card MR-02 & Evaluation Engine MR-03) */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd] overflow-y-auto p-4 sm:p-6 lg:p-10 min-w-0">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-10 w-full">
          
          {/* MR-02 DIGITAL MEMBERSHIP CARD SECTION */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-[#0eb7b7] uppercase tracking-widest">MR-02 Digital Membership Card</p>
                <h1 className="text-xl sm:text-2xl font-black text-gray-900">Kartu Anggota Digital</h1>
              </div>

              <Button 
                onClick={() => setIsQRModalOpen(true)}
                variant="outline" 
                className="w-full sm:w-auto rounded-xl border-[#0eb7b7] text-[#0eb7b7] hover:bg-teal-50 font-bold text-xs flex gap-2"
              >
                <QrCode className="w-4 h-4" /> Tampilkan QR Code Kartu
              </Button>
            </div>

            {/* Premium Interactive Member Card */}
            <div className="w-full max-w-lg mx-auto min-h-[14rem] sm:h-64 bg-gradient-to-br from-[#0d4f54] via-[#0eb7b7] to-[#087f7f] rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between border border-teal-400/30">
              {/* Card Background Ornaments */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/20 rounded-full -ml-10 -mb-10 blur-xl"></div>
              
              {/* Header Card */}
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-[10px] font-extrabold tracking-widest uppercase opacity-80">PERKUMPULAN PROVOKASI</p>
                  <p className="text-xs font-black tracking-wider text-amber-300">ALUMNI LIO COMMUNITY</p>
                </div>

                <div className="flex items-center gap-1.5 bg-amber-400/20 border border-amber-300/40 text-amber-200 px-3 py-1 rounded-full backdrop-blur-md">
                  <Award className="w-4 h-4 text-amber-300 fill-current" />
                  <span className="text-[10px] font-black uppercase tracking-wider">PIN EMAS AKTIF</span>
                </div>
              </div>

              {/* Middle Card Body */}
              <div className="flex items-center gap-4 relative z-10 my-2">
                <Avatar className="h-16 w-16 border-2 border-white/80 shadow-md">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>DI</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-extrabold text-white leading-tight">Dwi Ishak M.</h3>
                  <p className="text-xs font-semibold text-teal-100">NPA: PKDI-2026-08013</p>
                  <p className="text-[10px] text-teal-200/80 font-bold uppercase mt-0.5">LIO Batch 8 • Anggota Aktif</p>
                </div>
              </div>

              {/* Footer Card */}
              <div className="flex justify-between items-end relative z-10 border-t border-white/20 pt-3 text-[10px]">
                <div>
                  <span className="opacity-70 block text-[9px] uppercase tracking-wider">Masa Berlaku Kartu (3 Tahun)</span>
                  <span className="font-bold text-white">18 Sept 2026 – 18 Sept 2029</span>
                </div>

                <div className="text-right">
                  <span className="opacity-70 block text-[9px] uppercase tracking-wider">Status Keaktifan</span>
                  <span className="font-black text-amber-300 uppercase">TERVERIFIKASI SAH</span>
                </div>
              </div>
            </div>
          </div>

          {/* MR-03 AUTOMATED EVALUATION ENGINE VISUALIZER */}
          <div className="space-y-4 pt-4 border-t">
            <div>
              <p className="text-xs font-bold text-[#0eb7b7] uppercase tracking-widest">MR-03 Evaluation Engine Engine</p>
              <h2 className="text-xl font-black text-gray-900">Rekapitulasi Parameter Keaktifan (12 Bulan)</h2>
              <p className="text-xs text-gray-500 mt-1">
                Sistem otomatis menetapkan status **Anggota Aktif** jika memenuhi sekurang-kurangnya **2 dari 3 parameter AD/ART** di bawah ini:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {evaluationParams.map((param, idx) => (
                <div 
                  key={idx} 
                  className={`p-5 rounded-3xl border transition-all bg-white shadow-sm flex flex-col justify-between space-y-4 relative ${
                    param.isMet ? "border-teal-200" : "border-rose-200"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">{param.code}</span>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        param.isMet ? "bg-green-100 text-green-800" : "bg-rose-100 text-rose-800"
                      }`}>
                        {param.isMet ? <Check className="w-3 h-3 text-green-600" /> : <AlertCircle className="w-3 h-3 text-rose-600" />}
                        {param.isMet ? "Memenuhi" : "Belum Met"}
                      </span>
                    </div>

                    <h4 className="font-bold text-gray-900 text-sm mb-1">{param.title}</h4>
                    <p className="text-xs text-[#0eb7b7] font-extrabold">{param.current}</p>
                    <p className="text-[10px] text-gray-400 font-medium">Syarat Minimum: {param.required}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-2xl border text-[11px] text-gray-600 leading-relaxed">
                    {param.details}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* MODAL QR CODE KARTU ANGGOTA */}
      <Dialog open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
        <DialogContent className="sm:max-w-[420px] rounded-[30px] p-8 text-center">
          <DialogTitle className="text-sm font-bold uppercase tracking-widest text-[#0eb7b7] mb-1">
            KARTU ANGGOTA DIGITAL (MR-02)
          </DialogTitle>
          <h2 className="text-xl font-black text-gray-900 mb-1">Dwi Ishak M.</h2>
          <p className="text-xs text-gray-500 mb-4">NPA: PKDI-2026-08013</p>

          <div className="bg-white p-5 border-2 border-dashed border-[#0eb7b7] rounded-3xl inline-block shadow-inner mb-4">
            <QrCode className="w-44 h-44 text-gray-900 mx-auto" />
          </div>

          <div className="flex justify-center gap-2 mb-6">
            <span className="text-[10px] font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-full uppercase">
              PIN EMAS AKTIF
            </span>
            <span className="text-[10px] font-bold px-3 py-1 bg-gray-100 text-gray-700 rounded-full uppercase">
              Masa Berlaku 3 Tahun
            </span>
          </div>

          <Button onClick={() => setIsQRModalOpen(false)} className="w-full bg-[#0eb7b7] hover:bg-[#0a9494] text-white font-bold rounded-xl h-11 text-xs flex justify-center gap-2">
            <Download className="w-4 h-4" /> Unduh QR Kartu Anggota
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
