"use client";

import { Mountain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl max-w-5xl w-full flex flex-col md:flex-row gap-12 overflow-hidden border">
        
        {/* Left Side: Branding / Info */}
        <div className="flex-1 bg-[#0d4f54] rounded-[30px] p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0eb7b7] opacity-20 rounded-full -ml-10 -mb-10 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white mb-6">
              <Mountain className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black mb-4 leading-tight">Provokasi<br/>Komunitas LIO</h1>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              Sistem operasi mandiri bagi alumni Leadership Inside-Out. Lakukan verifikasi data untuk mengakses fasilitas komunitas, kegiatan eksklusif, dan forum musyawarah.
            </p>
          </div>

          <div className="relative z-10 mt-12 bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
            <h3 className="font-bold text-sm mb-2">Penting:</h3>
            <p className="text-xs text-white/70">
              Registrasi ini khusus untuk alumni yang telah menyelesaikan pelatihan LIO. Siapkan Nomor Batch dan sertifikat kelulusan Anda untuk keperluan verifikasi.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 flex flex-col justify-center py-4 md:pr-8">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Registrasi Alumni</h2>
            <p className="text-gray-500 text-sm">Verifikasi keanggotaan Anda sekarang.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Nama Lengkap</label>
                <Input placeholder="Sesuai KTP" className="rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#0eb7b7] h-12" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Nomor Batch LIO</label>
                <Input placeholder="Contoh: 08" className="rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#0eb7b7] h-12" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Email Pribadi</label>
              <Input type="email" placeholder="nama@email.com" className="rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#0eb7b7] h-12" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Nomor WhatsApp Aktif</label>
              <Input type="tel" placeholder="0812..." className="rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#0eb7b7] h-12" />
            </div>

            <Link href="/register/success" className="block w-full">
              <Button className="w-full h-14 mt-4 bg-[#0eb7b7] hover:bg-[#0a9494] text-white rounded-xl shadow-lg shadow-teal-500/20 font-bold text-md group">
                Lanjutkan Verifikasi 
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500 font-medium">
            Sudah memiliki akun terverifikasi? <Link href="#" className="text-[#0eb7b7] hover:underline font-bold">Masuk ke Portal</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
