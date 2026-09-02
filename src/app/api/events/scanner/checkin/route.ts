import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST: Process QR Code Presensi Check-In (EV-02 & EV-03)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { qrTicketCode, eventId } = body;

    if (!qrTicketCode) {
      return NextResponse.json({ error: "qrTicketCode is required" }, { status: 400 });
    }

    // 1. Fetch Event Registration by QR Code
    const { data: reg, error } = await supabase
      .from("event_registrations")
      .select("*, profiles(*)")
      .eq("qr_ticket_code", qrTicketCode)
      .single();

    if (error || !reg) {
      return NextResponse.json({ error: "Tiket QR Code tidak ditemukan atau tidak valid!" }, { status: 404 });
    }

    // 2. EV-03 Safe Space Consent Check
    if (!reg.safe_space_accepted) {
      return NextResponse.json({ 
        error: "Presensi Ditolak: Peserta belum menyetujui Safe Space Protocol (EV-03)!" 
      }, { status: 403 });
    }

    // 3. Mark Attendance as ATTENDED
    const { data: updatedReg } = await supabase
      .from("event_registrations")
      .update({
        attendance_status: "ATTENDED",
        attended_at: new Date().toISOString()
      })
      .eq("id", reg.id)
      .select("*, profiles(*)")
      .single();

    // 4. Increment MR-03 Attendance Count for the member!
    const year = new Date().getFullYear();
    const { data: qual } = await supabase
      .from("member_qualifications")
      .select("*")
      .eq("user_id", reg.user_id)
      .eq("evaluation_year", year)
      .single();

    if (qual) {
      const newAttendedCount = (qual.events_attended_count || 0) + 1;
      await supabase
        .from("member_qualifications")
        .update({ events_attended_count: newAttendedCount })
        .eq("id", qual.id);
    }

    return NextResponse.json({
      success: true,
      registration: updatedReg,
      message: "Check-in QR Berhasil! Safe Space Terverifikasi & MR-03 Attendance Counter Ditambahkan."
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
