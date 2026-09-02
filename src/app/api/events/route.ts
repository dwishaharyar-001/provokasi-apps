import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Fetch Events Catalog (EV-01)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = supabase.from("events").select("*").order("start_time", { ascending: true });

    if (category && category !== "Semua") {
      query = query.eq("category", category);
    }

    const { data: events, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, events });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Create New Event (Admin EV-01)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, eventType, isPaid, price, capacity, location, startTime, endTime } = body;

    if (!title || !category || !startTime || !endTime) {
      return NextResponse.json({ error: "Required event fields missing" }, { status: 400 });
    }

    const { data: newEvent, error } = await supabase
      .from("events")
      .insert([{
        title,
        category,
        event_type: eventType || "Offline",
        is_paid: isPaid || false,
        price: price || 0,
        capacity: capacity || 100,
        location: location || "Sekretariat Perkumpulan Provokasi",
        start_time: startTime,
        end_time: endTime,
        status: "PUBLISHED"
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, event: newEvent });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
