"use client";

import { useState } from "react";
import { ArrowLeft, ScanLine, CheckCircle2, Search, History, ShieldCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface CheckInLog {
  id: string;
  name: string;
  npa: string;
  role: string;
  time: string;
  avatar: string;
  safeSpaceVerified: boolean;
}

const initialLogs: CheckInLog[] = [
  { id: "1", name: "Budi Santoso", npa: "LIO-08001", role: "Ketua Panitia", time: "13:45 WIB", avatar: "https://i.pravatar.cc/150?u=budi", safeSpaceVerified: true },
  { id: "2", name: "Siti Rahma", npa: "LIO-08044", role: "Fasilitator Utama", time: "13:50 WIB", avatar: "https://i.pravatar.cc/150?u=siti", safeSpaceVerified: true },
];

export default function QRScannerPage() {
  const [scanStatus, setScanStatus] = useState<"scanning" | "success" | "manual">("scanning");
  const [selectedEvent, setSelectedEvent] = useState("Leading From Within (18 Sept 2026)");
  const [manualQuery, setManualQuery] = useState("");
  const [logs, setLogs] = useState<CheckInLog[]>(initialLogs);
  const [showLogDrawer, setShowLogDrawer] = useState(false);

  const handleSimulateScan = () => {
    const newLog: CheckInLog = {
      id: Date.now().toString(),
      name: "Dwi Ishak M.",
      npa: "LIO-08013",
      role: "Anggota Aktif",
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
      avatar: "https://github.com/shadcn.png",
      safeSpaceVerified: true,
    };
    setLogs(prev => [newLog, ...prev]);
    setScanStatus("success");
  };

  const handleManualCheckIn = () => {
    if (!manualQuery.trim()) return;
    const newLog: CheckInLog = {
      id: Date.now().toString(),
      name: manualQuery,
      npa: "LIO-REGULAR",
      role: "Peserta",
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
      avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(manualQuery)}`,
      safeSpaceVerified: true,
    };
    setLogs(prev => [newLog, ...prev]);
    setManualQuery("");
    setScanStatus("success");
  };

  return (
    <div className="flex flex-col min-h-full w-full bg-slate-950 rounded-xl lg:rounded-tl-[40px] shadow-sm my-2 lg:my-4 mr-0 lg:mr-4 border border-slate-800 overflow-hidden relative text-white">
      
      {/* Top Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-4 sm:p-6 z-20 flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
        <div className="w-full">
          <Link href="/admin/events" className="inline-flex items-center text-xs font-bold text-teal-400 hover:text-teal-300 mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Kembali ke Konsol Acara
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full">
            <h1 className="text-lg sm:text-xl font-black text-white">Scanner Presensi EV-02</h1>
            <select 
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs font-bold text-teal-300 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0eb7b7] w-full sm:w-auto"
            >
              <option value="Leading From Within (18 Sept 2026)">Leading From Within (18 Sept 2026)</option>
              <option value="Strategi Resolusi Konflik (05 Okt 2026)">Strategi Resolusi Konflik (05 Okt 2026)</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto sm:justify-end">
          <Button 
            onClick={() => setShowLogDrawer(prev => !prev)}
            variant="outline" 
            size="sm"
            className="rounded-full border-slate-700 bg-slate-900/80 text-xs font-bold text-white hover:bg-slate-800"
          >
            <History className="w-4 h-4 mr-1.5 text-teal-400" /> Log Presensi ({logs.length})
          </Button>

          <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider">Kamera Readiness OK</span>
          </div>
        </div>
      </div>

      {/* Main Scanner Body */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Scanner Guideline Frame */}
        {scanStatus === "scanning" && (
          <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 border-2 border-[#0eb7b7] rounded-3xl flex items-center justify-center shadow-[0_0_0_9999px_rgba(2,6,23,0.75)]">
            <ScanLine className="w-16 h-16 text-[#0eb7b7] animate-pulse" />
            
            {/* 4 Corners */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#0eb7b7] rounded-tl-3xl"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#0eb7b7] rounded-tr-3xl"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#0eb7b7] rounded-bl-3xl"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#0eb7b7] rounded-br-3xl"></div>
          </div>
        )}

        {/* Manual Input Fallback */}
        {scanStatus === "manual" && (
          <div className="relative z-10 bg-slate-900 border border-slate-800 p-8 rounded-[30px] max-w-sm w-full mx-4 shadow-2xl text-center">
            <h3 className="text-lg font-bold text-white mb-1">Presensi Manual Peserta</h3>
            <p className="text-xs text-slate-400 mb-6">Masukkan nama atau NPA peserta jika QR Code bermasalah.</p>
            
            <div className="space-y-4 mb-6">
              <Input 
                type="text" 
                value={manualQuery}
                onChange={(e) => setManualQuery(e.target.value)}
                placeholder="Nama Anggota / NPA..."
                className="bg-slate-950 border-slate-800 text-white rounded-xl text-sm"
              />
              <Button onClick={handleManualCheckIn} className="w-full bg-[#0eb7b7] hover:bg-[#0a9494] text-white font-bold rounded-xl h-11">
                <UserCheck className="w-4 h-4 mr-2" /> Catat Presensi
              </Button>
            </div>

            <button onClick={() => setScanStatus("scanning")} className="text-xs font-bold text-slate-400 hover:text-white">
              Kembali ke Pemindaian QR Kamera
            </button>
          </div>
        )}

        {/* Success Check-in Overlay */}
        {scanStatus === "success" && (
          <div className="relative z-20 bg-white p-8 rounded-[30px] shadow-2xl max-w-sm w-full mx-4 text-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-xl font-black text-gray-900 mb-0.5">Presensi Verified!</h2>
            <p className="text-xs text-gray-500 mb-4">Poin Keaktifan Otomatis Terakumulasi (EV-02)</p>
            
            {logs[0] && (
              <div className="bg-gray-50 border rounded-2xl p-4 flex items-center gap-4 text-left mb-6">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage src={logs[0].avatar} />
                  <AvatarFallback>{logs[0].name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-gray-900 leading-tight text-sm">{logs[0].name}</p>
                  <p className="text-xs text-gray-500">{logs[0].npa}</p>
                  <div className="flex gap-2 mt-1.5">
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Safe Space OK
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button onClick={() => setScanStatus("scanning")} className="w-full h-11 bg-[#0eb7b7] hover:bg-[#0a9494] text-white rounded-xl font-bold text-sm">
              Scan Berikutnya
            </Button>
          </div>
        )}
      </div>

      {/* Slide-over Recent Check-in Log Panel */}
      {showLogDrawer && (
        <div className="absolute top-[140px] sm:top-20 right-4 left-4 sm:left-auto sm:right-6 z-30 sm:w-80 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <History className="w-4 h-4 text-[#0eb7b7]" /> Feed Presensi Terkini
            </h3>
            <button onClick={() => setShowLogDrawer(false)} className="text-xs font-bold text-slate-500 hover:text-white p-2 -mr-2">Tutup</button>
          </div>

          <div className="max-h-[50vh] sm:max-h-80 overflow-y-auto space-y-3 pr-1">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={log.avatar} />
                    <AvatarFallback>{log.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">{log.name}</p>
                    <p className="text-[10px] text-slate-400">{log.npa} • {log.time}</p>
                  </div>
                </div>
                <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full">
                  OK
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Control Bar */}
      <div className="py-4 sm:h-20 bg-slate-950 z-20 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:pb-2 border-t border-slate-900">
        <Button 
          variant="outline" 
          onClick={handleSimulateScan}
          className="w-full sm:w-auto rounded-full border-slate-700 bg-slate-900 text-white hover:bg-slate-800 hover:text-white text-xs font-bold px-6"
        >
          ⚡ Simulasikan Scan QR Sukses
        </Button>

        <Button 
          variant="ghost" 
          onClick={() => setScanStatus(prev => prev === "manual" ? "scanning" : "manual")}
          className="w-full sm:w-auto rounded-full text-slate-400 hover:text-white hover:bg-slate-900 text-xs font-bold px-6"
        >
          {scanStatus === "manual" ? "Gunakan Kamera" : "Cari / Presensi Manual"}
        </Button>
      </div>

    </div>
  );
}
