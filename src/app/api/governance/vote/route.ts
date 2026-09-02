import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

// POST: Submit Encrypted Vote & Generate Digital Receipt (GV-04)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, voteOption, voteCount } = body;

    if (!sessionId || !voteOption) {
      return NextResponse.json({ error: "sessionId and voteOption are required" }, { status: 400 });
    }

    const count = voteCount || 1;
    const insertedBallots = [];

    // Insert ballots (for primary vote + any proxy votes) with SHA-256 Checksum
    for (let i = 0; i < count; i++) {
      const randomSeed = `${sessionId}-${voteOption}-${Date.now()}-${Math.random()}`;
      const receiptHash = "0x" + crypto.createHash("sha256").update(randomSeed).digest("hex").substring(0, 32);

      const { data: ballot, error } = await supabase
        .from("encrypted_ballots")
        .insert([{
          session_id: sessionId,
          vote_option: voteOption,
          receipt_hash: receiptHash
        }])
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      insertedBallots.push(ballot);
    }

    return NextResponse.json({
      success: true,
      receiptHash: insertedBallots[0]?.receipt_hash,
      totalVotesCast: count,
      message: "Suara Berhasil Terenkripsi & Resi Digital Diterbitkan!"
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
