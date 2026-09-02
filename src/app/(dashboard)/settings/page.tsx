"use client";

import { useState } from "react";
import { Search, Bell, Shield, User, Lock, Trash2, Save, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex h-full w-full bg-white rounded-tl-[40px] shadow-sm my-4 mr-4 border overflow-hidden">
      
      {/* SECONDARY SIDEBAR (Settings Navigation) */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Pengaturan</h2>
          <p className="text-xs text-gray-500 mt-1">Kelola Akun & Privasi Anda</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
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
            onClick={() => setActiveTab("pdp")}
            className={cn(
              "p-4 rounded-2xl cursor-pointer transition-colors flex items-center gap-3",
              activeTab === "pdp" 
                ? "bg-[#0eb7b7]/10 border border-[#0eb7b7] text-[#0d4f54]" 
                : "border border-transparent hover:bg-gray-50 text-gray-600"
            )}
          >
            <Shield className="w-5 h-5" />
            <span className="font-bold text-sm">Privasi & Data (PDP)</span>
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
              placeholder="Cari pengaturan..." 
              className="w-full rounded-full bg-gray-50 border-gray-200 pl-10 shadow-inner text-sm focus-visible:ring-1 focus-visible:ring-[#0eb7b7]" 
            />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer hover:bg-gray-50 p-2 rounded-full transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex items-center gap-3 pl-4 border-l cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">Dwi Ishak M.</p>
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
            
            {/* Profil Pribadi Tab */}
            {activeTab === "profile" && (
              <section>
                <div className="mb-6">
                  <h1 className="text-2xl font-extrabold text-gray-900">Informasi Pribadi</h1>
                  <p className="text-gray-500 text-sm mt-1">Perbarui foto dan data kontak Anda. Perubahan akan langsung tersimpan di sistem.</p>
                </div>

                <div className="bg-white border rounded-3xl p-8 shadow-sm space-y-8">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24 border-4 border-gray-50 shadow-sm relative group cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="text-2xl bg-gray-100">DI</AvatarFallback>
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Ubah</span>
                      </div>
                    </Avatar>
                    <div>
                      <Button variant="outline" className="rounded-xl font-bold h-10 px-6">Unggah Foto Baru</Button>
                      <p className="text-xs text-gray-400 mt-2">JPG, PNG, maksimal 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Nama Lengkap</label>
                      <Input defaultValue="Dwi Ishak M. Wibowo" className="rounded-xl bg-gray-50 border-gray-200 h-12 font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">No. Batch LIO</label>
                      <Input defaultValue="LIO-08" disabled className="rounded-xl bg-gray-100 border-none h-12 font-medium text-gray-500 cursor-not-allowed" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Email Pribadi</label>
                      <Input defaultValue="dwiishak@gmail.com" type="email" className="rounded-xl bg-gray-50 border-gray-200 h-12 font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Nomor WhatsApp</label>
                      <Input defaultValue="081234567890" type="tel" className="rounded-xl bg-gray-50 border-gray-200 h-12 font-medium" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4 border-t">
                    <Button className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white rounded-xl shadow-lg shadow-teal-500/20 py-5 px-8 font-bold flex gap-2">
                      <Save className="w-4 h-4" /> Simpan Perubahan
                    </Button>
                  </div>
                </div>
              </section>
            )}

            {/* UU PDP Tab */}
            {activeTab === "pdp" && (
              <section>
                <div className="mb-6">
                  <h1 className="text-2xl font-extrabold text-gray-900">Privasi & Pelindungan Data (PDP)</h1>
                  <p className="text-gray-500 text-sm mt-1">Sistem ini mematuhi Undang-Undang Pelindungan Data Pribadi (UU PDP).</p>
                </div>

                <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b flex gap-4 items-start bg-gray-50">
                    <Shield className="w-6 h-6 text-[#0eb7b7] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Manajemen Persetujuan Data</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Atur preferensi visibilitas data pribadi Anda di dalam platform komunitas. Rekam medis (opsional) dan data sensitif lainnya akan otomatis dienkripsi.
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <label className="flex items-start justify-between p-4 border rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <div>
                        <h5 className="font-bold text-gray-800 text-sm mb-1">Tampilkan Profil di Direktori Anggota</h5>
                        <p className="text-xs text-gray-500 max-w-sm">Anggota lain dapat mencari Anda di direktori. Kontak spesifik (email/telepon) tetap akan disamarkan (*masked*).</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0eb7b7]"></div>
                      </div>
                    </label>

                    <label className="flex items-start justify-between p-4 border rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <div>
                        <h5 className="font-bold text-gray-800 text-sm mb-1">Persetujuan Dokumentasi Media</h5>
                        <p className="text-xs text-gray-500 max-w-sm">Saya bersedia didokumentasikan (foto/video) dalam kegiatan umum (bukan *safe space*) untuk keperluan publikasi.</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0eb7b7]"></div>
                      </div>
                    </label>
                  </div>

                  <div className="p-6 bg-rose-50 border-t flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                    <div className="flex gap-4 items-start">
                      <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-rose-900 mb-1">Hapus Akun & Data (Right to be Forgotten)</h4>
                        <p className="text-sm text-rose-800/80 max-w-md">
                          Mengajukan permohonan penghapusan seluruh data pribadi Anda dari server. Status keanggotaan Anda akan dicabut permanen.
                        </p>
                      </div>
                    </div>
                    <Button variant="destructive" className="shrink-0 rounded-xl font-bold bg-rose-500 hover:bg-rose-600 flex gap-2">
                      <Trash2 className="w-4 h-4"/> Ajukan Penghapusan
                    </Button>
                  </div>
                </div>
              </section>
            )}

            {/* Keamanan Sandi Tab */}
            {activeTab === "security" && (
              <section>
                <div className="mb-6">
                  <h1 className="text-2xl font-extrabold text-gray-900">Keamanan Sandi</h1>
                  <p className="text-gray-500 text-sm mt-1">Ganti kata sandi akun Anda secara berkala untuk menjaga keamanan data.</p>
                </div>

                <div className="bg-white border rounded-3xl p-8 shadow-sm space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Kata Sandi Saat Ini</label>
                    <Input type="password" placeholder="••••••••" className="rounded-xl bg-gray-50 border-gray-200 h-12" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Kata Sandi Baru</label>
                      <Input type="password" placeholder="Minimal 8 karakter" className="rounded-xl bg-gray-50 border-gray-200 h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Konfirmasi Sandi Baru</label>
                      <Input type="password" placeholder="Ulangi sandi baru" className="rounded-xl bg-gray-50 border-gray-200 h-12" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4 border-t">
                    <Button className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white rounded-xl shadow-lg shadow-teal-500/20 py-5 px-8 font-bold flex gap-2">
                      <Lock className="w-4 h-4" /> Perbarui Sandi
                    </Button>
                  </div>
                </div>
              </section>
            )}
            
            <div className="h-10"></div>
          </div>
        </div>
      </div>

    </div>
  );
}
