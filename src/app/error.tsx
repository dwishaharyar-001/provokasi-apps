"use client";

import { useEffect } from "react";
import { AlertOctagon, RefreshCw, Home, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Provokasi System Error Log]:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
        
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto text-red-400">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[10px] font-extrabold px-3 py-1 bg-red-500/20 text-red-300 rounded-full uppercase tracking-wider border border-red-500/30">
            Runtime System Error
          </span>
          <h1 className="text-2xl font-black text-white mt-3">Terjadi Kesalahan Sistem</h1>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">
            Terjadi pengecualian runtime saat memproses halaman ini. Error telah dicatat pada sistem log.
          </p>
        </div>

        {/* Diagnostic Log Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left font-mono text-xs space-y-1 text-[#0eb7b7] overflow-x-auto">
          <div className="flex items-center gap-2 text-slate-400 border-b border-slate-800 pb-2 mb-2">
            <Terminal className="w-3.5 h-3.5 text-red-400" />
            <span className="font-bold text-[11px] text-white">Error Trace Dump</span>
          </div>
          <p><span className="text-slate-400">Message:</span> {error.message || "Unknown error"}</p>
          {error.digest && <p><span className="text-slate-400">Digest Code:</span> {error.digest}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button onClick={() => reset()} className="flex-1 bg-[#0eb7b7] hover:bg-[#0a9494] text-white font-bold rounded-xl h-11 text-xs flex gap-2">
            <RefreshCw className="w-4 h-4" /> Coba Lagi
          </Button>
          
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white font-bold rounded-xl h-11 text-xs flex gap-2">
              <Home className="w-4 h-4" /> Dashboard
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
