"use client";

import { Mountain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl max-w-5xl w-full flex flex-col md:flex-row-reverse gap-12 overflow-hidden border">
        
        {/* Right Side: Branding / Info (reversed for login) */}
        <div className="flex-1 bg-gradient-to-bl from-[#0eb7b7] to-[#0d4f54] rounded-[30px] p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white mb-6">
              <Mountain className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black mb-4 leading-tight">Selamat Datang<br/>Kembali!</h1>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              Masuk ke portal komunitas untuk mengakses jaringan alumni, kelas belajar berkelanjutan, dan hak suara musyawarah Anda.
            </p>
          </div>
        </div>

        {/* Left Side: Form */}
        <div className="flex-1 flex flex-col justify-center py-4 md:pl-8">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Masuk Akun</h2>
            <p className="text-gray-500 text-sm">Gunakan email yang terdaftar di sistem.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Email Pribadi</label>
              <Input type="email" placeholder="nama@email.com" className="rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#0eb7b7] h-12" />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Kata Sandi</label>
                <Link href="/forgot-password" className="text-xs font-bold text-[#0eb7b7] hover:underline">Lupa Kata Sandi?</Link>
              </div>
              <Input type="password" placeholder="••••••••" className="rounded-xl bg-gray-50 border-gray-200 focus-visible:ring-[#0eb7b7] h-12" />
            </div>

            <Button className="w-full h-14 mt-4 bg-[#0d4f54] hover:bg-[#0a3f43] text-white rounded-xl shadow-lg shadow-teal-900/20 font-bold text-md group">
              Masuk 
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500 font-medium">
            Belum tergabung? <Link href="/register" className="text-[#0eb7b7] hover:underline font-bold">Verifikasi Alumni LIO</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
