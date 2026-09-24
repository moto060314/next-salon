"use client"

import BookingSummary from "@/components/booking/BookingSummary"
import DateTimeStep from "@/components/booking/DateTimeStep"
import MenuStep from "@/components/booking/MenuStep"
import StaffStep from "@/components/booking/StaffStep"
import {
  BookingProvider,
  TOTAL_STEPS,
  canGoNext,
  useBooking,
} from "@/contexts/BookingContext"
import type { Menu } from "@/types/menu"
import type { Shop } from "@/types/shop"
import type { Staff } from "@/types/staff"

type BookingFormProps = {
  shop: Shop
  menus: Menu[]
  staff: Staff[]
}

const candidateDates = ["9/25", "9/26", "9/27", "9/28", "9/29"]
const timeSlots = ["10:00", "12:00", "14:00", "16:00", "18:00"]

export default function BookingForm({ shop, menus, staff }: BookingFormProps) {
  return (
    <BookingProvider shopId={shop.id}>
      <BookingFlow menus={menus} staff={staff} />
    </BookingProvider>
  )
}

function BookingFlow({ menus, staff }: { menus: Menu[]; staff: Staff[] }) {
  const { state, dispatch } = useBooking()
  const selectedMenu = menus.find((menu) => menu.id === state.menuId)
  const selectedStaff = staff.find((member) => member.id === state.staffId)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        {state.step === 1 && (
          <MenuStep
            menus={menus}
            selectedMenuId={state.menuId}
            onSelect={(menuId) => dispatch({ type: "select-menu", menuId })}
          />
        )}
        {state.step === 2 && (
          <DateTimeStep
            candidateDates={candidateDates}
            timeSlots={timeSlots}
            selectedDate={state.date}
            selectedTime={state.time}
            onSelectDate={(date) => dispatch({ type: "select-date", date })}
            onSelectTime={(time) => dispatch({ type: "select-time", time })}
          />
        )}
        {state.step === 3 && (
          <StaffStep
            staff={staff}
            selectedStaffId={state.staffId}
            onSelect={(staffId) => dispatch({ type: "select-staff", staffId })}
          />
        )}
        {state.step === 4 && (
          <div>
            <h3 className="text-lg font-semibold text-slate-950">
              STEP 4: 確認して予約する
            </h3>
            <label className="mt-5 block text-sm font-medium text-slate-700">
              備考
              <textarea
                value={state.notes}
                onChange={(event) =>
                  dispatch({ type: "change-notes", notes: event.target.value })
                }
                className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:border-rose-400"
                placeholder="ご希望や相談したいことがあれば入力してください。"
              />
            </label>
          </div>
        )}

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => dispatch({ type: "prev" })}
            disabled={state.step === 1}
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium disabled:opacity-40"
          >
            戻る
          </button>
          {state.step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={() => dispatch({ type: "next" })}
              disabled={!canGoNext(state)}
              className="rounded-xl border border-slate-950 bg-slate-950 px-5 py-3 text-sm font-medium text-white disabled:opacity-40"
            >
              次へ
            </button>
          ) : (
            <button
              type="button"
              className="rounded-xl border border-rose-500 bg-rose-500 px-5 py-3 text-sm font-medium text-white"
            >
              この内容で予約する
            </button>
          )}
        </div>
      </div>

      <BookingSummary
        selectedMenu={selectedMenu}
        selectedStaff={selectedStaff}
        staffId={state.staffId}
        date={state.date}
        time={state.time}
      />
    </div>
  )
}
