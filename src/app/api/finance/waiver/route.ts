import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST: Submit or Approve Fee Waiver Request (FN-02)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, userId, waiverId, reason, approvedBy } = body;

    // Action 1: Member Submits Fee Waiver Request
    if (action === "SUBMIT") {
      if (!userId || !reason) {
        return NextResponse.json({ error: "userId and reason are required" }, { status: 400 });
      }

      const year = new Date().getFullYear();
      const { data: waiver, error } = await supabase
        .from("fee_waiver_requests")
        .insert([{
          user_id: userId,
          year,
          reason,
          status: "PENDING"
        }])
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, waiver });
    }

    // Action 2: Admin Approves Fee Waiver Request
    if (action === "APPROVE") {
      if (!waiverId) {
        return NextResponse.json({ error: "waiverId is required" }, { status: 400 });
      }

      const { data: updatedWaiver, error } = await supabase
        .from("fee_waiver_requests")
        .update({
          status: "APPROVED",
          approved_by: approvedBy || null
        })
        .eq("id", waiverId)
        .select()
        .single();

      if (error || !updatedWaiver) {
        return NextResponse.json({ error: error?.message || "Waiver not found" }, { status: 400 });
      }

      // Update Member Qualification status to 'WAIVED' in MR-03 (Retains Active Status!)
      const year = new Date().getFullYear();
      await supabase
        .from("member_qualifications")
        .update({ fee_compliance_status: "WAIVED" })
        .eq("user_id", updatedWaiver.user_id)
        .eq("evaluation_year", year);

      return NextResponse.json({
        success: true,
        waiver: updatedWaiver,
        message: "Dispensasi Iuran Disetujui! Status Keaktifan & Hak Suara Anggota Tetap Utuh (FN-02)."
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
