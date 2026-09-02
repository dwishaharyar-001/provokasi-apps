"use client";

import { useState } from "react";
import { 
  FileText, Search, ShieldCheck, Download, Eye, LockKeyhole, History, 
  CheckCircle2, FileCheck2, ArrowRight, Sparkles, Filter, ExternalLink 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface LegalDocument {
  id: string;
  regNumber: string;
  title: string;
  category: "Legal Organisasi" | "AD/ART" | "Notula Musyawarah" | "Sertifikat & PKS";
  accessLevel: "Publik" | "Internal Anggota" | "Rahasia Pengurus";
  version: string;
  updatedAt: string;
  fileSize: string;
  sha256Hash: string;
  description: string;
  versionHistory: { version: string; date: string; notes: string }[];
}

const mockDocuments: LegalDocument[] = [
  {
    id: "doc-101",
    regNumber: "SK-AHU/2026/08912",
    title: "SK Kemenkumham & Akta Pendirian Perkumpulan",
    category: "Legal Organisasi",
    accessLevel: "Publik",
    version: "v1.0 (Final)",
    updatedAt: "12 Feb 2026",
    fileSize: "2.4 MB",
    sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    description: "Pengesahan Badan Hukum Perkumpulan Komunitas Provokasi oleh Kementerian Hukum dan HAM Republik Indonesia.",
    versionHistory: [
      { version: "v1.0", date: "12 Feb 2026", notes: "Penerbitan SK Badan Hukum Resmi Kemenkumham RI." }
    ]
  },
  {
    id: "doc-102",
    regNumber: "AD-ART/2026/REV2",
    title: "Anggaran Dasar & Anggaran Rumah Tangga (AD/ART) 2026",
    category: "AD/ART",
    accessLevel: "Internal Anggota",
    version: "v2.1 (Revisi)",
    updatedAt: "18 Aug 2026",
    fileSize: "1.8 MB",
    sha256Hash: "8f4a2b9e1c7d3f0a99b2c5e47852b855e3b0c44298fc1c149afbf4c8996fb924",
    description: "Pedoman Tata Kelola Organisasi, Hak & Kewajiban Anggota, serta Aturan Evaluasi Keaktifan (MR-03).",
    versionHistory: [
      { version: "v2.1", date: "18 Aug 2026", notes: "Pembaruan klausul kualifikasi 2 dari 3 parameter AD/ART." },
      { version: "v2.0", date: "15 Jan 2026", notes: "Hasil Amandemen Musyawarah Anggota Luar Biasa." },
      { version: "v1.0", date: "10 Feb 2025", notes: "Versi Awal Pendirian Komunitas." }
    ]
  },
  {
    id: "doc-103",
    regNumber: "BA-VOTE/2026/09",
    title: "Notula & Berita Acara Musyawarah Tahunan 2026",
    category: "Notula Musyawarah",
    accessLevel: "Internal Anggota",
    version: "v1.0",
    updatedAt: "02 Sept 2026",
    fileSize: "3.1 MB",
    sha256Hash: "4c8996fb92427ae41e4649b934e3b0c44298fc1c1ca495991b7852b8558f4a2b",
    description: "Risalah resmi penetapan RKAT 2027 dan hasil e-voting sah kuorum 72.5%.",
    versionHistory: [
      { version: "v1.0", date: "02 Sept 2026", notes: "Disahkan oleh Presiduum Sidang Musyawarah." }
    ]
  }
];

export default function DocumentVaultPage() {
  const [documents, setDocuments] = useState<LegalDocument[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  
  // Modals & Drawers
  const [previewDoc, setPreviewDoc] = useState<LegalDocument | null>(null);
  const [historyDoc, setHistoryDoc] = useState<LegalDocument | null>(null);

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || doc.regNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-full w-full bg-white rounded-tl-[40px] shadow-sm my-4 mr-4 border overflow-hidden">
      
      {/* 1. LEFT SIDEBAR - Categories & Security Info */}
      <div className="w-80 border-r bg-[#fafcfc] flex flex-col p-6 space-y-6">
        <div>
          <span className="text-[10px] font-extrabold text-[#0eb7b7] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Modul 5: Legal Vault
          </span>
          <h2 className="text-xl font-black text-gray-900 mt-2">Repositori Dokumen</h2>
          <p className="text-xs text-gray-500 mt-1">Vault Terenkripsi & Versi Resmi (DC-01)</p>
        </div>

        {/* Categories Selector */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kategori Dokumen</h4>
          <div className="space-y-1">
            {["Semua", "Legal Organisasi", "AD/ART", "Notula Musyawarah", "Sertifikat & PKS"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left text-xs font-bold px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-between ${
                  selectedCategory === cat ? "bg-[#0eb7b7] text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{cat}</span>
                {selectedCategory === cat && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Security Badge DC-01 */}
        <div className="bg-slate-900 text-white p-5 rounded-3xl space-y-2 shadow-md">
          <div className="flex items-center gap-2 text-teal-400">
            <LockKeyhole className="w-4 h-4" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest">ENCRYPTED AT REST & TRANSIT</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Setiap salinan dokumen diverifikasi menggunakan **SHA-256 Checksum** untuk menjamin keaslian arsip hukum Perkumpulan (DC-01).
          </p>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA - Document List & Vault DC-01 */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd] overflow-y-auto p-10">
        <div className="max-w-4xl mx-auto space-y-8 w-full">
          
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs font-bold text-[#0eb7b7] uppercase tracking-widest">DC-01 & DC-02 Encrypted Document Vault</p>
              <h1 className="text-2xl font-black text-gray-900">Arsip Legal Organisasi</h1>
            </div>

            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nomor SK atau judul..." 
                className="w-full rounded-full bg-white border-gray-200 pl-10 text-xs focus-visible:ring-[#0eb7b7]" 
              />
            </div>
          </div>

          {/* Document Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDocs.map((doc) => (
              <div 
                key={doc.id}
                className="bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 bg-teal-50 border border-teal-200 text-[#0eb7b7] rounded-full uppercase">
                      {doc.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      doc.accessLevel === "Publik" ? "bg-green-100 text-green-800" : "bg-indigo-100 text-indigo-800"
                    }`}>
                      {doc.accessLevel}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-gray-900 text-base leading-snug mb-1">{doc.title}</h3>
                  <p className="font-mono text-[10px] text-gray-400 font-bold mb-2">Reg: {doc.regNumber}</p>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{doc.description}</p>
                </div>

                <div className="pt-3 border-t space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold">
                    <span>Versi: <strong className="text-gray-800">{doc.version}</strong></span>
                    <span>Diperbarui: {doc.updatedAt}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => setPreviewDoc(doc)}
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs font-bold rounded-xl border-[#0eb7b7] text-[#0eb7b7] hover:bg-teal-50 flex gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" /> Pratinjau Dokumen
                    </Button>

                    <Button 
                      onClick={() => setHistoryDoc(doc)}
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-gray-600 font-bold hover:bg-gray-100 rounded-xl"
                      title="Lihat Riwayat Versi"
                    >
                      <History className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* MODAL 1: DOCUMENT PREVIEW WITH SHA-256 CHECKSUM (DC-01) */}
      <Dialog open={!!previewDoc} onOpenChange={() => setPreviewDoc(null)}>
        {previewDoc && (
          <DialogContent className="sm:max-w-[560px] rounded-[30px] p-6 text-gray-900">
            <DialogTitle className="text-xs font-bold uppercase text-[#0eb7b7] tracking-widest mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> VERIFIED ENCRYPTED ARTIFACT (DC-01)
            </DialogTitle>
            <h2 className="text-xl font-black mb-1">{previewDoc.title}</h2>
            <p className="text-xs text-gray-500 font-mono mb-4">No. Registrasi: {previewDoc.regNumber}</p>

            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4 relative overflow-hidden">
              <div className="flex justify-between items-center text-xs">
                <span className="text-teal-400 font-bold uppercase tracking-wider">Watermark Keaslian Digital</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold text-[10px]">
                  TERVERIFIKASI ASLI
                </span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">SHA-256 Cryptographic Checksum:</p>
                <p className="font-mono text-[9px] text-teal-300 break-all bg-black/50 p-2.5 rounded-xl border border-teal-500/20">
                  {previewDoc.sha256Hash}
                </p>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-800 pt-3">
                <span>Status Akses: <strong className="text-white">{previewDoc.accessLevel}</strong></span>
                <span>Ukuran File: {previewDoc.fileSize}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setPreviewDoc(null)} className="rounded-xl text-xs font-bold">Tutup</Button>
              <Button className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white text-xs font-bold rounded-xl flex gap-2">
                <Download className="w-4 h-4" /> Unduh PDF Resmi
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* MODAL 2: VERSION HISTORY DRAWER (DC-02) */}
      <Dialog open={!!historyDoc} onOpenChange={() => setHistoryDoc(null)}>
        {historyDoc && (
          <DialogContent className="sm:max-w-[480px] rounded-[30px] p-6 text-gray-900">
            <DialogTitle className="text-xl font-black mb-1 flex items-center gap-2">
              <History className="w-5 h-5 text-[#0eb7b7]" /> Riwayat Versi Dokumen (DC-02)
            </DialogTitle>
            <p className="text-xs text-gray-500 border-b pb-3 mb-4">{historyDoc.title}</p>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {historyDoc.versionHistory.map((ver, idx) => (
                <div key={idx} className="p-4 rounded-2xl border bg-gray-50/50 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-gray-900 bg-teal-100 text-[#0eb7b7] px-2.5 py-0.5 rounded-full text-[10px]">
                      Versi {ver.version}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold">{ver.date}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium pt-1">{ver.notes}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t flex justify-end">
              <Button onClick={() => setHistoryDoc(null)} className="bg-gray-900 text-white font-bold rounded-xl text-xs px-5">
                Tutup
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
