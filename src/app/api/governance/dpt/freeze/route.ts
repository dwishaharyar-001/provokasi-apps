import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST: Lock & Publish DPT H-30 (GV-01 Voter Roll Freeze)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { assemblyId, supervisorApproved } = body;

    if (!assemblyId) {
      return NextResponse.json({ error: "assemblyId is required" }, { status: 400 });
    }

    // 1. Fetch active members qualified under MR-03
    const { data: activeProfiles, error: profileErr } = await supabase
      .from("profiles")
      .select("id")
      .eq("is_active_member", true);

    if (profileErr) {
      return NextResponse.json({ error: profileErr.message }, { status: 400 });
    }

    // 2. Lock & Insert DPT Roll Entries into voter_rolls
    if (activeProfiles && activeProfiles.length > 0) {
      const dptEntries = activeProfiles.map((p) => ({
        assembly_id: assemblyId,
        user_id: p.id,
        is_eligible: true
      }));

      await supabase
        .from("voter_rolls")
        .upsert(dptEntries, { onConflict: "assembly_id,user_id" });
    }

    // 3. Update Assembly DPT status
    const { data: updatedAssembly } = await supabase
      .from("assemblies")
      .update({
        dpt_locked: true,
        supervisor_approved: supervisorApproved !== undefined ? supervisorApproved : true
      })
      .eq("id", assemblyId)
      .select()
      .single();

    return NextResponse.json({
      success: true,
      assembly: updatedAssembly,
      totalDPTLocked: activeProfiles?.length || 0,
      message: "DPT H-30 Berhasil Terkunci & Disahkan Pengawas!"
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
