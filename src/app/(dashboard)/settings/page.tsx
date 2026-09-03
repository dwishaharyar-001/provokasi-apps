"use client";

import { useState } from "react";
import { Search, Bell, Shield, User, Lock, Trash2, Save, AlertTriangle, CheckCircle2, Clock, ShieldCheck, FileSpreadsheet, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("pdp");

  // PD-01 Granular Consent State
  const [consentDirectory, setConsentDirectory] = useState(true);
  const [consentOfficerContact, setConsentOfficerContact] = useState(true);
  const [consentInternalResearch, setConsentInternalResearch] = useState(false);
  const [consentMediaDocs, setConsentMediaDocs] = useState(true);

  // PD-03 Erasure Modal State
  const [isErasureModalOpen, setIsErasureModalOpen] = useState(false);
  const [erasureReason, setErasureReason] = useState("");
  const [erasureSubmitted, setErasureSubmitted] = useState(false);

  const handleErasureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!erasureReason.trim()) return;
    setErasureSubmitted(true);
  };

  return (
    <div className="flex flex-col xl:flex-row min-h-full w-full bg-white rounded-xl lg:rounded-tl-[40px] shadow-sm my-2 lg:my-4 mr-0 lg:mr-4 border overflow-hidden">
      
      {/* SECONDARY SIDEBAR (Settings Navigation) */}
      <div className="w-full xl:w-80 border-b xl:border-b-0 xl:border-r bg-white flex flex-col shrink-0">
        <div className="p-4 sm:p-6 border-b">
          <span className="text-[10px] font-extrabold text-[#0eb7b7] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase">
            Modul 6: Security & PDP
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-2">Pengaturan Akun</h2>
          <p className="text-xs text-gray-500 mt-1">Kelola Privasi & Kepatuhan PDP</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div 
            onClick={() => setActiveTab("pdp")}
            className={cn(
              "p-4 rounded-2xl cursor-pointer transition-colors flex items-center gap-3",
              activeTab === "pdp" 
                ? "bg-[#0eb7b7]/10 border border-[#0eb7b7] text-[#0d4f54]" 
                : "border border-transparent hover:bg-gray-50 text-gray-600"
            )}
          >
            <Shield className="w-5 h-5 text-[#0eb7b7]" />
            <div>
              <p className="font-bold text-sm">Privasi & Data (PDP)</p>
              <p className="text-[10px] text-gray-400">PD-01 & PD-03 Consent</p>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab("profile")}
            className={cn(
              "p-4 rounded-2xl cursor-pointer transition-colors flex items-center gap-3",
              activeTab === "profile" 
                ? "bg-[#0eb7b7]/10 border border-[#0eb7b7] text-[#0d4f54]" 
                : "border border-transparent hover:bg-gray-50 text-gray-600"
            )}
          >
            <User className="w-5 h-5" />
            <span className="font-bold text-sm">Profil Pribadi</span>
          </div>

          <div 
            onClick={() => setActiveTab("security")}
            className={cn(
              "p-4 rounded-2xl cursor-pointer transition-colors flex items-center gap-3",
              activeTab === "security" 
                ? "bg-[#0eb7b7]/10 border border-[#0eb7b7] text-[#0d4f54]" 
                : "border border-transparent hover:bg-gray-50 text-gray-600"
            )}
          >
            <Lock className="w-5 h-5" />
            <span className="font-bold text-sm">Keamanan Sandi</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd]">
        <div className="h-20 border-b flex items-center justify-between px-8 bg-white">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Cari pengaturan privasi..." 
              className="w-full rounded-full bg-gray-50 border-gray-200 pl-10 shadow-inner text-xs focus-visible:ring-1 focus-visible:ring-[#0eb7b7]" 
            />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 pl-4 border-l cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">Dwi Ishak M.</p>
                <p className="text-xs text-gray-500 font-medium">LIO-08013</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-[#0eb7b7] transition-all">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>DI</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-3xl mx-auto space-y-10">
            
            {/* UU PDP TAB (PD-01 & PD-03) */}
            {activeTab === "pdp" && (
              <section className="space-y-6">
                <div>
                  <span className="text-[10px] font-extrabold text-[#0eb7b7] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase">
                    UU PDP No. 27/2022 Compliance
                  </span>
                  <h1 className="text-2xl font-extrabold text-gray-900 mt-2">Privasi & Pelindungan Data Pribadi (PDP)</h1>
                  <p className="text-gray-500 text-xs mt-1">
                    Anda memiliki kendali penuh atas persetujuan pemrosesan data pribadi Anda di dalam platform Komunitas Provokasi.
                  </p>
                </div>

                <div className="bg-white border rounded-3xl shadow-sm overflow-hidden space-y-6 p-6">
                  <div className="flex gap-4 items-start bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-900">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold uppercase tracking-wider mb-0.5">Penegakan Hak Subjek Data (PD-01)</h4>
                      <p className="opacity-90 leading-relaxed">
                        Seluruh aktivitas pengaksesan atau ekspor data pribadi Anda oleh pengurus dicatat secara permanen pada **Access Audit Trail** (PD-02) demi mencegah penyalahgunaan.
                      </p>
                    </div>
                  </div>

                  {/* PD-01 Granular Consents Toggles */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Manajemen Persetujuan Eksplisit (PD-01)</h3>

                    {/* Toggle 1 */}
                    <label className="flex items-start justify-between p-4 border rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <div>
                        <h5 className="font-bold text-gray-900 text-xs mb-0.5">Visibilitas di Direktori Anggota</h5>
                        <p className="text-[11px] text-gray-500 max-w-md leading-relaxed">
                          Mengizinkan anggota aktif terverifikasi untuk mencari profil nama & batch Anda di Direktori. Nomor telepon & email Anda tetap disamarkan (*masked*).
                        </p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={consentDirectory} 
                        onChange={(e) => setConsentDirectory(e.target.checked)}
                        className="w-5 h-5 accent-[#0eb7b7] rounded cursor-pointer mt-1" 
                      />
                    </label>

                    {/* Toggle 2 */}
                    <label className="flex items-start justify-between p-4 border rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <div>
                        <h5 className="font-bold text-gray-900 text-xs mb-0.5">Kontak Langsung Pengurus Komunitas</h5>
                        <p className="text-[11px] text-gray-500 max-w-md leading-relaxed">
                          Mengizinkan pengurus pusat/daerah menghubungi Anda via WhatsApp/Email untuk pengumuman kegiatan resmi & penugasan panitia.
                        </p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={consentOfficerContact} 
                        onChange={(e) => setConsentOfficerContact(e.target.checked)}
                        className="w-5 h-5 accent-[#0eb7b7] rounded cursor-pointer mt-1" 
                      />
                    </label>

                    {/* Toggle 3 */}
                    <label className="flex items-start justify-between p-4 border rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <div>
                        <h5 className="font-bold text-gray-900 text-xs mb-0.5">Partisipasi Riset & Survei Internal Komunitas</h5>
                        <p className="text-[11px] text-gray-500 max-w-md leading-relaxed">
                          Mengizinkan penggunaan data demografi secara anonim untuk analisis pengembangan program pelatihan & riset akademik nirlaba.
                        </p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={consentInternalResearch} 
                        onChange={(e) => setConsentInternalResearch(e.target.checked)}
                        className="w-5 h-5 accent-[#0eb7b7] rounded cursor-pointer mt-1" 
                      />
                    </label>

                    {/* Toggle 4 */}
                    <label className="flex items-start justify-between p-4 border rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <div>
                        <h5 className="font-bold text-gray-900 text-xs mb-0.5">Dokumentasi Media Publikasi Umum</h5>
                        <p className="text-[11px] text-gray-500 max-w-md leading-relaxed">
                          Persetujuan penampilan dokumentasi foto/video Anda dalam kegiatan umum publik (di luar ruang kerahasiaan *Safe Space*).
                        </p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={consentMediaDocs} 
                        onChange={(e) => setConsentMediaDocs(e.target.checked)}
                        className="w-5 h-5 accent-[#0eb7b7] rounded cursor-pointer mt-1" 
                      />
                    </label>
                  </div>

                  {/* PD-03 Right to be Forgotten Banner */}
                  <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                    <div className="flex gap-3 items-start">
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-rose-950 text-xs mb-0.5">Hapus Akun & Data (Right to be Forgotten - PD-03)</h4>
                        <p className="text-[11px] text-rose-900 max-w-md leading-relaxed">
                          Hak mengajukan permohonan penghapusan seluruh data pribadi secara permanen sesuai amanat UU PDP dengan penanganan SLA maks. 30 Hari.
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setIsErasureModalOpen(true)}
                      variant="destructive" 
                      className="shrink-0 rounded-xl font-bold bg-rose-600 hover:bg-rose-700 text-xs flex gap-2"
                    >
                      <Trash2 className="w-4 h-4"/> Ajukan Penghapusan (PD-03)
                    </Button>
                  </div>
                </div>
              </section>
            )}

            {/* PROFIL TAB */}
            {activeTab === "profile" && (
              <section>
                <div className="mb-6">
                  <h1 className="text-2xl font-extrabold text-gray-900">Informasi Profil</h1>
                </div>
                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4 text-xs">
                  <p className="text-gray-600">Data identitas anggota terlindungi enkripsi.</p>
                </div>
              </section>
            )}

            {/* SECURITY TAB */}
            {activeTab === "security" && (
              <section>
                <div className="mb-6">
                  <h1 className="text-2xl font-extrabold text-gray-900">Keamanan Kata Sandi</h1>
                </div>
                <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4 text-xs">
                  <p className="text-gray-600">Fitur ubah kata sandi terverifikasi enkripsi hash bcrypt/argon2.</p>
                </div>
              </section>
            )}

          </div>
        </div>
      </div>

      {/* MODAL PD-03 RIGHT TO BE FORGOTTEN REQUEST */}
      <Dialog open={isErasureModalOpen} onOpenChange={setIsErasureModalOpen}>
        <DialogContent className="sm:max-w-[480px] rounded-[30px] p-6 text-gray-900">
          <DialogTitle className="text-xl font-black mb-1 flex items-center gap-2 text-rose-600">
            <AlertTriangle className="w-5 h-5" /> Permohonan Penghapusan Akun (PD-03)
          </DialogTitle>
          <p className="text-xs text-gray-500 border-b pb-3 mb-4">
            Eksekusi *Right to be Forgotten* sesuai UU Pelindungan Data Pribadi No. 27/2022 (SLA 30 Hari).
          </p>

          {!erasureSubmitted ? (
            <form onSubmit={handleErasureSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Alasan Permohonan Penghapusan</label>
                <textarea 
                  value={erasureReason}
                  onChange={(e) => setErasureReason(e.target.value)}
                  required
                  className="w-full h-28 rounded-xl bg-gray-50 border border-gray-200 p-3 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none"
                  placeholder="Jelaskan permohonan Anda..."
                />
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-900 leading-relaxed">
                <p className="font-bold mb-1">Konsekuensi Hukum AD/ART & UU PDP:</p>
                <ul className="list-disc pl-4 space-y-1 text-[11px]">
                  <li>Status keanggotaan dan hak suara DPT Anda akan dicabut secara permanen.</li>
                  <li>Sistem akan menghapus data personal dalam kurun waktu SLA 30 Hari kerja.</li>
                </ul>
              </div>

              <div className="pt-2 border-t flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsErasureModalOpen(false)} className="rounded-xl text-xs font-bold">Batal</Button>
                <Button type="submit" variant="destructive" className="bg-rose-600 hover:bg-rose-700 font-bold rounded-xl text-xs px-5">
                  Kirim Permohonan Permanen
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Permohonan Diproses (SLA 30 Hari)</h3>
              <p className="text-xs text-gray-500">
                Permohonan *Right to Erasure* telah tercatat di **Audit Log PDP**. Petugas DPO akan memverifikasi dan menghapus data Anda selambatnya 30 Hari kerja.
              </p>
              <Button onClick={() => { setIsErasureModalOpen(false); setErasureSubmitted(false); }} className="bg-gray-900 text-white font-bold rounded-xl text-xs px-6">
                Selesai
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
