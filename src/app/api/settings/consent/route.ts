import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST / PUT: Update Granular Data Consents (PD-01 UU PDP)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, consentDirectory, consentOfficerContact, consentInternalResearch, consentMediaDocs } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const { data: consent, error } = await supabase
      .from("granular_consents")
      .upsert([{
        user_id: userId,
        consent_directory: consentDirectory !== undefined ? consentDirectory : true,
        consent_officer_contact: consentOfficerContact !== undefined ? consentOfficerContact : true,
        consent_internal_research: consentInternalResearch !== undefined ? consentInternalResearch : false,
        consent_media_docs: consentMediaDocs !== undefined ? consentMediaDocs : true,
        updated_at: new Date().toISOString()
      }], { onConflict: "user_id" })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      consent,
      message: "Persetujuan Eksplisit Data Pribadi (PD-01) Berhasil Diperbarui!"
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
