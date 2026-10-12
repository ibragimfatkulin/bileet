import { FAQ_ITEMS, matchFaq } from "@/data/mock/chat-faq";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json()) as { message?: string };
  const reply = matchFaq(body.message ?? "");
  return NextResponse.json({ reply, suggestions: FAQ_ITEMS.map((f) => f.label) });
}
