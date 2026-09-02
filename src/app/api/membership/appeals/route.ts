import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Fetch Member Appeal History (MR-04)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    let query = supabase.from("member_appeals").select("*").order("created_at", { ascending: false });

    if (userId) {
      query = query.eq("user_id", userId);
    }

    const { data: appeals, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, appeals });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Submit Dispute Appeal to Supervisor (SLA 14 Days MR-04)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, evaluationYear, reason, attachmentUrl } = body;

    if (!userId || !reason) {
      return NextResponse.json({ error: "userId and reason are required" }, { status: 400 });
    }

    const year = evaluationYear || new Date().getFullYear();
    const slaDeadline = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

    const { data: appeal, error } = await supabase
      .from("member_appeals")
      .insert([{
        user_id: userId,
        evaluation_year: year,
        reason,
        attachment_url: attachmentUrl || null,
        status: "under_review",
        sla_deadline: slaDeadline
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, appeal });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
