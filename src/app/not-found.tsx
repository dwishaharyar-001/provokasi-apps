"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw, Terminal, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const timeString = new Date().toISOString();

  useEffect(() => {
    console.error(`[Provokasi Log] 404 Not Found Triggered at ${timeString}`);
  }, [timeString]);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
        
        <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[10px] font-extrabold px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full uppercase tracking-wider border border-amber-500/30">
            HTTP 404 - Page Not Found
          </span>
          <h1 className="text-2xl font-black text-white mt-3">Halaman Tidak Ditemukan</h1>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">
            Rute URL yang Anda tuju tidak terdaftar atau sedang dalam proses pembaruan *deployment*.
          </p>
        </div>

        {/* Diagnostic Log Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left font-mono text-xs space-y-1 text-slate-300">
          <div className="flex items-center gap-2 text-slate-400 border-b border-slate-800 pb-2 mb-2">
            <Terminal className="w-3.5 h-3.5 text-[#0eb7b7]" />
            <span className="font-bold text-[11px] text-white">Diagnostic Log Trace</span>
          </div>
          <p><span className="text-teal-400">Status:</span> 404 NOT_FOUND</p>
          <p><span className="text-teal-400">Timestamp:</span> {timeString}</p>
          <p><span className="text-teal-400">App Framework:</span> Next.js App Router</p>
          <p><span className="text-teal-400">Environment:</span> Production (Vercel)</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Link href="/" className="flex-1">
            <Button className="w-full bg-[#0eb7b7] hover:bg-[#0a9494] text-white font-bold rounded-xl h-11 text-xs flex gap-2">
              <Home className="w-4 h-4" /> Kembali ke Dashboard
            </Button>
          </Link>
          
          <Link href="/events" className="flex-1">
            <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white font-bold rounded-xl h-11 text-xs flex gap-2">
              <ArrowLeft className="w-4 h-4" /> Ke Events
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
