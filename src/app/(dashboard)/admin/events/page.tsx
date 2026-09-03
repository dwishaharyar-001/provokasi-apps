"use client";

import { useState } from "react";
import { Search, Bell, Calendar, Plus, Users, QrCode, MoreVertical, Edit, MapPin, UserPlus, CheckCircle2, ShieldCheck, X, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";

interface CommitteeMember {
  id: string;
  name: string;
  npa: string;
  role: "Ketua Panitia" | "Fasilitator Utama" | "Co-Host Zoom" | "Speaker";
  avatar: string;
}

interface AdminEvent {
  id: string;
  title: string;
  month: string;
  day: string;
  status: "Published" | "Draft";
  category: string;
  location: string;
  attendeesCount: number;
  maxCapacity: number;
  committee: CommitteeMember[];
}

const initialAdminEvents: AdminEvent[] = [
  {
    id: "ev-1",
    title: "Leading From Within (Batch 12)",
    month: "Sep",
    day: "18",
    status: "Published",
    category: "Forum Berkala",
    location: "Hybrid (Auditorium & Zoom)",
    attendeesCount: 45,
    maxCapacity: 50,
    committee: [
      { id: "m-1", name: "Budi Santoso", npa: "LIO-08001", role: "Ketua Panitia", avatar: "https://i.pravatar.cc/150?u=budi" },
      { id: "m-2", name: "Siti Rahma", npa: "LIO-08044", role: "Fasilitator Utama", avatar: "https://i.pravatar.cc/150?u=siti" },
      { id: "m-3", name: "Ahmad Rizky", npa: "LIO-09012", role: "Co-Host Zoom", avatar: "https://i.pravatar.cc/150?u=ahmad" }
    ]
  },
  {
    id: "ev-2",
    title: "Strategi Resolusi Konflik Komunitas",
    month: "Okt",
    day: "05",
    status: "Draft",
    category: "Workshop Terbuka",
    location: "Auditorium Provokasi",
    attendeesCount: 0,
    maxCapacity: 60,
    committee: [
      { id: "m-4", name: "Deni Pratama", npa: "LIO-07088", role: "Ketua Panitia", avatar: "https://i.pravatar.cc/150?u=deni" }
    ]
  }
];

const availableMembers = [
  { id: "m-10", name: "Rina Wijaya", npa: "LIO-08102", avatar: "https://i.pravatar.cc/150?u=rina" },
  { id: "m-11", name: "Fajar Nugraha", npa: "LIO-08115", avatar: "https://i.pravatar.cc/150?u=fajar" },
  { id: "m-12", name: "Dewi Lestari", npa: "LIO-09044", avatar: "https://i.pravatar.cc/150?u=dewi" },
];

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>(initialAdminEvents);
  const [activeManageEventId, setActiveManageEventId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<CommitteeMember["role"]>("Fasilitator Utama");
  const [searchTerm, setSearchTerm] = useState("");

  const activeEvent = events.find(e => e.id === activeManageEventId);

  const handleAddCommittee = (member: typeof availableMembers[0]) => {
    if (!activeManageEventId) return;

    setEvents(prev => prev.map(ev => {
      if (ev.id !== activeManageEventId) return ev;
      if (ev.committee.some(c => c.id === member.id)) return ev;
      return {
        ...ev,
        committee: [
          ...ev.committee,
          { id: member.id, name: member.name, npa: member.npa, role: selectedRole, avatar: member.avatar }
        ]
      };
    }));
  };

  const handleRemoveCommittee = (memberId: string) => {
    if (!activeManageEventId) return;
    setEvents(prev => prev.map(ev => {
      if (ev.id !== activeManageEventId) return ev;
      return {
        ...ev,
        committee: ev.committee.filter(c => c.id !== memberId)
      };
    }));
  };

  const filteredMembers = availableMembers.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.npa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col xl:flex-row min-h-full w-full bg-white rounded-xl lg:rounded-tl-[40px] shadow-sm my-2 lg:my-4 mr-0 lg:mr-4 border overflow-hidden">
      
      {/* SECONDARY SIDEBAR (Event Filters) */}
      <div className="w-full xl:w-80 border-b xl:border-b-0 xl:border-r bg-white flex flex-col shrink-0 max-h-80 xl:max-h-none">
        <div className="p-4 sm:p-6 border-b bg-teal-50/50">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#0eb7b7]" />
            Manajemen Kegiatan
          </h2>
          <p className="text-xs text-gray-500 mt-1">Konsol Kepanitiaan (Panitia & Admin)</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <Link href="/admin/events/create" className="block w-full">
            <Button className="w-full h-12 bg-[#0eb7b7] hover:bg-[#0a9494] text-white rounded-xl shadow-md font-bold text-sm flex gap-2">
              <Plus className="w-4 h-4" /> Buat Kegiatan Baru
            </Button>
          </Link>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status Kegiatan</h3>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0eb7b7]" />
              <span className="text-sm font-semibold text-gray-700">Akan Datang (Draft & Publish)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input type="checkbox" className="w-4 h-4 accent-[#0eb7b7]" />
              <span className="text-sm font-semibold text-gray-700">Selesai (Arsip)</span>
            </label>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col bg-[#fcfdfd]">
        <div className="h-20 border-b flex items-center justify-between px-8 bg-white">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Cari kegiatan berdasarkan nama..." 
              className="w-full rounded-full bg-gray-50 border-gray-200 pl-10 shadow-inner text-sm focus-visible:ring-1 focus-visible:ring-[#0eb7b7]" 
            />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer hover:bg-gray-50 p-2 rounded-full transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex items-center gap-3 pl-4 border-l cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">Panitia Pusat</p>
                <p className="text-xs font-bold text-[#0eb7b7]">Divisi Acara & Operating</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-[#0eb7b7] transition-all">
                <AvatarFallback className="bg-[#0d4f54] text-white font-bold">PP</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Event List Table/Cards */}
            <div className="bg-white border rounded-3xl shadow-sm overflow-hidden flex flex-col">
              
              <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
                <h3 className="font-extrabold text-gray-900 text-lg">Daftar Kegiatan Aktif</h3>
                <span className="text-xs font-bold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">{events.length} Kegiatan</span>
              </div>

              {events.map((event) => (
                <div key={event.id} className="p-4 sm:p-6 border-b hover:bg-gray-50/70 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 flex-1">
                    <div className="w-16 h-16 bg-teal-50 text-[#0eb7b7] rounded-2xl flex flex-col items-center justify-center border border-teal-100 shrink-0">
                      <span className="text-xs font-bold uppercase">{event.month}</span>
                      <span className="text-xl font-black leading-none mt-0.5">{event.day}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          event.status === "Published" ? "bg-green-500" : "bg-gray-400"
                        }`}>
                          {event.status}
                        </span>
                        <span className="text-[10px] font-bold text-[#0eb7b7] border border-[#0eb7b7] bg-teal-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {event.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg">{event.title}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {event.location}</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5"/> {event.attendeesCount}/{event.maxCapacity} Peserta</span>
                        <span className="flex items-center gap-1 font-bold text-[#0eb7b7]">
                          <Award className="w-3.5 h-3.5" /> {event.committee.length} Panitia Bertugas
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/admin/events/${event.id}/committee`} className="w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        className="w-full sm:w-auto rounded-xl border-[#0eb7b7] text-[#0eb7b7] hover:bg-teal-50 font-bold flex gap-1.5 text-xs"
                      >
                        <Award className="w-4 h-4 text-[#0eb7b7]" /> Halaman Kepanitiaan EV-04
                      </Button>
                    </Link>

                    <Button 
                      onClick={() => setActiveManageEventId(event.id)}
                      variant="ghost" 
                      className="rounded-xl text-gray-600 hover:bg-gray-100 font-bold flex gap-1 text-xs"
                      title="Quick Assign Modal"
                    >
                      <UserPlus className="w-4 h-4 text-gray-500" /> Quick Add
                    </Button>
                    
                    <Link href="/admin/events/scanner" className="w-full sm:w-auto">
                      <Button variant="outline" className="w-full sm:w-auto rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 font-bold flex gap-2 text-xs">
                        <QrCode className="w-4 h-4 text-[#0eb7b7]" /> Scanner QR
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}

            </div>

          </div>
        </div>
      </div>

      {/* EV-04: MODAL KELOLA PANITIA & FASILITATOR */}
      <Dialog open={!!activeManageEventId} onOpenChange={(open) => !open && setActiveManageEventId(null)}>
        <DialogContent className="w-[95vw] sm:max-w-[620px] rounded-[24px] sm:rounded-[30px] p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
          <DialogTitle className="text-xl sm:text-2xl font-black text-gray-900 mb-1">
            Kelola Panitia & Fasilitator (EV-04)
          </DialogTitle>
          <p className="text-xs text-gray-500 font-medium border-b pb-3 mb-4">
            Penugasan resmi untuk pembuktian poin keaktifan anggota (*role_contribution_count* MR-03) pada kegiatan <span className="font-bold text-gray-800">{activeEvent?.title}</span>.
          </p>

          {/* Current Committee List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Panitia & Fasilitator Saat Ini</h4>
            
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {activeEvent?.committee.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-400 font-medium">{member.npa}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-3 py-1 bg-teal-50 border border-teal-200 text-[#0eb7b7] rounded-full uppercase">
                      {member.role}
                    </span>
                    <button 
                      onClick={() => handleRemoveCommittee(member.id)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Committee Section */}
          <div className="mt-6 border-t pt-4 space-y-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tambah Panitia Baru</h4>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  type="search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari anggota..." 
                  className="rounded-xl pl-9 text-xs w-full" 
                />
              </div>

              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as CommitteeMember["role"])}
                className="text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#0eb7b7] w-full sm:w-auto"
              >
                <option value="Ketua Panitia">Ketua Panitia</option>
                <option value="Fasilitator Utama">Fasilitator Utama</option>
                <option value="Co-Host Zoom">Co-Host Zoom</option>
                <option value="Speaker">Speaker / Narasumber</option>
              </select>
            </div>

            {/* Available Members Directory Grid */}
            <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
              {filteredMembers.map((member) => {
                const isAssigned = activeEvent?.committee.some(c => c.id === member.id);
                return (
                  <div key={member.id} className="flex items-center justify-between p-2.5 rounded-xl border hover:bg-teal-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-bold text-gray-800">{member.name}</p>
                        <p className="text-[10px] text-gray-500">{member.npa}</p>
                      </div>
                    </div>

                    <Button 
                      disabled={isAssigned}
                      onClick={() => handleAddCommittee(member)}
                      size="sm" 
                      className={`h-8 rounded-lg text-xs font-bold ${
                        isAssigned 
                          ? "bg-gray-100 text-gray-400 border cursor-not-allowed" 
                          : "bg-[#0eb7b7] hover:bg-[#0a9494] text-white"
                      }`}
                    >
                      {isAssigned ? "Sudah Ditugaskan" : "+ Penugasan"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t flex justify-end">
            <Button onClick={() => setActiveManageEventId(null)} className="bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs px-6">
              Selesai & Simpan Penugasan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
