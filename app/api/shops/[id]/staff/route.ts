import { NextResponse } from "next/server"

import { MOCK_SHOP_STAFF } from "@/data/MockData"

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params
  const staff = MOCK_SHOP_STAFF[id] ?? []

  return NextResponse.json({ staff })
}
