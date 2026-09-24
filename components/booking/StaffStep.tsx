import SelectableCard from "@/components/booking/SelectableCard"
import type { Staff } from "@/types/staff"

type StaffStepProps = {
  staff: Staff[]
  selectedStaffId: string | null
  onSelect: (staffId: string | null) => void
}

export default function StaffStep({
  staff,
  selectedStaffId,
  onSelect,
}: StaffStepProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-slate-950">
        STEP 3: スタッフを選ぶ（任意）
      </h3>
      <SelectableCard selected={selectedStaffId === null} onClick={() => onSelect(null)}>
        指名なし
      </SelectableCard>
      {staff.map((member) => (
        <SelectableCard
          key={member.id}
          selected={selectedStaffId === member.id}
          onClick={() => onSelect(member.id)}
        >
          <p className="font-medium">{member.name}</p>
          <p className="mt-1 text-xs">{member.specialty}</p>
        </SelectableCard>
      ))}
    </div>
  )
}
