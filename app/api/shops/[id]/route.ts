import { NextResponse } from "next/server"
import { MOCK_SHOPS } from "@/data/MockData"

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params
  const shop = MOCK_SHOPS.find((s) => s.id === id)

  if (!shop) {
    return NextResponse.json({ error: "not found" }, { status: 404 })
  }

  return NextResponse.json({ shop })
}
