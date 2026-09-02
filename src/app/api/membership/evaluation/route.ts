import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Evaluasi Keaktifan MR-03 (Aturan 2 dari 3 Parameter AD/ART)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const year = parseInt(searchParams.get("year") || new Date().getFullYear().toString());

    if (!userId) {
      return NextResponse.json({ error: "userId parameter required" }, { status: 400 });
    }

    // 1. Fetch qualification record
    let { data: qual, error } = await supabase
      .from("member_qualifications")
      .select("*")
      .eq("user_id", userId)
      .eq("evaluation_year", year)
      .single();

    if (error && error.code === "PGRST116") {
      // Create initial evaluation record for current year if missing
      const { data: newQual } = await supabase
        .from("member_qualifications")
        .insert([{
          user_id: userId,
          evaluation_year: year,
          events_attended_count: 0,
          committee_roles_count: 0,
          fee_compliance_status: "PENDING",
          is_qualified: false
        }])
        .select()
        .single();
      qual = newQual;
    }

    // 2. Evaluate 2-of-3 AD/ART Parameters
    const param1Met = (qual?.events_attended_count || 0) >= 3;
    const param2Met = (qual?.committee_roles_count || 0) >= 1;
    const param3Met = qual?.fee_compliance_status === "LUNAS" || qual?.fee_compliance_status === "WAIVED";

    const metCount = (param1Met ? 1 : 0) + (param2Met ? 1 : 0) + (param3Met ? 1 : 0);
    const isQualified = metCount >= 2;

    // 3. Sync result to profile (Grant Gold Pin if qualified)
    await supabase
      .from("profiles")
      .update({
        is_active_member: isQualified,
        has_gold_pin: isQualified,
        membership_tier: isQualified ? "Anggota Aktif" : "Anggota Biasa",
        updated_at: new Date().toISOString()
      })
      .eq("id", userId);

    return NextResponse.json({
      success: true,
      qualification: {
        ...qual,
        param1Met,
        param2Met,
        param3Met,
        metCount,
        isQualified
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
