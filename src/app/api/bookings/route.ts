import { createBooking } from "@/lib/store";
import type { BookingRequest } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BookingRequest;
    if (!body.name?.trim() || !body.email?.trim() || !body.sessionId || !body.seatIds?.length) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const result = createBooking(body.name.trim(), body.email.trim(), body.sessionId, body.seatIds);
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Booking failed";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
