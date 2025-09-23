import { lastDayOfMonth, differenceInCalendarDays } from "date-fns"

export function getDueDate(subscriptionStartDate: Date) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const createdDay = subscriptionStartDate.getDate()
  const lastDayOfCurrentMonth = lastDayOfMonth(new Date(year, month))

  const day = Math.min(lastDayOfCurrentMonth.getDate(), createdDay)

  const dueDate = new Date(year, month, day)

  return dueDate
}

export function getDaysUntilDue(dueDate: Date) {
  const today = new Date()

  return differenceInCalendarDays(dueDate, today)
}
