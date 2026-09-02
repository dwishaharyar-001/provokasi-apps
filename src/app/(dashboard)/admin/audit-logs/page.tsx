"use client";

import { useState } from "react";
import { 
  Search, ShieldAlert, CheckCircle2, FileSpreadsheet, Eye, LockKeyhole, 
  Trash2, ShieldCheck, Filter, Download, UserCheck, AlertTriangle, Clock, RefreshCw
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface AuditLogItem {
  id: string;
  timestamp: string;
  officerName: string;
  officerRole: string;
  action: "READ" | "EXPORT" | "UPDATE" | "ERASURE_REQUEST";
  targetMemberName: string;
  targetMemberNPA: string;
  ipAddress: string;
  legalPurpose: string;
  userAgent: string;
}

const mockAuditLogs: AuditLogItem[] = [
  {
    id: "log-1001",
    timestamp: "02 Sept 2026 19:22 WIB",
    officerName: "Siti Rahma",
    officerRole: "Bendahara Pengurus",
    action: "EXPORT",
    targetMemberName: "Semua DPT Aktif (120 Org)",
    targetMemberNPA: "DPT-2026-ALL",
    ipAddress: "180.252.12.99",
    legalPurpose: "Ekspor rekapitulasi data iuran tahunan untuk laporan keuangan.",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
  },
  {
    id: "log-1002",
    timestamp: "01 Sept 2026 14:05 WIB",
    officerName: "Budi Santoso",
    officerRole: "Pengawas Komunitas",
    action: "READ",
    targetMemberName: "Dwi Ishak M.",
    targetMemberNPA: "LIO-08013",
    ipAddress: "114.122.45.10",
    legalPurpose: "Pemeriksaan log presensi kegiatan untuk klarifikasi kasus banding keaktifan MR-04.",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
  },
  {
    id: "log-1003",
    timestamp: "28 Aug 2026 10:30 WIB",
    officerName: "Dwi Ishak M.",
    officerRole: "Anggota (Self)",
    action: "ERASURE_REQUEST",
    targetMemberName: "Dwi Ishak M. (Self)",
    targetMemberNPA: "LIO-08013",
    ipAddress: "36.85.11.204",
    legalPurpose: "Pengajuan permohonan Right to be Forgotten (PD-03).",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X)"
  }
];

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>(mockAuditLogs);
  const [selectedActionFilter, setSelectedActionFilter] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);

  const filteredLogs = logs.filter(log => {
    const matchesAction = selectedActionFilter === "Semua" || log.action === selectedActionFilter;
    const matchesSearch = log.officerName.toLowerCase().includes(searchQuery.toLowerCase()) || log.targetMemberName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAction && matchesSearch;
  });

  return (
    <div className="flex h-full w-full bg-white rounded-tl-[40px] shadow-sm my-4 mr-4 border overflow-hidden">
      
      {/* SECONDARY SIDEBAR (Audit Options) */}
      <div className="w-80 border-r bg-white flex flex-col p-6 space-y-6">
        <div>
          <span className="text-[10px] font-extrabold text-[#0eb7b7] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase">
            PD-02 Audit Trail
          </span>
          <h2 className="text-xl font-bold text-gray-900 mt-2">Log Audit UU PDP</h2>
          <p className="text-xs text-gray-500 mt-1">Pencatatan Permanen Akses Data</p>
        </div>

        {/* Filter Action */}
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Filter Tipe Aktivitas</h4>
          <div className="space-y-1">
            {["Semua", "READ", "EXPORT", "UPDATE", "ERASURE_REQUEST"].map((act) => (
              <button
                key={act}
                onClick={() => setSelectedActionFilter(act)}
                className={`w-full text-left text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                  selectedActionFilter === act ? "bg-[#0eb7b7] text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{act}</span>
                {selectedActionFilter === act && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* PDP Mandate Card */}
        <div className="bg-slate-900 text-white p-5 rounded-3xl space-y-2 shadow-md">
          <div className="flex items-center gap-2 text-teal-400">
            <LockKeyhole className="w-4 h-4" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest">KAPASITAS IMMUTABLE (PD-02)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Sesuai Pasal 39 UU PDP No. 27/2022, Pengendali Data wajib mencatat setiap aktivitas pengaksesan data pribadi secara permanen.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT AREA (Audit Trail Registry PD-02) */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd]">
        <div className="h-20 border-b flex items-center justify-between px-8 bg-white">
          <h1 className="text-xl font-black text-gray-900">Audit Trail Pengaksesan Data Anggota</h1>
          
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-[#0eb7b7]">
              <AvatarFallback className="bg-slate-900 text-white font-bold">DPO</AvatarFallback>
            </Avatar>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-900">Data Protection Officer</p>
              <p className="text-[10px] text-gray-400">Komite Kepatuhan PDP</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          
          <div className="flex justify-between items-center">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama pengurus atau anggota..." 
                className="w-full rounded-full bg-white border-gray-200 pl-10 text-xs focus-visible:ring-[#0eb7b7]" 
              />
            </div>

            <Button variant="outline" className="rounded-xl border-gray-200 text-xs font-bold flex gap-2">
              <Download className="w-4 h-4" /> Unduh Laporan Kepatuhan PDP
            </Button>
          </div>

          {/* Log Table */}
          <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-gray-900 text-base">Registri Log Audit Permanen</h3>
              <span className="text-xs font-bold bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                {filteredLogs.length} Aktivitas Tercatat
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b text-gray-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Waktu Log</th>
                    <th className="p-3">Pengakses (Pengurus/Admin)</th>
                    <th className="p-3">Aksi (PD-02)</th>
                    <th className="p-3">Target Anggota</th>
                    <th className="p-3">Alasan Hukum Pengaksesan</th>
                    <th className="p-3 text-right">Rincian</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-gray-800 font-medium">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="p-3 text-gray-500 font-bold">{log.timestamp}</td>
                      <td className="p-3">
                        <p className="font-bold text-gray-900">{log.officerName}</p>
                        <p className="text-[10px] text-gray-400">{log.officerRole}</p>
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                          log.action === "EXPORT" ? "bg-amber-100 text-amber-800" :
                          log.action === "ERASURE_REQUEST" ? "bg-rose-100 text-rose-800" :
                          log.action === "UPDATE" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="p-3">
                        <p className="font-bold text-gray-900">{log.targetMemberName}</p>
                        <p className="text-[10px] text-gray-400">{log.targetMemberNPA}</p>
                      </td>
                      <td className="p-3 text-gray-600 max-w-xs truncate">{log.legalPurpose}</td>
                      <td className="p-3 text-right">
                        <Button 
                          onClick={() => setSelectedLog(log)}
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs text-[#0eb7b7] font-bold"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" /> Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL AUDIT LOG DETAIL */}
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        {selectedLog && (
          <DialogContent className="sm:max-w-[480px] rounded-[30px] p-6 text-gray-900">
            <DialogTitle className="text-xl font-black mb-1 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0eb7b7]" /> Rincian Log Audit PDP (DC-02)
            </DialogTitle>
            <p className="text-xs text-gray-500 border-b pb-3 mb-4">ID Log: {selectedLog.id}</p>

            <div className="bg-gray-50 border rounded-2xl p-4 text-xs space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Waktu Eksekusi:</span>
                <span className="font-bold text-gray-900">{selectedLog.timestamp}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Pengakses Data:</span>
                <span className="font-bold text-gray-900">{selectedLog.officerName} ({selectedLog.officerRole})</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Alamat IP:</span>
                <span className="font-mono font-bold text-[#0eb7b7]">{selectedLog.ipAddress}</span>
              </div>
              <div className="space-y-1">
                <span className="text-gray-500 block">Alasan Hukum Pengaksesan:</span>
                <p className="font-medium text-gray-800 bg-white p-2.5 rounded-xl border text-[11px]">
                  {selectedLog.legalPurpose}
                </p>
              </div>
              <div className="space-y-1 pt-1">
                <span className="text-gray-500 block text-[10px]">User Agent String:</span>
                <p className="font-mono text-[9px] text-gray-500 bg-white p-2 rounded-lg border break-all">
                  {selectedLog.userAgent}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button onClick={() => setSelectedLog(null)} className="bg-gray-900 text-white font-bold rounded-xl text-xs px-5">
                Tutup
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
