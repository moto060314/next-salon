import type { Menu } from "@/types/menu"
import type { Staff } from "@/types/staff"

type BookingSummaryProps = {
  selectedMenu: Menu | undefined
  selectedStaff: Staff | undefined
  staffId: string | null
  date: string | null
  time: string | null
}

export default function BookingSummary({
  selectedMenu,
  selectedStaff,
  staffId,
  date,
  time,
}: BookingSummaryProps) {
  return (
    <aside>
      <h2 className="text-lg font-semibold text-slate-950">予約内容</h2>
      <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-slate-200 p-6 text-sm">
        <div>
          <h3 className="text-xs font-medium text-slate-500">メニュー</h3>
          <div>{selectedMenu?.name ?? "未選択"}</div>
        </div>
        <div>
          <h3 className="text-xs font-medium text-slate-500">日時</h3>
          <div>{date && time ? `${date} ${time}` : "未選択"}</div>
        </div>
        <div>
          <h3 className="text-xs font-medium text-slate-500">スタッフ</h3>
          <div>{staffId === null ? "指名なし" : selectedStaff?.name}</div>
        </div>
      </div>
    </aside>
  )
}
