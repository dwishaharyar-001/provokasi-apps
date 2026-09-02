"use client";

import { CheckCircle2, ArrowRight, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-12 md:p-16 rounded-[40px] shadow-2xl max-w-2xl w-full text-center border relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-teal-50 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-teal-100 text-[#0eb7b7] rounded-full flex items-center justify-center mb-8 shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          
          <h1 className="text-3xl font-black text-gray-900 mb-4">Verifikasi Berhasil!</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
            Data alumni LIO Anda telah tervalidasi oleh sistem. Anda kini resmi tergabung sebagai bagian dari Komunitas Provokasi. Berikut adalah Nomor Anggota resmi Anda:
          </p>

          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 w-full max-w-sm mb-10 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Nomor Anggota</div>
            <div className="flex items-center justify-center gap-3 text-[#0d4f54]">
              <UserCheck className="w-6 h-6" />
              <span className="text-2xl font-black font-mono tracking-wider">PKDI-2026-08014</span>
            </div>
          </div>

          <Link href="/login" className="w-full max-w-sm">
            <Button className="w-full h-14 bg-[#0d4f54] hover:bg-[#0a3f43] text-white rounded-xl shadow-lg shadow-teal-900/20 font-bold text-md group">
              Masuk ke Dasbor Anggota
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
