import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST: Process Multi-Tier Expense Approval (FN-03) & Conflict Lockout Check (FN-04)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { expenseId, officerUserId } = body;

    if (!expenseId || !officerUserId) {
      return NextResponse.json({ error: "expenseId and officerUserId are required" }, { status: 400 });
    }

    // 1. Fetch Expense Request
    const { data: exp, error } = await supabase
      .from("expense_requests")
      .select("*")
      .eq("id", expenseId)
      .single();

    if (error || !exp) {
      return NextResponse.json({ error: "Permohonan pengeluaran tidak ditemukan" }, { status: 404 });
    }

    // 2. FN-04 AFFILIATED PARTY CONFLICT LOCKOUT CHECK!
    if (exp.is_affiliated_party && exp.applicant_id === officerUserId) {
      return NextResponse.json({
        error: "AKSES DITOLAK (FN-04 LOCKOUT): Anda terdeteksi memiliki benturan kepentingan (pihak terafiliasi) dan diisolasi dari hak memberikan persetujuan pada transaksi ini!"
      }, { status: 403 });
    }

    // 3. Process Approval Counter
    const nextCount = (exp.approvals_count || 0) + 1;
    const isCompleted = nextCount >= exp.approvals_required;

    const { data: updatedExp } = await supabase
      .from("expense_requests")
      .update({
        approvals_count: nextCount,
        status: isCompleted ? "APPROVED" : "PENDING"
      })
      .eq("id", expenseId)
      .select()
      .single();

    return NextResponse.json({
      success: true,
      expense: updatedExp,
      message: isCompleted 
        ? `Otorisasi Lengkap! Transaksi ${exp.tier} Resmi Disahkan.` 
        : `Otorisasi Ke-` + nextCount + ` Berhasil Diberikan.`
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
