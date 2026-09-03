"use client";

import { useState } from "react";
import { Search, Bell, Zap, MapPin, Calendar, Clock, Check, Users, ShieldAlert, ArrowRight, QrCode, Download, CameraOff, Award, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface EventItem {
  id: string;
  title: string;
  category: "Forum Berkala" | "Workshop" | "Seminar";
  date: string;
  time: string;
  location: string;
  isPaid: boolean;
  price: string;
  description: string;
  bannerGradient: string;
  committee: { name: string; role: string; avatar: string }[];
}

const mockEvents: EventItem[] = [
  {
    id: "ev-1",
    title: "Leading From Within (Batch 12)",
    category: "Forum Berkala",
    date: "18 Sept 2026",
    time: "14:00 - 17:00 WIB",
    location: "Hybrid (Zoom & HQ)",
    isPaid: false,
    price: "Gratis",
    description: "Forum bulanan khusus alumni LIO. Kita akan membahas kembali prinsip-prinsip dasar kepemimpinan internal, teknik pemetaan emosi, dan bagaimana memimpin diri sendiri sebelum memimpin tim.",
    bannerGradient: "from-[#0d4f54] to-[#0eb7b7]",
    committee: [
      { name: "Budi Santoso", role: "Ketua Panitia", avatar: "https://i.pravatar.cc/150?u=budi" },
      { name: "Siti Rahma", role: "Fasilitator Utama", avatar: "https://i.pravatar.cc/150?u=siti" },
      { name: "Ahmad Rizky", role: "Co-Host Zoom", avatar: "https://i.pravatar.cc/150?u=ahmad" },
    ]
  },
  {
    id: "ev-2",
    title: "Strategi Resolusi Konflik Komunitas",
    category: "Workshop",
    date: "05 Okt 2026",
    time: "09:00 - 16:00 WIB",
    location: "Offline (Auditorium Provokasi)",
    isPaid: true,
    price: "Rp 150.000",
    description: "Lokakarya intensif penanganan gesekan internal dan komunikasi non-vokatif dalam organisasi nirlaba. Termasuk simulasi studi kasus dan kit panduan mediasi.",
    bannerGradient: "from-[#1e3a8a] to-[#3b82f6]",
    committee: [
      { name: "Deni Pratama", role: "Ketua Panitia", avatar: "https://i.pravatar.cc/150?u=deni" },
      { name: "Maya Indah", role: "Fasilitator Mediasi", avatar: "https://i.pravatar.cc/150?u=maya" },
    ]
  },
  {
    id: "ev-3",
    title: "Simposium Transparansi Keuangan Nirlaba",
    category: "Seminar",
    date: "12 Nov 2026",
    time: "13:00 - 16:30 WIB",
    location: "Online (Zoom Webinar)",
    isPaid: false,
    price: "Gratis",
    description: "Seminar terbuka mengenai akuntabilitas publik, matriks persetujuan pengeluaran bertingkat, serta pelaporan keuangan komunitas sesuai AD/ART.",
    bannerGradient: "from-[#0f766e] to-[#14b8a6]",
    committee: [
      { name: "Eko Prasetyo", role: "Ketua Panitia", avatar: "https://i.pravatar.cc/150?u=eko" },
      { name: "Nadia Utami", role: "Moderator", avatar: "https://i.pravatar.cc/150?u=nadia" },
    ]
  }
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [activeEventId, setActiveEventId] = useState<string>("ev-1");
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [rsvpStep, setRsvpStep] = useState<"consent" | "ticket">("consent");
  const [safeSpaceAgreed, setSafeSpaceAgreed] = useState(false);
  const [mediaConsent, setMediaConsent] = useState<"opt-in" | "opt-out">("opt-in");

  const activeEvent = mockEvents.find(e => e.id === activeEventId) || mockEvents[0];

  const filteredEvents = mockEvents.filter(event => {
    if (selectedCategory === "Semua") return true;
    if (selectedCategory === "Gratis") return !event.isPaid;
    if (selectedCategory === "Berbayar") return event.isPaid;
    return event.category === selectedCategory;
  });

  const handleRegisterClick = () => {
    setSafeSpaceAgreed(false);
    setRsvpStep("consent");
    setIsRsvpOpen(true);
  };

  const handleConfirmRsvp = () => {
    if (!safeSpaceAgreed) return;
    setRsvpStep("ticket");
  };

  return (
    <div className="flex flex-col xl:flex-row min-h-full w-full bg-white rounded-xl lg:rounded-tl-[40px] shadow-sm my-2 lg:my-4 mr-0 lg:mr-4 border overflow-hidden">
      
      {/* 1. SECONDARY SIDEBAR (Event List) */}
      <div className="w-full xl:w-80 border-b xl:border-b-0 xl:border-r bg-white flex flex-col shrink-0 max-h-80 xl:max-h-none">
        <div className="p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Direktori Kegiatan</h2>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Cari kegiatan..." 
              className="w-full rounded-full bg-gray-50 border-gray-200 pl-10 text-sm focus-visible:ring-[#0eb7b7]" 
            />
          </div>
          
          {/* Category Tabs */}
          <div className="flex gap-1.5 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {["Semua", "Forum Berkala", "Workshop", "Seminar", "Gratis", "Berbayar"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? "bg-[#0eb7b7] text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredEvents.map((event) => {
            const isActive = event.id === activeEventId;
            return (
              <div 
                key={event.id}
                onClick={() => setActiveEventId(event.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all relative overflow-hidden border ${
                  isActive 
                    ? "bg-[#0eb7b7]/10 border-[#0eb7b7] shadow-sm" 
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                {isActive && <div className="absolute top-0 right-0 w-16 h-16 bg-[#0eb7b7]/10 rounded-full -mr-6 -mt-6"></div>}
                <div className="flex justify-between items-start mb-1">
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-[#0eb7b7]" : "text-gray-500"}`}>
                    {event.category}
                  </p>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${event.isPaid ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-700"}`}>
                    {event.price}
                  </span>
                </div>
                <h3 className={`font-bold leading-tight mb-2 ${isActive ? "text-gray-900" : "text-gray-800"}`}>
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-600 font-medium mb-1">
                  <Calendar className={`w-3 h-3 ${isActive ? "text-[#0eb7b7]" : "text-gray-400"}`} /> {event.date}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                  <MapPin className={`w-3 h-3 ${isActive ? "text-[#0eb7b7]" : "text-gray-400"}`} /> {event.location}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA (Event Details) */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd]">
        <div className="h-20 border-b flex items-center justify-end px-8 bg-white">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-amber-500 cursor-pointer hover:bg-amber-50 p-2 rounded-full transition-colors">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div className="relative cursor-pointer hover:bg-gray-50 p-2 rounded-full transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex items-center gap-3 pl-4 border-l cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">Dwi Ishak M.</p>
                <p className="text-xs text-gray-500 font-medium">Anggota Aktif (Batch 8)</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-[#0eb7b7] transition-all">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>DI</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-3xl mx-auto">
            {/* Event Banner */}
            <div className={`w-full h-48 bg-gradient-to-r ${activeEvent.bannerGradient} rounded-3xl mb-8 relative overflow-hidden flex items-center p-8 shadow-md`}>
               <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white opacity-10 rounded-full"></div>
               <div className="relative z-10 text-white">
                 <div className="flex gap-2 items-center mb-2">
                   <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest backdrop-blur-md uppercase">
                     {activeEvent.category}
                   </span>
                   <span className="bg-emerald-400/30 border border-emerald-300/40 text-emerald-100 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                     {activeEvent.price}
                   </span>
                 </div>
                 <h1 className="text-3xl font-extrabold mt-1">{activeEvent.title}</h1>
                 <p className="opacity-90 mt-1 text-sm font-medium flex items-center gap-2">
                   <Sparkles className="w-4 h-4 text-amber-300" /> Syarat Keaktifan Komunitas (EV-01)
                 </p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-1 lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Deskripsi Agenda</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {activeEvent.description}
                  </p>
                </div>

                {/* EV-04: Committee & Facilitator Roster Display */}
                <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-3">
                  <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#0eb7b7]" /> Panitia & Fasilitator Bertugas (EV-04)
                  </h4>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    {activeEvent.committee.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 border">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={item.avatar} />
                          <AvatarFallback>{item.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-bold text-gray-800 leading-tight">{item.name}</p>
                          <p className="text-[10px] font-bold text-[#0eb7b7] uppercase mt-0.5">{item.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* EV-03: Safe Space Protocol Summary */}
                <div className="bg-teal-50/60 border border-teal-100 rounded-2xl p-4 flex gap-3 items-start">
                  <ShieldAlert className="w-5 h-5 text-[#0eb7b7] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider">Safe Space & Confidentiality Protocol</h4>
                    <p className="text-xs text-teal-800/80 mt-1 leading-relaxed">
                      Kegiatan ini menerapkan standar persetujuan digital *Safe Space*. Peserta diwajibkan menyetujui kerahasiaan diskusi sebelum mendapatkan akses QR Ticket.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar Info Card */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-2xl p-5 border shadow-sm">
                  <h4 className="text-sm font-bold text-gray-800 mb-4 border-b pb-2">Detail Pelaksanaan</h4>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Calendar className="w-5 h-5 text-[#0eb7b7] shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-gray-800">{activeEvent.date}</p>
                        <p className="text-xs text-gray-500">Tanggal Kegiatan</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="w-5 h-5 text-[#0eb7b7] shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-gray-800">{activeEvent.time}</p>
                        <p className="text-xs text-gray-500">Waktu Pelaksanaan</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <MapPin className="w-5 h-5 text-[#0eb7b7] shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-gray-800">{activeEvent.location}</p>
                        <p className="text-xs text-gray-500">Lokasi / Medium</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleRegisterClick} 
                    className="w-full mt-6 bg-[#0eb7b7] hover:bg-[#0a9494] text-white rounded-xl shadow-lg shadow-teal-500/20 py-6 font-bold text-md flex items-center justify-center gap-2"
                  >
                    <Award className="w-5 h-5" /> Daftar & Ambil Tiket
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RIGHT SIDEBAR (Your Schedule) */}
      <div className="w-80 border-l bg-[#fafcfc] flex flex-col">
        <div className="p-6 border-b">
           <h3 className="font-bold text-gray-800 text-lg">Agenda Terdaftar</h3>
        </div>
        <div className="p-4 overflow-y-auto space-y-4">
           {/* RSVP'd Event */}
           <div className="bg-white p-4 rounded-xl border shadow-sm relative overflow-hidden group cursor-pointer hover:border-[#0eb7b7]">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0eb7b7]"></div>
             <div className="flex justify-between items-start mb-1">
               <p className="text-[10px] font-bold text-[#0eb7b7] uppercase">Terdaftar (Peserta)</p>
               <span className="text-xs text-gray-400 font-semibold">18 Sep</span>
             </div>
             <h4 className="font-bold text-gray-800 text-sm mb-1">Leading From Within</h4>
             <p className="text-xs text-gray-500 flex items-center gap-1">
               <Clock className="w-3 h-3" /> 14:00 - 17:00 WIB
             </p>
             <div className="mt-3 text-right flex justify-between items-center">
               <Button onClick={() => { setRsvpStep("ticket"); setIsRsvpOpen(true); }} variant="outline" size="sm" className="h-7 text-xs font-bold rounded-lg border-[#0eb7b7] text-[#0eb7b7] hover:bg-teal-50">
                 <QrCode className="w-3 h-3 mr-1" /> QR Tiket
               </Button>
               <span className="text-xs font-bold text-[#0eb7b7] flex items-center justify-end gap-1 group-hover:translate-x-1 transition-transform">
                 Detail <ArrowRight className="w-3 h-3"/>
               </span>
             </div>
           </div>
        </div>
      </div>

      {/* MODAL RSVP & TICKET */}
      <Dialog open={isRsvpOpen} onOpenChange={setIsRsvpOpen}>
        <DialogContent className="sm:max-w-[480px] rounded-[30px] p-0 overflow-hidden border-none shadow-2xl">
          {rsvpStep === "consent" && (
            <>
              <div className="p-8 pb-4">
                <DialogTitle className="text-2xl font-black text-gray-900 mb-1">Pendaftaran & Consent</DialogTitle>
                <p className="text-xs text-[#0eb7b7] font-bold uppercase tracking-wider mb-2">EV-03 Safe Space Enforcement</p>
                <p className="text-sm text-gray-500 font-medium border-b pb-4">{activeEvent.title}</p>
                
                <div className="mt-6 space-y-5">
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                    <h4 className="flex items-center gap-2 font-bold text-amber-800 mb-2 text-sm">
                      <ShieldAlert className="w-4 h-4" /> Protokol Ruang Aman (Safe Space)
                    </h4>
                    <p className="text-xs text-amber-900/80 mb-4 leading-relaxed">
                      Setiap pembahasan dalam forum ini bersifat rahasia (*Non-Disclosure*). Anda menyetujui untuk tidak merekam atau membagikan diskusi internal tanpa izin tertulis dari Pengurus.
                    </p>
                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                      <input 
                        type="checkbox" 
                        checked={safeSpaceAgreed}
                        onChange={(e) => setSafeSpaceAgreed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer accent-amber-600" 
                      />
                      <span className="text-xs font-bold text-amber-900">
                        Saya membaca dan menyetujui Protokol Kerahasiaan Safe Space.
                      </span>
                    </label>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                     <h4 className="flex items-center gap-2 font-bold text-gray-800 mb-2 text-sm">
                      <CameraOff className="w-4 h-4" /> Persetujuan Publikasi Media (Opt-In/Opt-Out)
                    </h4>
                    <p className="text-xs text-gray-600 mb-4">
                      Opsi publikasi foto/dokumentasi kegiatan pada saluran publik Komunitas Provokasi:
                    </p>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input 
                          type="radio" 
                          name="media_consent" 
                          checked={mediaConsent === "opt-in"}
                          onChange={() => setMediaConsent("opt-in")}
                          className="accent-[#0eb7b7] w-4 h-4" 
                        />
                        <span className="text-xs font-bold text-gray-700">Bersedia (Opt-In)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input 
                          type="radio" 
                          name="media_consent" 
                          checked={mediaConsent === "opt-out"}
                          onChange={() => setMediaConsent("opt-out")}
                          className="accent-[#0eb7b7] w-4 h-4" 
                        />
                        <span className="text-xs font-bold text-gray-700">Keberatan (Opt-Out)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 pt-4 bg-gray-50 flex justify-end gap-3 border-t mt-4">
                <Button variant="outline" onClick={() => setIsRsvpOpen(false)} className="rounded-xl font-bold">Batal</Button>
                <Button 
                  disabled={!safeSpaceAgreed}
                  onClick={handleConfirmRsvp} 
                  className={`rounded-xl font-bold transition-all ${
                    safeSpaceAgreed 
                      ? "bg-[#0eb7b7] hover:bg-[#0a9494] text-white shadow-md" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Konfirmasi & Terbitkan Tiket
                </Button>
              </div>
            </>
          )}

          {rsvpStep === "ticket" && (
            <div className="p-0 text-center relative">
              <div className="bg-[#0d4f54] text-white p-8 pb-12 rounded-b-[40px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                <DialogTitle className="text-xs font-bold tracking-widest uppercase opacity-80 mb-2">E-TICKET DIGITAL (EV-02)</DialogTitle>
                <h2 className="text-2xl font-black mb-1">{activeEvent.title}</h2>
                <p className="text-teal-200 text-sm font-medium">{activeEvent.date} • {activeEvent.time}</p>
              </div>
              
              <div className="bg-white mx-8 -mt-8 p-6 rounded-3xl shadow-xl border relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="p-4 border-2 border-dashed border-[#0eb7b7] rounded-2xl inline-block bg-teal-50/30">
                    <QrCode className="w-40 h-40 text-gray-900" />
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Nama Peserta Terdaftar</p>
                <p className="font-bold text-gray-900 text-lg">Dwi Ishak M.</p>
                <div className="mt-3 flex justify-center gap-2">
                  <span className="text-[10px] font-bold px-3 py-1 bg-gray-100 text-gray-700 rounded-full uppercase">NPA: LIO-08013</span>
                  <span className="text-[10px] font-bold px-3 py-1 bg-teal-50 border border-teal-200 text-[#0eb7b7] rounded-full uppercase flex items-center gap-1">
                    <Check className="w-3 h-3" /> Safe Space Verified
                  </span>
                </div>
              </div>

              <div className="p-8 pt-6">
                <Button onClick={() => setIsRsvpOpen(false)} className="w-full bg-[#0eb7b7] hover:bg-[#0a9494] text-white rounded-xl font-bold h-12 flex items-center justify-center gap-2 shadow-md">
                  <Download className="w-4 h-4" /> Simpan E-Ticket QR
                </Button>
                <p className="text-xs text-gray-400 mt-3">Tunjukkan QR Code ini pada scanner panitia di lokasi / pintu masuk.</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
