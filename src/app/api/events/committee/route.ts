import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST: Committee Role Assignment & Activity Point Award (EV-04)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, userId, roleTitle, skDocumentUrl } = body;

    if (!eventId || !userId || !roleTitle) {
      return NextResponse.json({ error: "eventId, userId, and roleTitle are required" }, { status: 400 });
    }

    // 1. Insert Committee Assignment Record
    const { data: assignment, error } = await supabase
      .from("committee_assignments")
      .insert([{
        event_id: eventId,
        user_id: userId,
        role_title: roleTitle,
        sk_document_url: skDocumentUrl || null,
        activity_point_awarded: 1
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 2. Increment Committee Role Count in MR-03 Qualification Engine!
    const year = new Date().getFullYear();
    const { data: qual } = await supabase
      .from("member_qualifications")
      .select("*")
      .eq("user_id", userId)
      .eq("evaluation_year", year)
      .single();

    if (qual) {
      const newCommitteeCount = (qual.committee_roles_count || 0) + 1;
      await supabase
        .from("member_qualifications")
        .update({ committee_roles_count: newCommitteeCount })
        .eq("id", qual.id);
    }

    return NextResponse.json({
      success: true,
      assignment,
      message: "Penugasan Panitia EV-04 Berhasil! +1 Poin Keaktifan MR-03 Ditambahkan."
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
