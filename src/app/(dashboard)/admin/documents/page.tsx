"use client";

import { useState } from "react";
import { 
  FileText, Search, ShieldCheck, Upload, LockKeyhole, History, CheckCircle2, 
  Plus, Edit, Eye, Lock, Globe, Users, ShieldAlert, Download, Check
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface AdminLegalDoc {
  id: string;
  regNumber: string;
  title: string;
  category: string;
  accessLevel: "Publik" | "Internal Anggota" | "Rahasia Pengurus";
  version: string;
  updatedAt: string;
  fileSize: string;
  downloadsCount: number;
}

const initialAdminDocs: AdminLegalDoc[] = [
  { id: "doc-101", regNumber: "SK-AHU/2026/08912", title: "SK Kemenkumham & Akta Pendirian", category: "Legal Organisasi", accessLevel: "Publik", version: "v1.0", updatedAt: "12 Feb 2026", fileSize: "2.4 MB", downloadsCount: 142 },
  { id: "doc-102", regNumber: "AD-ART/2026/REV2", title: "Anggaran Dasar & ART 2026", category: "AD/ART", accessLevel: "Internal Anggota", version: "v2.1", updatedAt: "18 Aug 2026", fileSize: "1.8 MB", downloadsCount: 98 },
  { id: "doc-103", regNumber: "BA-VOTE/2026/09", title: "Notula Musyawarah Tahunan 2026", category: "Notula Musyawarah", accessLevel: "Internal Anggota", version: "v1.0", updatedAt: "02 Sept 2026", fileSize: "3.1 MB", downloadsCount: 45 },
];

export default function AdminDocumentsPage() {
  const [docs, setDocs] = useState<AdminLegalDoc[]>(initialAdminDocs);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  // Form State
  const [titleInput, setTitleInput] = useState("");
  const [regNumberInput, setRegNumberInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("Legal Organisasi");
  const [accessLevelInput, setAccessLevelInput] = useState<"Publik" | "Internal Anggota" | "Rahasia Pengurus">("Internal Anggota");
  const [revisionNotesInput, setRevisionNotesInput] = useState("");

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    const newDoc: AdminLegalDoc = {
      id: `doc-${Date.now()}`,
      regNumber: regNumberInput || "REG/2026/NEW",
      title: titleInput,
      category: categoryInput,
      accessLevel: accessLevelInput,
      version: "v1.0",
      updatedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      fileSize: "2.1 MB",
      downloadsCount: 0
    };

    setDocs(prev => [newDoc, ...prev]);
    setTitleInput("");
    setRegNumberInput("");
    setIsUploadModalOpen(false);
  };

  const handleRevisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDocId) return;

    setDocs(prev => prev.map(d => {
      if (d.id !== selectedDocId) return d;
      return {
        ...d,
        version: "v2.0 (Revisi)",
        updatedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
      };
    }));

    setRevisionNotesInput("");
    setIsRevisionModalOpen(false);
  };

  return (
    <div className="flex flex-col xl:flex-row min-h-full w-full bg-white rounded-xl lg:rounded-tl-[40px] shadow-sm my-2 lg:my-4 mr-0 lg:mr-4 border overflow-hidden">
      
      {/* SECONDARY SIDEBAR (Admin Vault Options) */}
      <div className="w-full xl:w-80 border-b xl:border-b-0 xl:border-r bg-white flex flex-col p-4 sm:p-6 space-y-4 sm:space-y-6 shrink-0">
        <div>
          <span className="text-[10px] font-extrabold text-[#0eb7b7] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase">
            DC-01 & DC-02 Console
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-2">Vault Admin Legal</h2>
          <p className="text-xs text-gray-500 mt-1">Manajemen & Revisi Dokumen</p>
        </div>

        <Button 
          onClick={() => setIsUploadModalOpen(true)}
          className="w-full bg-[#0eb7b7] hover:bg-[#0a9494] text-white font-bold text-xs h-11 rounded-xl shadow-md flex gap-2"
        >
          <Plus className="w-4 h-4" /> Enkripsi & Unggah Dokumen Baru
        </Button>

        {/* Security Policy Card */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-teal-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">VERSI DOKUMEN SAH (DC-02)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Pengubahan versi dokumen resmi akan otomatis mencatat riwayat log revisi (*Version History*) dan menerbitkan hash kriptografis baru.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT AREA (Document Registry & Access Control Table) */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd]">
        <div className="h-20 border-b flex items-center justify-between px-8 bg-white">
          <h1 className="text-xl font-black text-gray-900">Konsol Pengelolaan Dokumen Legal Organisasi</h1>
          
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-[#0eb7b7]">
              <AvatarFallback className="bg-slate-900 text-white font-bold">AL</AvatarFallback>
            </Avatar>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-900">Tim Legal Komunitas</p>
              <p className="text-[10px] text-gray-400">Administrator Vault</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          
          {/* Document Management Table */}
          <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-gray-900 text-base">Daftar Dokumen Terenkripsi</h3>
              <span className="text-xs font-bold bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                Total {docs.length} Arsip Resmi
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b text-gray-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Judul Dokumen & Reg.</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Level Akses (DC-02)</th>
                    <th className="p-3">Versi</th>
                    <th className="p-3">Unduhan</th>
                    <th className="p-3 text-right">Aksi Revisi</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-gray-800 font-medium">
                  {docs.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50">
                      <td className="p-3">
                        <p className="font-bold text-gray-900">{d.title}</p>
                        <p className="font-mono text-[10px] text-gray-400">{d.regNumber}</p>
                      </td>
                      <td className="p-3">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0eb7b7]">
                          {d.category}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                          d.accessLevel === "Publik" ? "bg-green-100 text-green-800" : "bg-indigo-100 text-indigo-800"
                        }`}>
                          {d.accessLevel}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-gray-900">{d.version}</td>
                      <td className="p-3 text-gray-500 font-bold">{d.downloadsCount}x Diunduh</td>
                      <td className="p-3 text-right space-x-2">
                        <Button 
                          onClick={() => { setSelectedDocId(d.id); setIsRevisionModalOpen(true); }}
                          variant="outline" 
                          size="sm" 
                          className="h-8 text-xs font-bold rounded-lg border-teal-200 text-[#0eb7b7] hover:bg-teal-50"
                        >
                          <Edit className="w-3.5 h-3.5 mr-1" /> Terbit Versi Baru (DC-02)
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL 1: UPLOAD DOKUMEN BARU (DC-01) */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-[30px] p-6 text-gray-900">
          <DialogTitle className="text-xl font-black mb-1 flex items-center gap-2">
            <LockKeyhole className="w-5 h-5 text-[#0eb7b7]" /> Unggah & Enkripsi Dokumen Baru (DC-01)
          </DialogTitle>
          <p className="text-xs text-gray-500 border-b pb-3 mb-4">
            Dokumen akan disimpan dengan enkripsi *at rest* dan checksum SHA-256 otomatis.
          </p>

          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Judul Dokumen Resmi</label>
              <Input 
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder="Contoh: Perjanjian Kerjasama PKS Batch 12" 
                required 
                className="rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">No. Registrasi / SK</label>
                <Input 
                  value={regNumberInput}
                  onChange={(e) => setRegNumberInput(e.target.value)}
                  placeholder="SK-PROV/2026/..." 
                  className="rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Kategori</label>
                <select 
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  className="w-full h-9 rounded-xl border border-gray-200 text-xs px-3 focus:outline-none focus:ring-1 focus:ring-[#0eb7b7]"
                >
                  <option value="Legal Organisasi">Legal Organisasi</option>
                  <option value="AD/ART">AD/ART</option>
                  <option value="Notula Musyawarah">Notula Musyawarah</option>
                  <option value="Sertifikat & PKS">Sertifikat & PKS</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Tingkat Hak Akses (DC-02)</label>
              <select 
                value={accessLevelInput}
                onChange={(e) => setAccessLevelInput(e.target.value as any)}
                className="w-full h-9 rounded-xl border border-gray-200 text-xs px-3 focus:outline-none focus:ring-1 focus:ring-[#0eb7b7]"
              >
                <option value="Publik">Publik (Dapat diakses terbuka)</option>
                <option value="Internal Anggota">Internal Anggota (Hanya Anggota Terdaftar)</option>
                <option value="Rahasia Pengurus">Rahasia Pengurus (Hanya Pengurus & Pengawas)</option>
              </select>
            </div>

            <div className="pt-3 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsUploadModalOpen(false)} className="rounded-xl text-xs font-bold">Batal</Button>
              <Button type="submit" className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white font-bold rounded-xl text-xs px-5">
                Simpan & Enkripsi Dokumen
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: TERBITKAN VERSI BARU (DC-02) */}
      <Dialog open={isRevisionModalOpen} onOpenChange={setIsRevisionModalOpen}>
        <DialogContent className="sm:max-w-[460px] rounded-[30px] p-6 text-gray-900">
          <DialogTitle className="text-xl font-black mb-1 flex items-center gap-2">
            <History className="w-5 h-5 text-[#0eb7b7]" /> Terbit Versi Revisi Dokumen (DC-02)
          </DialogTitle>
          <p className="text-xs text-gray-500 border-b pb-3 mb-4">
            Membuat revisi versi baru (contoh: `v2.0`) dengan mencatat changelog ke riwayat revisi.
          </p>

          <form onSubmit={handleRevisionSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Catatan Perubahan / Changelog</label>
              <textarea 
                value={revisionNotesInput}
                onChange={(e) => setRevisionNotesInput(e.target.value)}
                required
                className="w-full h-28 rounded-xl bg-gray-50 border border-gray-200 p-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#0eb7b7] resize-none"
                placeholder="Jelaskan pasal atau poin yang direvisi..."
              />
            </div>

            <div className="pt-2 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsRevisionModalOpen(false)} className="rounded-xl text-xs font-bold">Batal</Button>
              <Button type="submit" className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white font-bold rounded-xl text-xs px-5">
                Terbit Versi Revisi Selesai
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
