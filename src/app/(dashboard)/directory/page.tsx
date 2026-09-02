"use client";

import { Search, Bell, Zap, Users, Filter, UserCheck, Shield, MapPin, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const dummyMembers = [
  { id: 1, name: "Irvan Jie", batch: "LIO-05", role: "Pengurus Inti", active: true },
  { id: 2, name: "Siti Aminah", batch: "LIO-08", role: "Anggota Aktif", active: true },
  { id: 3, name: "Budi Santoso", batch: "LIO-02", role: "Pengawas", active: true },
  { id: 4, name: "Rina Kusuma", batch: "LIO-10", role: "Anggota Biasa", active: false },
  { id: 5, name: "Andi Wijaya", batch: "LIO-08", role: "Anggota Aktif", active: true },
];

export default function DirectoryPage() {
  return (
    <div className="flex h-full w-full bg-white rounded-tl-[40px] shadow-sm my-4 mr-4 border overflow-hidden">
      
      {/* SECONDARY SIDEBAR (Filters) */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Direktori Anggota</h2>
          <p className="text-xs text-gray-500 mt-1">Jejaring Alumni LIO</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <Filter className="w-3 h-3" /> Filter Batch
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold px-3 py-1.5 bg-[#0eb7b7] text-white rounded-full cursor-pointer">Semua</span>
              <span className="text-xs font-bold px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 cursor-pointer">LIO-08</span>
              <span className="text-xs font-bold px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 cursor-pointer">LIO-09</span>
              <span className="text-xs font-bold px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 cursor-pointer">LIO-10</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status Keanggotaan</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0eb7b7]" />
              <span className="text-sm font-semibold text-gray-700">Anggota Aktif</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0eb7b7]" />
              <span className="text-sm font-semibold text-gray-700">Anggota Biasa</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0eb7b7]" />
              <span className="text-sm font-semibold text-gray-700">Pengurus / Pengawas</span>
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
              placeholder="Cari nama anggota..." 
              className="w-full rounded-full bg-gray-50 border-gray-200 pl-10 shadow-inner text-sm focus-visible:ring-1 focus-visible:ring-[#0eb7b7]" 
            />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer hover:bg-gray-50 p-2 rounded-full transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex items-center gap-3 pl-4 border-l cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">Dwi Ishak M.</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-[#0eb7b7] transition-all">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>DI</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {dummyMembers.map(member => (
              <Dialog key={member.id}>
                <DialogTrigger className="w-full text-left">
                  <div className="bg-white border rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-16 bg-gray-50 group-hover:bg-[#0eb7b7]/5 transition-colors"></div>
                    
                    <Avatar className="h-20 w-20 border-4 border-white shadow-sm relative z-10 mb-4">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${member.id}`} />
                      <AvatarFallback>{member.name.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    
                    <h3 className="font-extrabold text-gray-900 text-lg">{member.name}</h3>
                    
                    <div className="flex gap-2 mt-2 mb-4">
                      <span className="text-[10px] font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                        {member.batch}
                      </span>
                      {member.active ? (
                        <span className="text-[10px] font-bold px-2 py-1 bg-[#0eb7b7]/10 text-[#0eb7b7] rounded-md flex items-center gap-1">
                          <UserCheck className="w-3 h-3" /> Aktif
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-1 bg-gray-100 text-gray-400 rounded-md">
                          Biasa
                        </span>
                      )}
                      {member.role.includes("Pengurus") || member.role.includes("Pengawas") ? (
                         <span className="text-[10px] font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-md flex items-center gap-1">
                          <Shield className="w-3 h-3" /> {member.role}
                        </span>
                      ) : null}
                    </div>

                    <div className="w-full text-left bg-gray-50 p-3 rounded-xl mt-auto">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Kontak (Masked)</p>
                      <p className="text-sm font-medium text-gray-700">+62 812-****-**89</p>
                      <p className="text-sm font-medium text-gray-700">{member.name.split(" ")[0].toLowerCase()}***@gmail.com</p>
                    </div>
                  </div>
                </DialogTrigger>
                
                {/* MODAL KONTEN DETAIL PROFIL */}
                <DialogContent className="sm:max-w-[425px] rounded-[30px] p-0 overflow-hidden border-none shadow-2xl">
                  <div className="h-32 bg-gradient-to-br from-[#0d4f54] to-[#0eb7b7] w-full relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                  </div>
                  
                  <div className="px-8 pb-8 pt-0 relative flex flex-col items-center">
                    <Avatar className="h-28 w-28 border-4 border-white shadow-lg relative -mt-14 mb-4">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${member.id}`} />
                      <AvatarFallback className="text-2xl">{member.name.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    
                    <DialogTitle className="text-2xl font-black text-gray-900 mb-1">{member.name}</DialogTitle>
                    <p className="text-sm font-bold text-gray-500">{member.batch} • {member.role}</p>

                    <div className="mt-6 w-full space-y-4">
                       <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border">
                         <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#0eb7b7] shadow-sm">
                           <Phone className="w-5 h-5" />
                         </div>
                         <div>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nomor WhatsApp</p>
                           <p className="text-sm font-bold text-gray-800">+62 812-****-**89</p>
                         </div>
                       </div>
                       
                       <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border">
                         <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-amber-500 shadow-sm">
                           <Mail className="w-5 h-5" />
                         </div>
                         <div>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</p>
                           <p className="text-sm font-bold text-gray-800">{member.name.split(" ")[0].toLowerCase()}***@gmail.com</p>
                         </div>
                       </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
