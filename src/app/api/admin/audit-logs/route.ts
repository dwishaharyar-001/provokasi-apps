import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Fetch Immutable PDP Access Audit Logs (PD-02)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    let query = supabase.from("pdp_access_audit_logs").select("*, profiles!officer_id(*)").order("timestamp", { ascending: false });

    if (action && action !== "Semua") {
      query = query.eq("action", action);
    }

    const { data: logs, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, logs });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Log Immutable Personal Data Access / Export Event (PD-02 UU PDP Mandate)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { officerId, action, targetMemberId, ipAddress, userAgent, legalPurpose } = body;

    if (!action || !legalPurpose) {
      return NextResponse.json({ error: "action and legalPurpose are required for PDP compliance" }, { status: 400 });
    }

    const { data: auditLog, error } = await supabase
      .from("pdp_access_audit_logs")
      .insert([{
        officer_id: officerId || null,
        action,
        target_member_id: targetMemberId || null,
        ip_address: ipAddress || "127.0.0.1",
        user_agent: userAgent || "Antigravity/Provokasi-Client",
        legal_purpose: legalPurpose,
        timestamp: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      auditLog,
      message: "Aktivitas Pengaksesan Data Terpenuhi & Terverifikasi di Log Audit PDP (PD-02)."
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
