type SelectableCardProps = {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export default function SelectableCard({
  selected,
  onClick,
  children,
  className = "",
}: SelectableCardProps) {
  const selectedClass = "border-rose-500 bg-rose-50 text-rose-700"
  const normalClass = "border-slate-200 bg-white text-slate-700 hover:border-rose-200"

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left text-sm transition ${selected ? selectedClass : normalClass} ${className}`}
    >
      {children}
    </button>
  )
}
