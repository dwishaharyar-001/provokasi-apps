import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST: Submit Account Erasure Request / Right to be Forgotten (PD-03 SLA 30 Days)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, reason } = body;

    if (!userId || !reason) {
      return NextResponse.json({ error: "userId and reason are required" }, { status: 400 });
    }

    const slaDeadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    // 1. Insert Erasure Request
    const { data: erasureReq, error } = await supabase
      .from("account_erasure_requests")
      .insert([{
        user_id: userId,
        reason,
        status: "PENDING",
        sla_deadline: slaDeadline
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 2. Log entry in Access Audit Trail (PD-02)
    await supabase.from("pdp_access_audit_logs").insert([{
      officer_id: userId,
      action: "ERASURE_REQUEST",
      target_member_id: userId,
      ip_address: "127.0.0.1",
      user_agent: "Provokasi Member Client",
      legal_purpose: `Permohonan Penghapusan Akun Mandiri (Right to be Forgotten PD-03). Alasan: ${reason}`,
      timestamp: new Date().toISOString()
    }]);

    return NextResponse.json({
      success: true,
      erasureRequest: erasureReq,
      message: "Permohonan Penghapusan Akun Permanen (PD-03) Diproses dengan SLA 30 Hari Kerja."
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
