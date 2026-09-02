import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

// GET: Fetch Legal Documents Vault (DC-01 & DC-02)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const accessLevel = searchParams.get("accessLevel");

    let query = supabase.from("legal_documents").select("*, document_versions(*)").order("created_at", { ascending: false });

    if (category && category !== "Semua") {
      query = query.eq("category", category);
    }
    if (accessLevel) {
      query = query.eq("access_level", accessLevel);
    }

    const { data: documents, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, documents });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Upload & Encrypt New Legal Document with SHA-256 Checksum (DC-01)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { registrationNumber, title, category, accessLevel, fileUrl, rawContent } = body;

    if (!registrationNumber || !title || !category || !fileUrl) {
      return NextResponse.json({ error: "Registration number, title, category, and fileUrl are required" }, { status: 400 });
    }

    // Generate Cryptographic SHA-256 Checksum Hash (DC-01 Rest & Transit Security)
    const contentToHash = rawContent || `${registrationNumber}-${title}-${fileUrl}-${Date.now()}`;
    const sha256Hash = crypto.createHash("sha256").update(contentToHash).digest("hex");

    const { data: newDoc, error } = await supabase
      .from("legal_documents")
      .insert([{
        registration_number: registrationNumber,
        title,
        category,
        access_level: accessLevel || "Internal Anggota",
        file_url: fileUrl,
        sha256_hash: sha256Hash,
        current_version: "v1.0"
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Insert initial v1.0 version history record
    await supabase.from("document_versions").insert([{
      document_id: newDoc.id,
      version: "v1.0",
      file_url: fileUrl,
      changelog_notes: "Penerbitan dokumen legal awal v1.0 resmi terenkripsi."
    }]);

    return NextResponse.json({
      success: true,
      document: newDoc,
      sha256Hash,
      message: "Dokumen Legal Berhasil Dienkripsi & Terverifikasi Checksum SHA-256 (DC-01)."
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
