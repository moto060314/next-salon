import SelectableCard from "@/components/booking/SelectableCard"
import type { Menu } from "@/types/menu"

type MenuStepProps = {
  menus: Menu[]
  selectedMenuId: string | null
  onSelect: (menuId: string) => void
}

export default function MenuStep({
  menus,
  selectedMenuId,
  onSelect,
}: MenuStepProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-slate-950">STEP 1: メニューを選ぶ</h3>
      {menus.map((menu) => {
        const selected = selectedMenuId === menu.id
        return (
          <SelectableCard
            key={menu.id}
            selected={selected}
            onClick={() => onSelect(menu.id)}
          >
            <p className="font-medium">{menu.name}</p>
            <p className="mt-1 text-xs">
              ¥{menu.price.toLocaleString("ja-JP")} / {menu.durationMinutes}min
            </p>
            <p className="mt-2 text-sm leading-6">{menu.description}</p>
          </SelectableCard>
        )
      })}
    </div>
  )
}
