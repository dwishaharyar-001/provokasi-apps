"use client";

import { useState, use } from "react";
import { ArrowLeft, UserPlus, Search, ShieldCheck, Award, FileText, CheckCircle2, XCircle, Clock, Trash2, Download, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";

interface CommitteeAssignment {
  id: string;
  memberId: string;
  name: string;
  npa: string;
  role: "Ketua Panitia" | "Fasilitator Utama" | "Co-Host Zoom" | "Speaker / Narasumber" | "Dokumentasi & Media";
  status: "Confirmed" | "Pending" | "Declined";
  assignedAt: string;
  avatar: string;
  qualificationPoints: number; // 1 point for MR-03
}

const mockAssignments: CommitteeAssignment[] = [
  {
    id: "assign-1",
    memberId: "m-1",
    name: "Budi Santoso",
    npa: "LIO-08001",
    role: "Ketua Panitia",
    status: "Confirmed",
    assignedAt: "10 Sept 2026",
    avatar: "https://i.pravatar.cc/150?u=budi",
    qualificationPoints: 1,
  },
  {
    id: "assign-2",
    memberId: "m-2",
    name: "Siti Rahma",
    npa: "LIO-08044",
    role: "Fasilitator Utama",
    status: "Confirmed",
    assignedAt: "11 Sept 2026",
    avatar: "https://i.pravatar.cc/150?u=siti",
    qualificationPoints: 1,
  },
  {
    id: "assign-3",
    memberId: "m-3",
    name: "Ahmad Rizky",
    npa: "LIO-09012",
    role: "Co-Host Zoom",
    status: "Pending",
    assignedAt: "12 Sept 2026",
    avatar: "https://i.pravatar.cc/150?u=ahmad",
    qualificationPoints: 1,
  },
  {
    id: "assign-4",
    memberId: "m-4",
    name: "Dewi Lestari",
    npa: "LIO-09044",
    role: "Dokumentasi & Media",
    status: "Confirmed",
    assignedAt: "13 Sept 2026",
    avatar: "https://i.pravatar.cc/150?u=dewi",
    qualificationPoints: 1,
  }
];

const availableDirectory = [
  { id: "m-10", name: "Rina Wijaya", npa: "LIO-08102", batch: "LIO Batch 8", avatar: "https://i.pravatar.cc/150?u=rina" },
  { id: "m-11", name: "Fajar Nugraha", npa: "LIO-08115", batch: "LIO Batch 8", avatar: "https://i.pravatar.cc/150?u=fajar" },
  { id: "m-12", name: "Hendra Pratama", npa: "LIO-07033", batch: "LIO Batch 7", avatar: "https://i.pravatar.cc/150?u=hendra" },
  { id: "m-13", name: "Nadia Utami", npa: "LIO-09088", batch: "LIO Batch 9", avatar: "https://i.pravatar.cc/150?u=nadia" },
];

export default function CommitteeManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;

  const [roster, setRoster] = useState<CommitteeAssignment[]>(mockAssignments);
  const [activeRoleFilter, setActiveRoleFilter] = useState<string>("Semua");
  const [searchMemberQuery, setSearchMemberQuery] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedRoleForAssign, setSelectedRoleForAssign] = useState<CommitteeAssignment["role"]>("Fasilitator Utama");
  const [isSkModalOpen, setIsSkModalOpen] = useState(false);

  const filteredRoster = roster.filter(item => {
    if (activeRoleFilter !== "Semua" && item.role !== activeRoleFilter) return false;
    return item.name.toLowerCase().includes(searchMemberQuery.toLowerCase()) || 
           item.npa.toLowerCase().includes(searchMemberQuery.toLowerCase());
  });

  const handleAssignMember = (candidate: typeof availableDirectory[0]) => {
    const newAssignment: CommitteeAssignment = {
      id: `assign-${Date.now()}`,
      memberId: candidate.id,
      name: candidate.name,
      npa: candidate.npa,
      role: selectedRoleForAssign,
      status: "Confirmed",
      assignedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      avatar: candidate.avatar,
      qualificationPoints: 1,
    };
    setRoster(prev => [...prev, newAssignment]);
    setIsAssignModalOpen(false);
  };

  const handleRemoveAssignment = (id: string) => {
    setRoster(prev => prev.filter(r => r.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setRoster(prev => prev.map(item => {
      if (item.id !== id) return item;
      const nextStatus = item.status === "Confirmed" ? "Pending" : "Confirmed";
      return { ...item, status: nextStatus };
    }));
  };

  const confirmedCount = roster.filter(r => r.status === "Confirmed").length;

  return (
    <div className="flex flex-col xl:flex-row min-h-full w-full bg-white rounded-xl lg:rounded-tl-[40px] shadow-sm my-2 lg:my-4 mr-0 lg:mr-4 border overflow-hidden">
      
      {/* 1. LEFT SIDEBAR - Event Quick Summary & Policy */}
      <div className="w-full xl:w-80 border-b xl:border-b-0 xl:border-r bg-[#fafcfc] flex flex-col p-4 sm:p-6 space-y-4 sm:space-y-6 shrink-0">
        <div>
          <Link href="/admin/events" className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-[#0eb7b7] transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Kembali ke Manajemen Event
          </Link>
          <span className="text-[10px] font-extrabold text-[#0eb7b7] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
            EV-04 Assignment Ops
          </span>
          <h2 className="text-xl font-black text-gray-900 mt-2 leading-tight">
            Leading From Within (Batch 12)
          </h2>
          <p className="text-xs text-gray-500 mt-1">Kode Event: EVT-2026-0918</p>
        </div>

        {/* Qualification Engine Impact Card (MR-03 Integration) */}
        <div className="bg-gradient-to-br from-[#0d4f54] to-[#0eb7b7] text-white p-5 rounded-2xl shadow-md space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-300" />
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-90">Kualifikasi Anggota (MR-03)</h3>
          </div>
          <p className="text-xs opacity-90 leading-relaxed">
            Penugasan resmi ini otomatis menambahkan **+1 Poin Kontribusi Peran** (`role_contribution_count`) pada evaluasi keaktifan tahunan anggota.
          </p>
          <div className="pt-2 border-t border-white/20 flex justify-between items-center text-xs font-bold">
            <span>Total Terkonfirmasi:</span>
            <span className="text-amber-300 font-extrabold">{confirmedCount} Anggota</span>
          </div>
        </div>

        {/* Role Statistics */}
        <div className="bg-white border rounded-2xl p-4 space-y-3 shadow-sm">
          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Rincian Peran Kepanitiaan</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ketua Panitia</span>
              <span className="font-bold text-gray-900">{roster.filter(r => r.role === "Ketua Panitia").length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Fasilitator Utama</span>
              <span className="font-bold text-gray-900">{roster.filter(r => r.role === "Fasilitator Utama").length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Co-Host Zoom</span>
              <span className="font-bold text-gray-900">{roster.filter(r => r.role === "Co-Host Zoom").length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Dokumentasi & Media</span>
              <span className="font-bold text-gray-900">{roster.filter(r => r.role === "Dokumentasi & Media").length}</span>
            </div>
          </div>
        </div>

        {/* Quick Action SK Button */}
        <Button onClick={() => setIsSkModalOpen(true)} variant="outline" className="w-full h-11 border-[#0eb7b7] text-[#0eb7b7] hover:bg-teal-50 font-bold text-xs flex gap-2 rounded-xl">
          <FileText className="w-4 h-4" /> Preview SK Penugasan & Sertifikat
        </Button>
      </div>

      {/* 2. MAIN CONTENT AREA - Committee Roster */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd]">
        <div className="h-20 border-b flex items-center justify-between px-8 bg-white">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="search" 
                value={searchMemberQuery}
                onChange={(e) => setSearchMemberQuery(e.target.value)}
                placeholder="Cari nama panitia / NPA..." 
                className="w-full rounded-full bg-gray-50 border-gray-200 pl-10 text-xs focus-visible:ring-[#0eb7b7]" 
              />
            </div>
          </div>

          <Button 
            onClick={() => setIsAssignModalOpen(true)}
            className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white rounded-xl font-bold text-xs h-11 px-5 flex gap-2 shadow-md"
          >
            <UserPlus className="w-4 h-4" /> + Penugasan Panitia Baru
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          
          {/* Filter Bar */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {["Semua", "Ketua Panitia", "Fasilitator Utama", "Co-Host Zoom", "Dokumentasi & Media"].map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRoleFilter(role)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                    activeRoleFilter === role 
                      ? "bg-[#0eb7b7] text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 font-medium">Menampilkan {filteredRoster.length} Anggota</p>
          </div>

          {/* Roster Table Grid */}
          <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 border-b text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4 pl-6">Anggota Komunitas</th>
                  <th className="p-4">NPA</th>
                  <th className="p-4">Peran Resmi (EV-04)</th>
                  <th className="p-4">Poin Keaktifan</th>
                  <th className="p-4">Status SK</th>
                  <th className="p-4 pr-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-800 font-medium">
                {filteredRoster.map((item) => (
                  <tr key={item.id} className="hover:bg-teal-50/30 transition-colors">
                    <td className="p-4 pl-6 flex items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={item.avatar} />
                        <AvatarFallback>{item.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                        <p className="text-[10px] text-gray-400">Ditugaskan pada {item.assignedAt}</p>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-gray-600">{item.npa}</td>
                    <td className="p-4">
                      <span className="font-extrabold text-[#0eb7b7] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase text-[10px]">
                        {item.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1 w-fit text-[10px]">
                        <Award className="w-3 h-3 text-amber-500" /> +{item.qualificationPoints} MR-03
                      </span>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleToggleStatus(item.id)}
                        className={`text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                          item.status === "Confirmed" 
                            ? "bg-green-100 text-green-800 hover:bg-green-200" 
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                      >
                        {item.status === "Confirmed" ? (
                          <><CheckCircle2 className="w-3 h-3 text-green-600" /> Terkonfirmasi</>
                        ) : (
                          <><Clock className="w-3 h-3 text-amber-600" /> Menunggu SK</>
                        )}
                      </button>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button 
                        onClick={() => handleRemoveAssignment(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Penugasan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* MODAL TAMBAH PENUGASAN */}
      <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-[30px] p-6">
          <DialogTitle className="text-xl font-black text-gray-900 mb-1">
            Penugasan Panitia Baru (EV-04)
          </DialogTitle>
          <p className="text-xs text-gray-500 mb-4 border-b pb-3">
            Pilih anggota alumni LIO dari direktori untuk ditugaskan pada kegiatan ini.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Peran Kepanitiaan Ditugaskan</label>
              <select 
                value={selectedRoleForAssign}
                onChange={(e) => setSelectedRoleForAssign(e.target.value as CommitteeAssignment["role"])}
                className="w-full text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0eb7b7]"
              >
                <option value="Ketua Panitia">Ketua Panitia</option>
                <option value="Fasilitator Utama">Fasilitator Utama</option>
                <option value="Co-Host Zoom">Co-Host Zoom</option>
                <option value="Speaker / Narasumber">Speaker / Narasumber</option>
                <option value="Dokumentasi & Media">Dokumentasi & Media</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2">Pilih Anggota dari Direktori</label>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {availableDirectory.map((candidate) => (
                  <div key={candidate.id} className="flex items-center justify-between p-3 rounded-2xl border hover:bg-teal-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-bold text-gray-900">{candidate.name}</p>
                        <p className="text-[10px] text-gray-400">{candidate.npa} • {candidate.batch}</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleAssignMember(candidate)}
                      size="sm" 
                      className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white text-xs font-bold rounded-xl h-8 px-3"
                    >
                      + Tugaskan
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL PREVIEW SK PENUGASAN */}
      <Dialog open={isSkModalOpen} onOpenChange={setIsSkModalOpen}>
        <DialogContent className="sm:max-w-[550px] rounded-[30px] p-8 text-gray-900">
          <DialogTitle className="text-xs font-bold uppercase text-[#0eb7b7] tracking-widest mb-1">
            SURAT KEPUTUSAN PENUGASAN (SK)
          </DialogTitle>
          <h2 className="text-xl font-black mb-4">Perkumpulan Komunitas Provokasi</h2>
          
          <div className="bg-gray-50 border rounded-2xl p-5 space-y-3 text-xs leading-relaxed">
            <p className="font-bold text-gray-800">Nomor: SK-PANITIA/2026/09/EVT-08</p>
            <p className="text-gray-600">
              Menetapkan anggota terdaftar dalam dokumen ini sebagai panitia dan fasilitator resmi kegiatan <span className="font-bold text-gray-900">Leading From Within (Batch 12)</span>.
            </p>
            <div className="border-t pt-3">
              <p className="font-bold text-gray-800 mb-2">Daftar Panitia Terverifikasi:</p>
              <ul className="list-disc pl-4 space-y-1 text-gray-700">
                {roster.filter(r => r.status === "Confirmed").map(r => (
                  <li key={r.id}><span className="font-bold">{r.name}</span> ({r.npa}) — {r.role}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsSkModalOpen(false)} className="rounded-xl text-xs font-bold">Tutup</Button>
            <Button onClick={() => setIsSkModalOpen(false)} className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white text-xs font-bold rounded-xl flex gap-2">
              <Download className="w-4 h-4" /> Unduh Dokumen SK PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
