import { notFound } from "next/navigation"
import ShopHero from "@/components/ShopHero"
import ShopMenuList from "@/components/ShopMenuList"
import ShopStaffList from "@/components/ShopStaffList"
import { getMenus, getShop, getStaff } from "@/lib/services/shops"

type Props = {
  params: Promise<{ id: string }>
}

export default async function ShopDetailPage({ params }: Props) {
  const { id } = await params
  const shop = await getShop(id)

  if (!shop) {
    notFound()
  }

  const [menus, staff] = await Promise.all([getMenus(id), getStaff(id)])

  return (
    <div>
      <ShopHero shop={shop} />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-2xl font-semibold text-slate-950">Menu</h2>
          <ShopMenuList menus={menus} />
        </section>
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-2xl font-semibold text-slate-950">Staff</h2>
          <ShopStaffList staff={staff} />
        </section>
      </div>
    </div>
  )
}
