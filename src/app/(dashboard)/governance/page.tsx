"use client";

import { useState } from "react";
import { Search, Bell, Zap, Users, AlertTriangle, Vote, Info, CheckCircle2, LockKeyhole, FileText, UserCheck, ShieldCheck, Download, Award, ArrowRight, X, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface AgendaItem {
  id: string;
  code: string;
  title: string;
  type: "Terbuka" | "Tertutup";
  status: "LIVE" | "Menunggu" | "Selesai";
  remainingTime?: string;
  description: string;
  options: string[];
}

const mockAgendas: AgendaItem[] = [
  {
    id: "ag-1",
    code: "Agenda #02",
    title: "Pengesahan RKAT 2027",
    type: "Terbuka",
    status: "LIVE",
    remainingTime: "14 mnt tersisa",
    description: "Musyawarah pengesahan Rencana Kerja & Anggaran Tahunan (RKAT) Komunitas Provokasi untuk tahun buku 2027. Pilihan terbuka tercatat pada Notula Resmi.",
    options: ["Menerima & Setuju", "Menolak dengan Catatan", "Abstain"]
  },
  {
    id: "ag-2",
    code: "Agenda #03",
    title: "Pemilihan Pengurus Inti 2027-2029",
    type: "Tertutup",
    status: "Menunggu",
    remainingTime: "Mulai 15:30 WIB",
    description: "Pemungutan suara rahasia terenkripsi (Secret Ballot) untuk menentukan Ketua Umum dan Dewan Pengurus Inti periode 2027-2029.",
    options: ["Paslon 01: Budi & Siti", "Paslon 02: Ahmad & Maya", "Abstain"]
  }
];

const mockDPTMembers = [
  { npa: "LIO-08001", name: "Budi Santoso", status: "Aktif", proxyAssignedTo: null },
  { npa: "LIO-08044", name: "Siti Rahma", status: "Aktif", proxyAssignedTo: null },
  { npa: "LIO-08013", name: "Dwi Ishak M.", status: "Aktif (Anda)", proxyAssignedTo: null },
  { npa: "LIO-09012", name: "Irvan Jie", status: "Aktif", proxyAssignedTo: "Dwi Ishak M." },
];

export default function GovernancePage() {
  const [selectedAgendaId, setSelectedAgendaId] = useState<string>("ag-1");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  
  // Modals
  const [isDPTModalOpen, setIsDPTModalOpen] = useState(false);
  const [isProxyModalOpen, setIsProxyModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  
  // GV-02 Proxy Mandate Form State
  const [proxyRecipientNPA, setProxyRecipientNPA] = useState("");
  const [proxySubmitted, setProxySubmitted] = useState(false);
  const [proxyError, setProxyError] = useState("");

  const activeAgenda = mockAgendas.find(a => a.id === selectedAgendaId) || mockAgendas[0];

  const handleVoteSubmit = () => {
    if (!selectedOption) return;
    setHasVoted(true);
    setIsReceiptModalOpen(true);
  };

  const handleProxySubmit = () => {
    if (!proxyRecipientNPA.trim()) {
      setProxyError("Masukkan NPA Anggota Penerima Kuasa!");
      return;
    }
    setProxyError("");
    setProxySubmitted(true);
  };

  return (
    <div className="flex flex-col xl:flex-row min-h-full w-full bg-white rounded-xl lg:rounded-tl-[40px] shadow-sm my-2 lg:my-4 mr-0 lg:mr-4 border overflow-hidden">
      
      {/* 1. SECONDARY SIDEBAR (Assembly Agendas & DPT Status) */}
      <div className="w-full xl:w-80 border-b xl:border-b-0 xl:border-r bg-white flex flex-col shrink-0">
        <div className="p-4 sm:p-6 border-b space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Musyawarah & Vote</h2>
            <span className="text-[10px] font-extrabold px-2 py-0.5 bg-teal-50 border border-teal-200 text-[#0eb7b7] rounded-full uppercase">
              Modul 3
            </span>
          </div>

          {/* GV-01: DPT Freeze Status Banner */}
          <div 
            onClick={() => setIsDPTModalOpen(true)}
            className="bg-[#0d4f54] text-white p-3.5 rounded-2xl cursor-pointer hover:bg-[#0a3f43] transition-colors relative overflow-hidden group shadow-sm"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1">
                <LockKeyhole className="w-3 h-3" /> GV-01 DPT FREEZE
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">H-30</span>
            </div>
            <p className="text-xs font-bold leading-tight">DPT Disahkan Pengawas</p>
            <p className="text-[10px] opacity-80 mt-1 flex items-center gap-1">
              Lihat 120 Daftar Pemilih <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Cari agenda musyawarah..." 
              className="w-full rounded-full bg-gray-50 border-gray-200 pl-10 text-xs focus-visible:ring-[#0eb7b7]" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {mockAgendas.map((agenda) => {
            const isActive = agenda.id === selectedAgendaId;
            return (
              <div 
                key={agenda.id}
                onClick={() => { setSelectedAgendaId(agenda.id); setSelectedOption(null); setHasVoted(false); }}
                className={`p-4 rounded-2xl cursor-pointer transition-all border relative ${
                  isActive 
                    ? "bg-[#0eb7b7]/10 border-[#0eb7b7] shadow-sm" 
                    : "border-transparent hover:bg-gray-50 opacity-80"
                }`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    agenda.status === "LIVE" ? "bg-rose-500 text-white animate-pulse" : "bg-gray-200 text-gray-600"
                  }`}>
                    {agenda.status}
                  </span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    {agenda.type === "Terbuka" ? "Open Vote" : "Secret Ballot"}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 leading-tight mb-2 text-sm">{agenda.title}</h3>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#0eb7b7]">{agenda.code}</span>
                  <span className="text-gray-500 text-[10px]">{agenda.remainingTime}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* GV-02: Proxy Mandate Action Button */}
        <div className="p-4 border-t bg-gray-50/50">
          <Button 
            onClick={() => setIsProxyModalOpen(true)}
            variant="outline" 
            className="w-full h-11 border-[#0eb7b7] text-[#0eb7b7] hover:bg-teal-50 font-bold text-xs flex gap-2 rounded-xl"
          >
            <UserCheck className="w-4 h-4" /> GV-02 Pelimpahan Surat Kuasa
          </Button>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA (Voting Booth GV-04) */}
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
                <p className="text-xs text-gray-500 font-medium">LIO-08013 (2 Suara Sah)</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-[#0eb7b7] transition-all">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>DI</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-2xl mx-auto space-y-6">
             
             {/* Header Session Info */}
             <div className="flex justify-between items-end">
               <div>
                 <p className="text-xs font-bold text-[#0eb7b7] tracking-widest uppercase mb-1">
                   Musyawarah Tahunan 2026 • {activeAgenda.code}
                 </p>
                 <h1 className="text-3xl font-black text-gray-900">{activeAgenda.title}</h1>
               </div>
               <div className="text-right bg-teal-50 border border-teal-200 p-3 rounded-2xl">
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Hak Suara Anda</p>
                 <p className="text-2xl font-black text-[#0eb7b7] leading-none mt-0.5">
                   2 <span className="text-xs text-gray-600 font-bold">Suara</span>
                 </p>
               </div>
             </div>

             {/* Voting Mode Info Banner */}
             <div className={`border rounded-2xl p-4 flex gap-3 ${
               activeAgenda.type === "Terbuka" ? "bg-amber-50 border-amber-200 text-amber-900" : "bg-indigo-50 border-indigo-200 text-indigo-900"
             }`}>
               <Info className={`w-5 h-5 shrink-0 mt-0.5 ${activeAgenda.type === "Terbuka" ? "text-amber-600" : "text-indigo-600"}`} />
               <div className="text-xs leading-relaxed">
                 <p className="font-bold uppercase tracking-wider mb-0.5">
                   Metode Pemungutan Suara: {activeAgenda.type === "Terbuka" ? "OPEN VOTE (Terbuka)" : "SECRET BALLOT (Tertutup & Terenkripsi)"}
                 </p>
                 <p className="opacity-90">
                   {activeAgenda.type === "Terbuka" 
                     ? "Pilihan Anda akan tercatat secara eksplisit beserta nama Anda pada Notula Resmi Musyawarah. Hak suara Anda berjumlah 2 (1 Pribadi + 1 Surat Kuasa dari Irvan Jie)."
                     : "Pilihan Anda dienkripsi secara kriptografis menggunakan algoritma acak. Identitas pemilih terpisah permanen dari opsi pilihan."
                   }
                 </p>
               </div>
             </div>

             {/* Agenda Description */}
             <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-2">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Deskripsi Agenda Musyawarah</h3>
               <p className="text-gray-700 text-sm leading-relaxed">{activeAgenda.description}</p>
             </div>

             {/* Voting Options Section */}
             <div className="space-y-4 pt-2">
               <h3 className="text-sm font-bold text-gray-800 border-b pb-2">Pilihan Suara Resmi</h3>
               
               <div className="space-y-3">
                 {activeAgenda.options.map((option, idx) => {
                   const isSelected = selectedOption === option;
                   return (
                     <div 
                       key={idx}
                       onClick={() => !hasVoted && setSelectedOption(option)}
                       className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                         isSelected 
                           ? "border-[#0eb7b7] bg-teal-50/50 shadow-md" 
                           : "border-gray-200 hover:border-gray-300 bg-white"
                       } ${hasVoted ? "cursor-not-allowed opacity-70" : ""}`}
                     >
                       <div className="flex items-center gap-4">
                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                           isSelected ? "border-[#0eb7b7] bg-[#0eb7b7]" : "border-gray-300"
                         }`}>
                           {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                         </div>
                         <span className="text-base font-bold text-gray-900">{option}</span>
                       </div>

                       {isSelected && <CheckCircle2 className="w-6 h-6 text-[#0eb7b7]" />}
                     </div>
                   );
                 })}
               </div>

               {/* Action Submit */}
               <div className="pt-4 flex justify-end">
                 <Button 
                   disabled={!selectedOption || hasVoted}
                   onClick={handleVoteSubmit}
                   className={`rounded-xl shadow-lg py-6 px-8 font-bold text-md flex gap-2 transition-all ${
                     hasVoted 
                       ? "bg-green-600 text-white cursor-not-allowed" 
                       : selectedOption 
                         ? "bg-[#0eb7b7] hover:bg-[#0a9494] text-white shadow-teal-500/20" 
                         : "bg-gray-300 text-gray-500 cursor-not-allowed"
                   }`}
                 >
                   <Vote className="w-5 h-5"/> {hasVoted ? "Suara Berhasil Terkirim" : "Kirim Suara Sekarang (2 Suara)"}
                 </Button>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* 3. RIGHT SIDEBAR (Live Quorum Monitor GV-03) */}
      <div className="w-80 border-l bg-[#fafcfc] flex flex-col">
        <div className="p-6 border-b">
           <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-[#0eb7b7]"/> Live Quorum GV-03
           </h3>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Quorum Progress Gauge Card */}
          <div className="bg-white p-5 rounded-3xl border shadow-sm text-center space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Persentase Kehadiran Sah</p>
            <h4 className="text-4xl font-black text-[#0eb7b7]">72.5%</h4>
            
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div className="bg-[#0eb7b7] h-full rounded-full transition-all duration-500" style={{ width: '72.5%' }}></div>
            </div>
            
            <div className="pt-2">
              <span className="text-[10px] font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-200 uppercase inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-green-600" /> KUORUM SAH TERCAPAI
              </span>
            </div>
          </div>

          {/* Detailed Quorum Breakdown */}
          <div className="bg-white rounded-2xl border p-4 space-y-3 text-xs">
            <h4 className="font-bold text-gray-800 uppercase tracking-wider text-[10px]">Rincian DPT & Kehadiran</h4>
            
            <div className="flex justify-between items-center pt-1 border-t">
              <span className="text-gray-500">Total DPT Terkunci (GV-01)</span>
              <span className="font-bold text-gray-900">120 Anggota</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t">
              <span className="text-gray-500">Hadir Fisik / Zoom</span>
              <span className="font-bold text-gray-900">65 Orang</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t">
              <span className="text-gray-500">Pelimpahan Surat Kuasa</span>
              <span className="font-bold text-amber-600">22 Mandat</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t font-bold bg-gray-50 p-2 rounded-xl">
              <span className="text-gray-800">Total Suara Sah</span>
              <span className="text-sm font-black text-gray-900">87 Suara</span>
            </div>
            <p className="text-[10px] text-gray-400 text-center font-medium pt-1">
              Ambang Kuorum AD/ART: 1/2 + 1 (Min. 61 Suara)
            </p>
          </div>

        </div>
      </div>

      {/* MODAL 1: GV-01 DAFTAR PEMILIH TETAP (DPT) FREEZE */}
      <Dialog open={isDPTModalOpen} onOpenChange={setIsDPTModalOpen}>
        <DialogContent className="sm:max-w-[560px] rounded-[30px] p-6">
          <DialogTitle className="text-xl font-black text-gray-900 mb-1 flex items-center gap-2">
            <LockKeyhole className="w-5 h-5 text-[#0eb7b7]" /> Daftar Pemilih Tetap (DPT) Freeze (GV-01)
          </DialogTitle>
          <p className="text-xs text-gray-500 border-b pb-3 mb-4">
            Daftar Anggota Aktif yang disahkan oleh Dewan Pengawas tepat pada H-30 Musyawarah Anggota.
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-emerald-900">Status: DPT TERKUNCI & SAH</p>
              <p className="text-emerald-700 text-[10px]">Disahkan Pengawas pada: 18 Agustus 2026</p>
            </div>
            <span className="text-[10px] font-extrabold px-3 py-1 bg-emerald-600 text-white rounded-full uppercase">
              120 DPT
            </span>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {mockDPTMembers.map((member, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl border text-xs bg-gray-50">
                <div>
                  <p className="font-bold text-gray-900">{member.name}</p>
                  <p className="text-[10px] text-gray-500">{member.npa}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 bg-teal-50 text-[#0eb7b7] border border-teal-200 rounded-full">
                    {member.status}
                  </span>
                  {member.proxyAssignedTo && (
                    <p className="text-[9px] font-bold text-amber-600 mt-1">
                      Mandat Kuasa ➔ {member.proxyAssignedTo}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t flex justify-end">
            <Button onClick={() => setIsDPTModalOpen(false)} className="bg-gray-900 text-white font-bold rounded-xl text-xs px-5">
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: GV-02 PELIMPAHAN SURAT KUASA (PROXY MANDATE) */}
      <Dialog open={isProxyModalOpen} onOpenChange={setIsProxyModalOpen}>
        <DialogContent className="sm:max-w-[480px] rounded-[30px] p-6">
          <DialogTitle className="text-xl font-black text-gray-900 mb-1 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#0eb7b7]" /> Pelimpahan Hak Suara (GV-02)
          </DialogTitle>
          <p className="text-xs text-gray-500 border-b pb-3 mb-4">
            Fasilitas pelimpahan hak suara kepada Anggota Aktif lain jika berhalangan hadir. (Batas Maksimal: 1 penerima kuasa mewakili 2 pemberi mandat).
          </p>

          {!proxySubmitted ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">NPA / Nama Anggota Penerima Kuasa</label>
                <Input 
                  type="text" 
                  value={proxyRecipientNPA}
                  onChange={(e) => setProxyRecipientNPA(e.target.value)}
                  placeholder="Contoh: LIO-08013 atau Dwi Ishak M." 
                  className="rounded-xl text-xs"
                />
              </div>

              {proxyError && <p className="text-xs text-red-500 font-bold">{proxyError}</p>}

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed">
                <p className="font-bold mb-1">Ketentuan Surat Kuasa AD/ART:</p>
                <ul className="list-disc pl-4 space-y-1 text-[11px]">
                  <li>Penerima kuasa harus merupakan Anggota Aktif terdaftar dalam DPT.</li>
                  <li>Sistem otomatis memblokir jika penerima kuasa telah menerima 2 surat kuasa.</li>
                </ul>
              </div>

              <div className="pt-3 border-t flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsProxyModalOpen(false)} className="rounded-xl text-xs font-bold">Batal</Button>
                <Button onClick={handleProxySubmit} className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white font-bold rounded-xl text-xs px-5">
                  Kirim Surat Kuasa
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Surat Kuasa Berhasil Diterbitkan</h3>
              <p className="text-xs text-gray-500">
                Hak suara Anda resmi dilimpahkan kepada <span className="font-bold text-gray-800">{proxyRecipientNPA}</span>. Status mandat telah tercatat di sistem DPT.
              </p>
              <Button onClick={() => { setIsProxyModalOpen(false); setProxySubmitted(false); }} className="bg-[#0eb7b7] text-white font-bold rounded-xl text-xs px-6">
                Selesai
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* MODAL 3: GV-04 DIGITAL VOTE RECEIPT */}
      <Dialog open={isReceiptModalOpen} onOpenChange={setIsReceiptModalOpen}>
        <DialogContent className="sm:max-w-[440px] rounded-[30px] p-8 text-center">
          <div className="w-16 h-16 bg-teal-100 text-[#0eb7b7] rounded-full flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <DialogTitle className="text-xl font-black text-gray-900 mb-1">Bukti Resi Suara Terenkripsi</DialogTitle>
          <p className="text-xs text-gray-500 mb-4">GV-04 Digital Voting Engine</p>

          <div className="bg-gray-50 border rounded-2xl p-4 text-left space-y-2 text-xs mb-6">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Agenda:</span>
              <span className="font-bold text-gray-900">{activeAgenda.title}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Pilihan Suara:</span>
              <span className="font-bold text-[#0eb7b7]">{selectedOption}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Jumlah Hak Suara:</span>
              <span className="font-bold text-gray-900">2 Suara (Pribadi + Mandat)</span>
            </div>
            <div className="pt-1">
              <span className="text-gray-500 block mb-1 text-[10px]">Kriptografi Hash Resi:</span>
              <p className="font-mono text-[9px] bg-slate-900 text-teal-300 p-2 rounded-xl break-all">
                0x8f4a2b9e1c7d3f0a...99b2c5e4
              </p>
            </div>
          </div>

          <Button onClick={() => setIsReceiptModalOpen(false)} className="w-full bg-[#0eb7b7] hover:bg-[#0a9494] text-white font-bold rounded-xl h-11 text-xs flex gap-2 justify-center">
            <Download className="w-4 h-4" /> Unduh Resi Suara PDF
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
