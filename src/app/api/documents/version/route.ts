import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST: Trigger Document Version Revision (DC-02 Version Control)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { documentId, newVersion, fileUrl, changelogNotes } = body;

    if (!documentId || !newVersion || !changelogNotes) {
      return NextResponse.json({ error: "documentId, newVersion, and changelogNotes are required" }, { status: 400 });
    }

    // 1. Insert Version History Record
    const { data: ver, error } = await supabase
      .from("document_versions")
      .insert([{
        document_id: documentId,
        version: newVersion,
        file_url: fileUrl || "https://example.com/legal-rev.pdf",
        changelog_notes: changelogNotes
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 2. Update current_version on main legal document
    await supabase
      .from("legal_documents")
      .update({
        current_version: newVersion,
        file_url: fileUrl || undefined
      })
      .eq("id", documentId);

    return NextResponse.json({
      success: true,
      version: ver,
      message: `Revisi Versi Baru ${newVersion} Resmi Diterbitkan (DC-02 Version Control).`
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
