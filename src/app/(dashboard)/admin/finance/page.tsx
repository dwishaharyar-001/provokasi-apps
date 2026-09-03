"use client";

import { useState } from "react";
import { Search, Bell, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, FileText, Check, X, Building, ArrowUpRight, Lock, UserCheck, DollarSign, Users, Award, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ExpenseRequest {
  id: string;
  title: string;
  amount: number;
  amountFormatted: string;
  tier: "Batas I" | "Batas II" | "Batas III" | "Mandat Musyawarah";
  applicant: string;
  applicantRole: string;
  vendorName: string;
  isAffiliatedParty: boolean; // FN-04 Flagging
  affiliatedDetails?: string;
  status: "Pending" | "Approved" | "Rejected";
  approvalsCount: number;
  approvalsRequired: number;
  requiredRoles: string[];
}

const mockExpenses: ExpenseRequest[] = [
  {
    id: "exp-101",
    title: "Pengadaan Spanduk & Konsumsi LIO Batch 12",
    amount: 8500000,
    amountFormatted: "Rp 8.500.000",
    tier: "Batas I",
    applicant: "Budi Santoso",
    applicantRole: "Ketua Panitia Acara",
    vendorName: "CV Media Printing",
    isAffiliatedParty: false,
    status: "Pending",
    approvalsCount: 0,
    approvalsRequired: 1,
    requiredRoles: ["Ketua Umum / Dir. Pelaksana"]
  },
  {
    id: "exp-102",
    title: "Sewa Gedung Auditorium & Sound System PKS",
    amount: 35000000,
    amountFormatted: "Rp 35.000.000",
    tier: "Batas II",
    applicant: "Siti Rahma",
    applicantRole: "Bendahara Pengurus",
    vendorName: "PT Rahma Event Logistics",
    isAffiliatedParty: true, // FN-04 Conflict of Interest Detected!
    affiliatedDetails: "Vendor milik Siti Rahma (Bendahara). Otomatis diisolasi dari hak approval!",
    status: "Pending",
    approvalsCount: 1,
    approvalsRequired: 2,
    requiredRoles: ["Ketua Umum", "Sekretaris (Siti Rahma - LOCKOUT)"]
  },
  {
    id: "exp-103",
    title: "Pengembangan Core Portal Komunitas & Vault (Hibah)",
    amount: 120000000,
    amountFormatted: "Rp 120.000.000",
    tier: "Batas III",
    applicant: "Ahmad Rizky",
    applicantRole: "Direktur IT",
    vendorName: "PT Tech Inovasi Nirlaba",
    isAffiliatedParty: false,
    status: "Pending",
    approvalsCount: 2,
    approvalsRequired: 3,
    requiredRoles: ["Ketua Umum", "Bendahara", "Persetujuan Tertulis Pengawas"]
  }
];

export default function AdminFinancePage() {
  const [expenses, setExpenses] = useState<ExpenseRequest[]>(mockExpenses);
  const [activeTierFilter, setActiveTierFilter] = useState<string>("Semua");
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>("exp-102");

  const activeExpense = expenses.find(e => e.id === selectedExpenseId) || expenses[0];

  const filteredExpenses = expenses.filter(e => {
    if (activeTierFilter !== "Semua" && e.tier !== activeTierFilter) return false;
    return true;
  });

  const handleApproveExpense = (id: string) => {
    setExpenses(prev => prev.map(e => {
      if (e.id !== id) return e;
      const nextCount = e.approvalsCount + 1;
      const isComplete = nextCount >= e.approvalsRequired;
      return {
        ...e,
        approvalsCount: nextCount,
        status: isComplete ? "Approved" : "Pending"
      };
    }));
  };

  const handleRejectExpense = (id: string) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, status: "Rejected" } : e));
  };

  return (
    <div className="flex flex-col xl:flex-row min-h-full w-full bg-white rounded-xl lg:rounded-tl-[40px] shadow-sm my-2 lg:my-4 mr-0 lg:mr-4 border overflow-hidden">
      
      {/* SECONDARY SIDEBAR (Expense Tiers & Requests) */}
      <div className="w-full xl:w-80 border-b xl:border-b-0 xl:border-r bg-white flex flex-col shrink-0">
        <div className="p-4 sm:p-6 border-b bg-teal-50/50">
          <span className="text-[10px] font-extrabold text-[#0eb7b7] bg-teal-100 border border-teal-200 px-2.5 py-1 rounded-full uppercase">
            FN-03 & FN-04 Matrix Console
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-2">Matriks Otorisasi</h2>
          <p className="text-xs text-gray-500 mt-1">Approval Pengeluaran Nirlaba</p>
        </div>

        <div className="p-4 border-b space-y-2">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Filter Batas Otorisasi</h4>
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {["Semua", "Batas I", "Batas II", "Batas III"].map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveTierFilter(tier)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors whitespace-nowrap ${
                  activeTierFilter === tier ? "bg-[#0eb7b7] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredExpenses.map((exp) => {
            const isActive = exp.id === selectedExpenseId;
            return (
              <div 
                key={exp.id}
                onClick={() => setSelectedExpenseId(exp.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border relative ${
                  isActive ? "bg-[#0eb7b7]/10 border-[#0eb7b7] shadow-sm" : "border-transparent hover:bg-gray-50 opacity-80"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-900 text-teal-300 rounded-full uppercase">
                    {exp.tier}
                  </span>
                  {exp.isAffiliatedParty && (
                    <span className="text-[9px] font-black px-2 py-0.5 bg-rose-100 text-rose-700 rounded-full uppercase flex items-center gap-0.5">
                      <AlertTriangle className="w-2.5 h-2.5 text-rose-600" /> Flagged FN-04
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1">{exp.title}</h4>
                <p className="text-xs font-black text-[#0eb7b7]">{exp.amountFormatted}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT AREA (Multi-Tier Approval Details FN-03 & Flagging FN-04) */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd]">
        <div className="h-20 border-b flex items-center justify-between px-8 bg-white">
          <h1 className="text-xl font-black text-gray-900">Konsol Matriks Otorisasi Pengeluaran</h1>
          
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-[#0eb7b7]">
              <AvatarFallback className="bg-slate-900 text-white font-bold">BK</AvatarFallback>
            </Avatar>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-900">Bendahara Komunitas</p>
              <p className="text-[10px] text-gray-400">Tim Keuangan Nirlaba</p>
            </div>
          </div>
        </div>

        {activeExpense ? (
          <div className="flex-1 overflow-y-auto p-10 space-y-6 max-w-4xl mx-auto w-full">
            
            {/* Header Info */}
            <div className="bg-white border rounded-3xl p-6 shadow-sm flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-extrabold px-3 py-1 bg-slate-900 text-teal-300 rounded-full uppercase">
                    {activeExpense.tier}
                  </span>
                  <span className="text-xs font-bold text-gray-500">ID: {activeExpense.id}</span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mt-1">{activeExpense.title}</h2>
                <p className="text-xs text-gray-500 mt-0.5">Pengaju: <strong className="text-gray-800">{activeExpense.applicant}</strong> ({activeExpense.applicantRole})</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400 font-bold uppercase">Nominal Pengeluaran</p>
                <p className="text-2xl font-black text-[#0eb7b7]">{activeExpense.amountFormatted}</p>
              </div>
            </div>

            {/* FN-04 AFFILIATED PARTY WARNING BANNER */}
            {activeExpense.isAffiliatedParty && (
              <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-5 flex gap-4 items-start text-xs text-rose-900 shadow-sm animate-pulse">
                <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-rose-950 uppercase tracking-wider">
                      FN-04 PERINGATAN TRANSAKSI PIHAK TERAFILIASI (CONFLICT OF INTEREST DETECTED)
                    </h4>
                  </div>
                  <p className="font-semibold text-rose-900 leading-relaxed">
                    {activeExpense.affiliatedDetails}
                  </p>
                  <p className="text-[11px] text-rose-800 pt-1 font-bold">
                    Sistem otomatis mengisolasi (*Lockout*) pengaju/pejabat terkait dari hak memberikan persetujuan pada transaksi ini!
                  </p>
                </div>
              </div>
            )}

            {/* FN-03 MULTI-TIER APPROVAL ROSTER */}
            <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Matriks Syarat Persetujuan (FN-03 Tier Matrix)
              </h3>

              <div className="space-y-3">
                {activeExpense.requiredRoles.map((role, idx) => {
                  const isLockout = role.includes("LOCKOUT");
                  return (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border bg-gray-50/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          isLockout ? "bg-rose-100 text-rose-600 border border-rose-300" : "bg-teal-100 text-[#0eb7b7]"
                        }`}>
                          {isLockout ? <Lock className="w-4 h-4" /> : idx + 1}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{role}</p>
                          <p className="text-[10px] text-gray-400">
                            {isLockout ? "Diisolasi oleh Sistem FN-04 (Hanya Pejabat Non-Afiliasi yang Sah)" : "Otorisasi Resmi Nirlaba"}
                          </p>
                        </div>
                      </div>

                      <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase ${
                        isLockout ? "bg-rose-100 text-rose-800" :
                        idx < activeExpense.approvalsCount ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {isLockout ? "ISOLATED" : idx < activeExpense.approvalsCount ? "Approved" : "Menunggu"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress Count */}
              <div className="pt-2 flex justify-between items-center text-xs font-bold text-gray-700">
                <span>Progress Persetujuan:</span>
                <span className="text-[#0eb7b7]">{activeExpense.approvalsCount} dari {activeExpense.approvalsRequired} Otorisasi Terpenuhi</span>
              </div>
            </div>

            {/* Approval Decision Controls */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">Eksekusi Otorisasi Keuangan</h3>
              
              <div className="flex gap-3">
                <Button 
                  onClick={() => handleApproveExpense(activeExpense.id)}
                  disabled={activeExpense.status === "Approved"}
                  className={`flex-1 font-bold rounded-xl h-11 text-xs flex gap-2 ${
                    activeExpense.status === "Approved" 
                      ? "bg-green-600 text-white cursor-not-allowed" 
                      : "bg-emerald-600 hover:bg-emerald-500 text-white"
                  }`}
                >
                  <Check className="w-4 h-4" /> {activeExpense.status === "Approved" ? "Persetujuan Lengkap & Disahkan" : "Berikan Otorisasi Persetujuan"}
                </Button>

                <Button 
                  onClick={() => handleRejectExpense(activeExpense.id)}
                  variant="outline" 
                  className="flex-1 border-slate-700 bg-slate-950 text-red-400 hover:bg-slate-800 hover:text-red-300 font-bold rounded-xl h-11 text-xs flex gap-2"
                >
                  <X className="w-4 h-4" /> Tolak Pengeluaran
                </Button>
              </div>
            </div>

          </div>
        ) : null}
      </div>

    </div>
  );
}
