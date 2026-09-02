import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST: Pelimpahan Hak Suara (GV-02 Proxy Mandate Delegation)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { assemblyId, grantorId, recipientId } = body;

    if (!assemblyId || !grantorId || !recipientId) {
      return NextResponse.json({ error: "assemblyId, grantorId, and recipientId are required" }, { status: 400 });
    }

    if (grantorId === recipientId) {
      return NextResponse.json({ error: "Tidak dapat melimpahkan surat kuasa kepada diri sendiri!" }, { status: 400 });
    }

    // 1. Check max 2 mandates constraint for recipient
    const { data: existingProxies } = await supabase
      .from("proxy_mandates")
      .select("id")
      .eq("assembly_id", assemblyId)
      .eq("recipient_id", recipientId)
      .eq("status", "APPROVED");

    if (existingProxies && existingProxies.length >= 2) {
      return NextResponse.json({
        error: "Batas Maksimal Kuasa Terlampaui! Penerima kuasa ini telah menerima 2 surat kuasa (Batas AD/ART GV-02)."
      }, { status: 422 });
    }

    // 2. Insert Proxy Mandate record
    const { data: mandate, error } = await supabase
      .from("proxy_mandates")
      .insert([{
        assembly_id: assemblyId,
        grantor_id: grantorId,
        recipient_id: recipientId,
        status: "APPROVED"
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 3. Link Proxy Mandate to grantor's voter roll
    await supabase
      .from("voter_rolls")
      .update({ proxy_mandate_id: mandate.id })
      .eq("assembly_id", assemblyId)
      .eq("user_id", grantorId);

    return NextResponse.json({
      success: true,
      mandate,
      message: "Surat Kuasa Berhasil Diterbitkan! Hak suara resmi dilimpahkan."
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
