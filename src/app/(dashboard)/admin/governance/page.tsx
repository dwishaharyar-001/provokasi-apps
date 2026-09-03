"use client";

import { useState } from "react";
import { Search, Bell, Users, LockKeyhole, ShieldCheck, CheckCircle2, XCircle, Play, Pause, Square, FileText, Download, UserCheck, Vote, BarChart3, AlertCircle, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ProxyReviewItem {
  id: string;
  grantorName: string;
  grantorNPA: string;
  recipientName: string;
  recipientNPA: string;
  recipientCurrentCount: number; // Max 2
  status: "Approved" | "Pending" | "Rejected";
}

const initialProxies: ProxyReviewItem[] = [
  { id: "prx-1", grantorName: "Irvan Jie", grantorNPA: "LIO-09012", recipientName: "Dwi Ishak M.", recipientNPA: "LIO-08013", recipientCurrentCount: 1, status: "Approved" },
  { id: "prx-2", grantorName: "Rina Wijaya", grantorNPA: "LIO-08102", recipientName: "Budi Santoso", recipientNPA: "LIO-08001", recipientCurrentCount: 2, status: "Approved" },
  { id: "prx-3", grantorName: "Fajar Nugraha", grantorNPA: "LIO-08115", recipientName: "Siti Rahma", recipientNPA: "LIO-08044", recipientCurrentCount: 1, status: "Pending" },
];

export default function AdminGovernancePage() {
  const [dptFrozen, setDptFrozen] = useState(true);
  const [sessionStatus, setSessionStatus] = useState<"LIVE" | "PAUSED" | "FINALIZED">("LIVE");
  const [proxies, setProxies] = useState<ProxyReviewItem[]>(initialProxies);
  const [isNotulaModalOpen, setIsNotulaModalOpen] = useState(false);

  // Tally Mock Data
  const [voteTally, setVoteTally] = useState({
    accept: 62,
    reject: 18,
    abstain: 7,
    total: 87,
  });

  const handleApproveProxy = (id: string) => {
    setProxies(prev => prev.map(p => p.id === id ? { ...p, status: "Approved" } : p));
  };

  const handleRejectProxy = (id: string) => {
    setProxies(prev => prev.map(p => p.id === id ? { ...p, status: "Rejected" } : p));
  };

  return (
    <div className="flex flex-col xl:flex-row min-h-full w-full bg-white rounded-xl lg:rounded-tl-[40px] shadow-sm my-2 lg:my-4 mr-0 lg:mr-4 border overflow-hidden">
      
      {/* SECONDARY SIDEBAR (Control Navigation) */}
      <div className="w-full xl:w-80 border-b xl:border-b-0 xl:border-r bg-white flex flex-col p-4 sm:p-6 space-y-4 sm:space-y-6 shrink-0">
        <div>
          <span className="text-[10px] font-extrabold text-[#0eb7b7] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Konsol Pengawas & Admin
          </span>
          <h2 className="text-lg sm:text-xl font-black text-gray-900 mt-2">Governance Room</h2>
          <p className="text-xs text-gray-500 mt-1">Musyawarah Tahunan 2026</p>
        </div>

        {/* GV-01 DPT Freeze Control Card */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3 shadow-md">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest flex items-center gap-1">
              <LockKeyhole className="w-3.5 h-3.5" /> GV-01 DPT Freeze
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
              Disahkan
            </span>
          </div>

          <div className="text-xs space-y-1">
            <p className="font-bold text-slate-100">DPT Terkunci: 120 Anggota</p>
            <p className="text-slate-400 text-[10px]">Batas Penguncian H-30 dipatuhi.</p>
          </div>

          <Button 
            onClick={() => setDptFrozen(prev => !prev)}
            variant="outline" 
            className={`w-full text-xs font-bold rounded-xl h-9 border-slate-700 ${
              dptFrozen ? "bg-slate-800 text-teal-300 hover:bg-slate-700" : "bg-emerald-600 text-white hover:bg-emerald-500"
            }`}
          >
            {dptFrozen ? "Status: DPT Terkunci" : "Kunci DPT Sekarang"}
          </Button>
        </div>

        {/* Live Voting Session Controls (GV-04) */}
        <div className="bg-white border rounded-2xl p-4 space-y-3 shadow-sm">
          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Kontrol Sesi Voting (GV-04)</h4>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => setSessionStatus("LIVE")}
              size="sm" 
              className={`flex-1 text-xs font-bold rounded-xl h-9 ${
                sessionStatus === "LIVE" ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Play className="w-3.5 h-3.5 mr-1" /> Live
            </Button>

            <Button 
              onClick={() => setSessionStatus("PAUSED")}
              size="sm" 
              className={`flex-1 text-xs font-bold rounded-xl h-9 ${
                sessionStatus === "PAUSED" ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Pause className="w-3.5 h-3.5 mr-1" /> Pause
            </Button>
          </div>

          <Button 
            onClick={() => { setSessionStatus("FINALIZED"); setIsNotulaModalOpen(true); }}
            variant="outline" 
            className="w-full text-xs font-bold rounded-xl h-9 border-rose-200 text-rose-600 hover:bg-rose-50"
          >
            <Square className="w-3.5 h-3.5 mr-1" /> Sahkan & Kunci Hasil
          </Button>
        </div>

        {/* Generate Notula Button */}
        <Button onClick={() => setIsNotulaModalOpen(true)} className="w-full bg-[#0eb7b7] hover:bg-[#0a9494] text-white font-bold text-xs h-11 rounded-xl shadow-md flex gap-2">
          <FileText className="w-4 h-4" /> Terbit Notula & Berita Acara
        </Button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd]">
        <div className="h-20 border-b flex items-center justify-between px-8 bg-white">
          <h1 className="text-xl font-black text-gray-900">Ruang Kontrol Musyawarah & E-Voting</h1>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-amber-500 cursor-pointer hover:bg-amber-50 p-2 rounded-full transition-colors">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div className="flex items-center gap-3 pl-4 border-l cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">Majelis Pengawas</p>
                <p className="text-xs text-gray-500 font-medium">Ketua Presiduum Sidang</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-[#0eb7b7] transition-all">
                <AvatarFallback className="bg-slate-900 text-white font-bold">MP</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* GV-03 & GV-04 Live Voting Tally Section */}
          <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-extrabold text-[#0eb7b7] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase">
                  GV-03 & GV-04 Live Voting Tally
                </span>
                <h3 className="text-xl font-extrabold text-gray-900 mt-2">Agenda #02: Pengesahan RKAT 2027</h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Kuorum Sah (72.5%)
                </span>
                <span className="text-xs font-bold px-3 py-1 bg-slate-900 text-white rounded-full">
                  {voteTally.total} Suara Masuk
                </span>
              </div>
            </div>

            {/* Tally Progress Bars */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-800 mb-1">
                  <span>Menerima & Setuju</span>
                  <span className="text-[#0eb7b7]">{voteTally.accept} Suara (71.2%)</span>
                </div>
                <Progress value={71.2} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-gray-800 mb-1">
                  <span>Menolak dengan Catatan</span>
                  <span className="text-rose-600">{voteTally.reject} Suara (20.7%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '20.7%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-gray-800 mb-1">
                  <span>Abstain</span>
                  <span className="text-gray-500">{voteTally.abstain} Suara (8.1%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-gray-400 h-full rounded-full" style={{ width: '8.1%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* GV-02 Proxy Mandates Management Table */}
          <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#0eb7b7]" /> Validasi Surat Kuasa (GV-02)
                </h3>
                <p className="text-xs text-gray-500">Pemeriksaan batas maksimal 2 mandat per penerima kuasa.</p>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                {proxies.filter(p => p.status === "Pending").length} Perlu Verifikasi
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b text-gray-500 font-bold uppercase">
                  <tr>
                    <th className="p-3">Pemberi Kuasa</th>
                    <th className="p-3">Penerima Kuasa</th>
                    <th className="p-3">Jumlah Kuasa Penerima</th>
                    <th className="p-3">Status Mandat</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-gray-800 font-medium">
                  {proxies.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="p-3">
                        <p className="font-bold text-gray-900">{p.grantorName}</p>
                        <p className="text-[10px] text-gray-400">{p.grantorNPA}</p>
                      </td>
                      <td className="p-3">
                        <p className="font-bold text-gray-900">{p.recipientName}</p>
                        <p className="text-[10px] text-gray-400">{p.recipientNPA}</p>
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          p.recipientCurrentCount <= 2 ? "bg-teal-50 text-[#0eb7b7] border border-teal-200" : "bg-red-100 text-red-700"
                        }`}>
                          {p.recipientCurrentCount}/2 Mandat
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                          p.status === "Approved" ? "bg-green-100 text-green-800" : p.status === "Pending" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        {p.status === "Pending" && (
                          <>
                            <Button onClick={() => handleApproveProxy(p.id)} size="sm" className="h-7 text-[10px] font-bold bg-green-600 text-white rounded-lg">
                              Setujui
                            </Button>
                            <Button onClick={() => handleRejectProxy(p.id)} variant="outline" size="sm" className="h-7 text-[10px] font-bold text-red-600 rounded-lg">
                              Tolak
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL GENERATE NOTULA MUSYAWARAH */}
      <Dialog open={isNotulaModalOpen} onOpenChange={setIsNotulaModalOpen}>
        <DialogContent className="sm:max-w-[550px] rounded-[30px] p-8 text-gray-900">
          <DialogTitle className="text-xs font-bold uppercase text-[#0eb7b7] tracking-widest mb-1">
            NOTULA & BERITA ACARA E-VOTING
          </DialogTitle>
          <h2 className="text-xl font-black mb-3">Musyawarah Tahunan Provokasi 2026</h2>
          
          <div className="bg-gray-50 border rounded-2xl p-5 space-y-3 text-xs leading-relaxed">
            <p className="font-bold text-gray-800">Nomor Risalah: BA-VOTE/2026/09/AGENDA-02</p>
            <p className="text-gray-600">
              Sidang Musyawarah mengesahkan <span className="font-bold text-gray-900">Agenda #02: Pengesahan RKAT 2027</span> dengan kuorum sah 72.5% (87 Suara).
            </p>
            <div className="border-t pt-3 space-y-1">
              <p className="font-bold text-gray-800">Hasil Pemungutan Suara:</p>
              <p className="text-emerald-700 font-bold">• Menerima & Setuju: 62 Suara (71.2%) — MENANG</p>
              <p className="text-rose-600">• Menolak: 18 Suara (20.7%)</p>
              <p className="text-gray-500">• Abstain: 7 Suara (8.1%)</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsNotulaModalOpen(false)} className="rounded-xl text-xs font-bold">Tutup</Button>
            <Button onClick={() => setIsNotulaModalOpen(false)} className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white text-xs font-bold rounded-xl flex gap-2">
              <Download className="w-4 h-4" /> Unduh Berita Acara PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
