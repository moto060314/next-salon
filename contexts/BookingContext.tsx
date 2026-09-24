"use client"

import { createContext, useContext, useReducer } from "react"

export const TOTAL_STEPS = 4

export type BookingState = {
  step: number
  menuId: string | null
  staffId: string | null
  date: string | null
  time: string | null
  notes: string
}

const INITIAL_STATE: BookingState = {
  step: 1,
  menuId: null,
  staffId: null,
  date: null,
  time: null,
  notes: "",
}

export type BookingAction =
  | { type: "select-menu"; menuId: string }
  | { type: "select-staff"; staffId: string | null }
  | { type: "select-date"; date: string }
  | { type: "select-time"; time: string }
  | { type: "change-notes"; notes: string }
  | { type: "next" }
  | { type: "prev" }
  | { type: "reset" }

export function canGoNext(state: BookingState): boolean {
  switch (state.step) {
    case 1:
      return state.menuId !== null
    case 2:
      return state.date !== null && state.time !== null
    default:
      return true
  }
}

function bookingReducer(
  state: BookingState,
  action: BookingAction,
): BookingState {
  switch (action.type) {
    case "select-menu":
      return { ...state, menuId: action.menuId }
    case "select-staff":
      return { ...state, staffId: action.staffId }
    case "select-date":
      return { ...state, date: action.date }
    case "select-time":
      return { ...state, time: action.time }
    case "change-notes":
      return { ...state, notes: action.notes }
    case "next":
      return { ...state, step: Math.min(state.step + 1, TOTAL_STEPS) }
    case "prev":
      return { ...state, step: Math.max(state.step - 1, 1) }
    case "reset":
      return INITIAL_STATE
  }
}

type BookingContextValue = {
  shopId: string
  state: BookingState
  dispatch: React.Dispatch<BookingAction>
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({
  shopId,
  children,
}: {
  shopId: string
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(bookingReducer, INITIAL_STATE)

  return (
    <BookingContext.Provider value={{ shopId, state, dispatch }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking must be used inside BookingProvider")
  }
  return context
}
