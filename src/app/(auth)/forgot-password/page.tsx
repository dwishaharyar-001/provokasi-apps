"use client";

import { Mountain, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-12 rounded-[40px] shadow-2xl max-w-xl w-full flex flex-col border relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent"></div>
        
        <div className="relative z-10">
          <Link href="/login" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-[#0eb7b7] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Login
          </Link>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0d4f54] text-white mb-6">
            <Mountain className="h-6 w-6" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Lupa Kata Sandi?</h1>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Jangan khawatir! Masukkan alamat email yang terdaftar di akun Anda, dan kami akan mengirimkan tautan untuk mereset kata sandi Anda.
          </p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Email Pribadi</label>
              <Input type="email" placeholder="nama@email.com" className="rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#0eb7b7] h-12" />
            </div>

            <Button className="w-full h-14 mt-4 bg-[#0eb7b7] hover:bg-[#0a9494] text-white rounded-xl shadow-lg shadow-teal-500/20 font-bold text-md flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Kirim Tautan Reset
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}
