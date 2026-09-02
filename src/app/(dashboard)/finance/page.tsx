"use client";

import { useState } from "react";
import { Wallet, CreditCard, ShieldCheck, CheckCircle2, Clock, FileText, ArrowRight, Download, QrCode, AlertCircle, HelpCircle, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface Transaction {
  id: string;
  title: string;
  type: "Iuran" | "Tiket";
  amount: string;
  date: string;
  status: "Lunas" | "Menunggu" | "Dispensasi";
  receiptNo: string;
}

const mockTransactions: Transaction[] = [
  { id: "tx-1", title: "Iuran Anggota Tahunan 2026", type: "Iuran", amount: "Rp 300.000", date: "15 Jan 2026", status: "Lunas", receiptNo: "INV/2026/01/089" },
  { id: "tx-2", title: "Tiket Workshop Resolusi Konflik", type: "Tiket", amount: "Rp 150.000", date: "02 Okt 2026", status: "Menunggu", receiptNo: "INV/2026/10/012" },
  { id: "tx-3", title: "Iuran Anggota Tahunan 2025", type: "Iuran", amount: "Rp 300.000", date: "10 Feb 2025", status: "Dispensasi", receiptNo: "WVR/2025/02/004" }
];

export default function MemberFinancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isWaiverModalOpen, setIsWaiverModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Fee Waiver Form
  const [waiverReason, setWaiverReason] = useState("");
  const [waiverSubmitted, setWaiverSubmitted] = useState(false);

  const handlePayNow = () => {
    setPaymentSuccess(true);
    setTransactions(prev => prev.map(t => t.id === "tx-2" ? { ...t, status: "Lunas" } : t));
  };

  const handleWaiverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waiverReason.trim()) return;
    setWaiverSubmitted(true);
  };

  return (
    <div className="flex h-full w-full bg-white rounded-tl-[40px] shadow-sm my-4 mr-4 border overflow-hidden">
      
      {/* 1. LEFT SIDEBAR - Financial Overview */}
      <div className="w-80 border-r bg-[#fafcfc] flex flex-col p-6 space-y-6">
        <div>
          <span className="text-[10px] font-extrabold text-[#0eb7b7] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Modul 4: Keuangan
          </span>
          <h2 className="text-xl font-black text-gray-900 mt-2">Portal Keuangan</h2>
          <p className="text-xs text-gray-500 mt-1">Status Iuran & Pembayaran (FN-01)</p>
        </div>

        {/* Dues Status Card */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-extrabold text-teal-400 uppercase tracking-widest">
              IURAN TAHUNAN 2026
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>

          <div>
            <p className="text-2xl font-black text-white">TERBAYAR LUNAS</p>
            <p className="text-xs text-slate-400 mt-0.5">Rp 300.000 / Tahun</p>
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
            <span>Metode:</span>
            <span className="text-teal-300 font-bold">Payment Gateway Resmi</span>
          </div>
        </div>

        {/* Fee Waiver Card (FN-02) */}
        <div className="bg-white border border-teal-100 rounded-2xl p-4 space-y-3 shadow-sm">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-[#0eb7b7]" />
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Dispensasi Iuran (FN-02)</h4>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Komunitas Provokasi menyediakan fasilitas dispensasi bagi anggota tanpa menghapus hak keaktifan & hak suara.
          </p>
          <Button 
            onClick={() => setIsWaiverModalOpen(true)}
            variant="outline" 
            className="w-full text-xs font-bold rounded-xl h-9 border-[#0eb7b7] text-[#0eb7b7] hover:bg-teal-50"
          >
            Ajukan Dispensasi Iuran
          </Button>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA - Transactions & Payment Gateway FN-01 */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd] overflow-y-auto p-10">
        <div className="max-w-4xl mx-auto space-y-8 w-full">
          
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs font-bold text-[#0eb7b7] uppercase tracking-widest">FN-01 Payment Gateway Integration</p>
              <h1 className="text-2xl font-black text-gray-900">Riwayat & Pembayaran Resmi</h1>
            </div>

            <Button 
              onClick={() => setIsPaymentModalOpen(true)}
              className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white font-bold text-xs h-11 px-5 rounded-xl shadow-md flex gap-2"
            >
              <CreditCard className="w-4 h-4" /> Bayar Tagihan Pendekar (VA/QRIS)
            </Button>
          </div>

          {/* Account Direct Transfer Warning */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex gap-3 items-start text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-0.5">Penegakan Rekening Resmi Nirlaba (FN-01)</h4>
              <p className="opacity-90 leading-relaxed">
                Sesuai AD/ART, seluruh pembayaran iuran dan tiket disalurkan **langsung ke rekening bank resmi Perkumpulan Komunitas Provokasi** (tanpa perantara rekening pribadi pengurus).
              </p>
            </div>
          </div>

          {/* Transaction History Table */}
          <div className="bg-white border rounded-3xl shadow-sm overflow-hidden space-y-4 p-6">
            <h3 className="font-extrabold text-gray-900 text-base">Riwayat Transaksi Keuangan</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b text-gray-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">No. Invoice</th>
                    <th className="p-3">Deskripsi Tagihan</th>
                    <th className="p-3">Tipe</th>
                    <th className="p-3">Nominal</th>
                    <th className="p-3">Tanggal</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Kwitansi</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-gray-800 font-medium">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50">
                      <td className="p-3 font-mono font-bold text-gray-600">{tx.receiptNo}</td>
                      <td className="p-3 font-bold text-gray-900">{tx.title}</td>
                      <td className="p-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                          {tx.type}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-gray-900">{tx.amount}</td>
                      <td className="p-3 text-gray-500">{tx.date}</td>
                      <td className="p-3">
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                          tx.status === "Lunas" ? "bg-green-100 text-green-800" :
                          tx.status === "Dispensasi" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-[#0eb7b7] font-bold">
                          <Download className="w-3.5 h-3.5 mr-1" /> PDF
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

      {/* MODAL PAYMENT GATEWAY SIMULATION (FN-01) */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-[460px] rounded-[30px] p-8 text-center">
          <DialogTitle className="text-sm font-bold uppercase tracking-widest text-[#0eb7b7] mb-1">
            PAYMENT GATEWAY RESMI PERKUMPULAN (FN-01)
          </DialogTitle>
          <h2 className="text-xl font-black text-gray-900 mb-1">Pembayaran Tagihan Tiket</h2>
          <p className="text-xs text-gray-500 mb-6">Rekening Tujuan: **Bank Mandiri - Perkumpulan Provokasi (123-00-998877-1)**</p>

          {!paymentSuccess ? (
            <div className="space-y-6">
              <div className="bg-gray-50 border rounded-2xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Tagihan:</span>
                  <span className="font-bold text-gray-900">Tiket Workshop Resolusi Konflik</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Total Nominal:</span>
                  <span className="font-extrabold text-[#0eb7b7] text-sm">Rp 150.000</span>
                </div>
                <div className="pt-1">
                  <span className="text-gray-500 block mb-1">Kode Virtual Account / QRIS:</span>
                  <div className="p-3 border-2 border-dashed border-[#0eb7b7] rounded-xl text-center bg-teal-50/50">
                    <QrCode className="w-24 h-24 mx-auto text-gray-900 mb-1" />
                    <p className="font-mono font-bold text-gray-900 text-sm">8801 0826 9918 001</p>
                  </div>
                </div>
              </div>

              <Button onClick={handlePayNow} className="w-full bg-[#0eb7b7] hover:bg-[#0a9494] text-white font-bold rounded-xl h-11 text-xs">
                Simulasikan Pembayaran Berhasil
              </Button>
            </div>
          ) : (
            <div className="py-4 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Pembayaran Lunas!</h3>
              <p className="text-xs text-gray-500">
                Dana sebesar **Rp 150.000** telah diterima langsung pada rekening resmi Perkumpulan. Kwitansi resmi telah diterbitkan.
              </p>
              <Button onClick={() => { setIsPaymentModalOpen(false); setPaymentSuccess(false); }} className="bg-[#0eb7b7] text-white font-bold rounded-xl text-xs px-6">
                Selesai
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* MODAL FEE WAIVER REQUEST (FN-02) */}
      <Dialog open={isWaiverModalOpen} onOpenChange={setIsWaiverModalOpen}>
        <DialogContent className="sm:max-w-[480px] rounded-[30px] p-6">
          <DialogTitle className="text-xl font-black text-gray-900 mb-1 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#0eb7b7]" /> Pengajuan Dispensasi Iuran (FN-02)
          </DialogTitle>
          <p className="text-xs text-gray-500 border-b pb-3 mb-4">
            Pencatatan pembebasan iuran bagi anggota tanpa mengurangi hak keaktifan & hak suara DPT (MR-03).
          </p>

          {!waiverSubmitted ? (
            <form onSubmit={handleWaiverSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Alasan Pengajuan Dispensasi</label>
                <textarea 
                  value={waiverReason}
                  onChange={(e) => setWaiverReason(e.target.value)}
                  required
                  className="w-full h-28 rounded-xl bg-gray-50 border border-gray-200 p-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#0eb7b7] resize-none"
                  placeholder="Jelaskan secara singkat latar belakang permohonan dispensasi..."
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed">
                <p className="font-bold mb-1">Jaminan AD/ART (FN-02):</p>
                <p className="text-[11px] opacity-90">
                  Anggota yang mendapatkan dispensasi iuran **TETAP MEMILIKI STATUS ANGGOTA AKTIF & HAK SUARA DPT UTUH** tanpa diskriminasi.
                </p>
              </div>

              <div className="pt-2 border-t flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsWaiverModalOpen(false)} className="rounded-xl text-xs font-bold">Batal</Button>
                <Button type="submit" className="bg-[#0eb7b7] hover:bg-[#0a9494] text-white font-bold rounded-xl text-xs px-5">
                  Kirim Permohonan Waiver
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Permohonan Dispensasi Terkirim</h3>
              <p className="text-xs text-gray-500">
                Pengajuan Anda sedang ditinjau oleh Bendahara Komunitas. Hak suara Anda tetap terjaga.
              </p>
              <Button onClick={() => { setIsWaiverModalOpen(false); setWaiverSubmitted(false); }} className="bg-[#0eb7b7] text-white font-bold rounded-xl text-xs px-6">
                Tutup
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
