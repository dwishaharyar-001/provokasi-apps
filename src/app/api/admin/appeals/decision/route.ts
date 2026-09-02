import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST: Supervisor Decision on Member Appeal (Approve / Reject MR-04)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { appealId, status, supervisorNotes } = body;

    if (!appealId || !status) {
      return NextResponse.json({ error: "appealId and status are required" }, { status: 400 });
    }

    // 1. Update Appeal record
    const { data: appeal, error } = await supabase
      .from("member_appeals")
      .update({
        status,
        supervisor_notes: supervisorNotes || null,
        updated_at: new Date().toISOString()
      })
      .eq("id", appealId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 2. If Approved, restore member's Active status & Gold Pin!
    if (status === "approved" && appeal) {
      await supabase
        .from("profiles")
        .update({
          is_active_member: true,
          has_gold_pin: true,
          membership_tier: "Anggota Aktif",
          updated_at: new Date().toISOString()
        })
        .eq("id", appeal.user_id);
    }

    return NextResponse.json({ success: true, appeal });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
