import { createBatchBooking } from "@/lib/store";
import type { BatchBookingRequest } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BatchBookingRequest;
    if (!body.name?.trim() || !body.email?.trim() || !body.items?.length) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const result = await createBatchBooking(body.name.trim(), body.email.trim(), body.items);
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Batch booking failed";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
