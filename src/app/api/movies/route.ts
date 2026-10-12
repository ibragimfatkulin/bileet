import { MOVIES } from "@/data/mock/movies";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ movies: MOVIES });
}
