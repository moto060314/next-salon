import { NextResponse } from "next/server"
import { MOCK_SHOPS } from "@/data/MockData"

export async function GET() {
  return NextResponse.json({ shops: MOCK_SHOPS })
}