"use client";

import { useState } from "react";
import { Search, Bell, ShieldAlert, CheckCircle2, XCircle, FileText, CalendarDays, User, Award, Check, X, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface SupervisorAppealItem {
  id: string;
  memberName: string;
  memberNPA: string;
  submittedAt: string;
  status: "submitted" | "under_review" | "approved" | "rejected";
  reason: string;
  claimedEvents: string;
  supervisorNotes?: string;
  avatar: string;
}

const initialAppeals: SupervisorAppealItem[] = [
  {
    id: "app-101",
    memberName: "Dwi Ishak M.",
    memberNPA: "LIO-08013",
    submittedAt: "01 Sept 2026",
    status: "under_review",
    reason: "Pencatatan presensi Forum Bulan Maret tidak terinput akibat kendala scanner jaringan lokasi. Saya melampirkan foto presensi fisik dan saksi fasilitator.",
    claimedEvents: "Forum Berkala Batch 12 (18 Sept 2026)",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "app-102",
    memberName: "Hendra Pratama",
    memberNPA: "LIO-07033",
    submittedAt: "02 Sept 2026",
    status: "submitted",
    reason: "Partisipasi saya sebagai panitia workshop resolusi konflik belum terakumulasi di sistem evaluasi keaktifan MR-03.",
    claimedEvents: "Panitia Workshop Resolusi Konflik",
    avatar: "https://i.pravatar.cc/150?u=hendra",
  }
];

export default function AdminAppealsPage() {
  const [appeals, setAppeals] = useState<SupervisorAppealItem[]>(initialAppeals);
  const [selectedAppealId, setSelectedAppealId] = useState<string | null>("app-101");
  const [supervisorNotesInput, setSupervisorNotesInput] = useState("");

  const activeAppeal = appeals.find(a => a.id === selectedAppealId) || appeals[0];

  const handleApprove = (id: string) => {
    setAppeals(prev => prev.map(a => {
      if (a.id !== id) return a;
      return { ...a, status: "approved", supervisorNotes: supervisorNotesInput || "Banding disetujui. Status keaktifan dipulihkan ke Anggota Aktif." };
    }));
    setSupervisorNotesInput("");
  };

  const handleReject = (id: string) => {
    setAppeals(prev => prev.map(a => {
      if (a.id !== id) return a;
      return { ...a, status: "rejected", supervisorNotes: supervisorNotesInput || "Banding ditolak setelah bukti dokumen diklarifikasi." };
    }));
    setSupervisorNotesInput("");
  };

  return (
    <div className="flex flex-col xl:flex-row min-h-full w-full bg-white rounded-xl lg:rounded-tl-[40px] shadow-sm my-2 lg:my-4 mr-0 lg:mr-4 border overflow-hidden">
      
      {/* SECONDARY SIDEBAR (Appeals Inbox) */}
      <div className="w-full xl:w-80 border-b xl:border-b-0 xl:border-r bg-white flex flex-col shrink-0 max-h-80 xl:max-h-none">
        <div className="p-4 sm:p-6 border-b bg-teal-50/50">
          <span className="text-[10px] font-extrabold text-[#0eb7b7] bg-teal-100 border border-teal-200 px-2.5 py-1 rounded-full uppercase">
            MR-04 Console
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-2">Audit Banding</h2>
          <p className="text-xs text-gray-500 mt-1">Pemeriksaan Keberatan Dewan Pengawas</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {appeals.map((appeal) => {
            const isActive = appeal.id === selectedAppealId;
            return (
              <div 
                key={appeal.id}
                onClick={() => setSelectedAppealId(appeal.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border relative ${
                  isActive ? "bg-[#0eb7b7]/10 border-[#0eb7b7] shadow-sm" : "border-transparent hover:bg-gray-50 opacity-80"
                }`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    appeal.status === "approved" ? "bg-green-100 text-green-800" :
                    appeal.status === "rejected" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {appeal.status === "under_review" ? "Perlu Review" : appeal.status}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold">{appeal.submittedAt}</span>
                </div>

                <h4 className="font-bold text-gray-900 text-sm leading-tight">{appeal.memberName}</h4>
                <p className="text-[10px] text-gray-500 font-medium">{appeal.memberNPA}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT AREA (Supervisor Audit Panel) */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd]">
        <div className="h-20 border-b flex items-center justify-between px-8 bg-white">
          <h1 className="text-xl font-black text-gray-900">Audit & Keputusan Dewan Pengawas (MR-04)</h1>
          
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-[#0eb7b7]">
              <AvatarFallback className="bg-slate-900 text-white font-bold">DP</AvatarFallback>
            </Avatar>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-900">Dewan Pengawas</p>
              <p className="text-[10px] text-gray-400">Komite Banding Keaktifan</p>
            </div>
          </div>
        </div>

        {activeAppeal ? (
          <div className="flex-1 overflow-y-auto p-10 space-y-6 max-w-4xl mx-auto w-full">
            
            {/* Member Profile Header */}
            <div className="bg-white border rounded-3xl p-6 shadow-sm flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border">
                  <AvatarImage src={activeAppeal.avatar} />
                  <AvatarFallback>{activeAppeal.memberName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">{activeAppeal.memberName}</h2>
                  <p className="text-xs text-gray-500 font-medium">{activeAppeal.memberNPA} • Diajukan {activeAppeal.submittedAt}</p>
                </div>
              </div>

              <span className={`text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase border ${
                activeAppeal.status === "approved" ? "bg-green-50 text-green-700 border-green-200" :
                activeAppeal.status === "rejected" ? "bg-red-50 text-red-700 border-red-200" : "bg-amber-50 text-amber-700 border-amber-200"
              }`}>
                Status: {activeAppeal.status}
              </span>
            </div>

            {/* Claimed Reason Box */}
            <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rincian Alasan Banding Anggota</h3>
              <p className="text-gray-800 text-sm leading-relaxed bg-gray-50 p-4 rounded-2xl border">
                "{activeAppeal.reason}"
              </p>
              <p className="text-xs text-[#0eb7b7] font-bold">Kegiatan Terkait: {activeAppeal.claimedEvents}</p>
            </div>

            {/* Supervisor Decision Form */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">Form Keputusan Dewan Pengawas</h3>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Catatan Resmi Pengawas (`supervisor_notes` MR-04)</label>
                <textarea 
                  value={supervisorNotesInput}
                  onChange={(e) => setSupervisorNotesInput(e.target.value)}
                  className="w-full h-24 rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#0eb7b7] resize-none"
                  placeholder="Masukkan pertimbangan atau instruksi resmi Dewan Pengawas..."
                />
              </div>

              {activeAppeal.supervisorNotes && (
                <div className="bg-slate-950 p-3 rounded-xl text-xs text-slate-300 border border-slate-800">
                  <span className="text-teal-400 font-bold block mb-0.5">Catatan Tersimpan:</span>
                  {activeAppeal.supervisorNotes}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  onClick={() => handleApprove(activeAppeal.id)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl h-11 text-xs flex gap-2"
                >
                  <Check className="w-4 h-4" /> Setujui Banding & Pulihkan Status Aktif
                </Button>

                <Button 
                  onClick={() => handleReject(activeAppeal.id)}
                  variant="outline" 
                  className="flex-1 border-slate-700 bg-slate-950 text-red-400 hover:bg-slate-800 hover:text-red-300 font-bold rounded-xl h-11 text-xs flex gap-2"
                >
                  <X className="w-4 h-4" /> Tolak Banding
                </Button>
              </div>
            </div>

          </div>
        ) : null}
      </div>

    </div>
  );
}
