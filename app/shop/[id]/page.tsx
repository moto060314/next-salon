import { notFound } from "next/navigation"
import ShopHero from "@/components/ShopHero"
import { getShop } from "@/lib/services/shops"

type Props = {
  params: Promise<{ id: string }>
}

export default async function ShopDetailPage({ params }: Props) {
  const { id } = await params
  const shop = await getShop(id)

  if (!shop) {
    notFound()
  }

  return <ShopHero shop={shop} />
}
