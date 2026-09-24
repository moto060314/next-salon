import SelectableCard from "@/components/booking/SelectableCard"

type DateTimeStepProps = {
  candidateDates: string[]
  timeSlots: string[]
  selectedDate: string | null
  selectedTime: string | null
  onSelectDate: (date: string) => void
  onSelectTime: (time: string) => void
}

export default function DateTimeStep({
  candidateDates,
  timeSlots,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}: DateTimeStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-950">STEP 2: 日時を選ぶ</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {candidateDates.map((date) => (
            <SelectableCard
              key={date}
              selected={selectedDate === date}
              onClick={() => onSelectDate(date)}
              className="min-w-28 text-center"
            >
              {date}
            </SelectableCard>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {timeSlots.map((time) => (
          <SelectableCard
            key={time}
            selected={selectedTime === time}
            onClick={() => onSelectTime(time)}
            className="min-w-24 text-center"
          >
            {time}
          </SelectableCard>
        ))}
      </div>
    </div>
  )
}
