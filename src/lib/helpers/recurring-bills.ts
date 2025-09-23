import { lastDayOfMonth, differenceInCalendarDays, addMonths } from "date-fns"

export function getDueDate(subscriptionStartDate: Date) {
  // If the bill was first created on a 31st, in months 31st
  // does not exist, the bill will happen on 30th.
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  // 1. Find the created day (the exact day the bill was first created)
  const createdDay = subscriptionStartDate.getDate()

  // 2. Find the last day of the current month
  const lastDayOfCurrentMonth = lastDayOfMonth(new Date(year, month))

  // 3. Use whichever is the minimum from the above two.
  const day = Math.min(lastDayOfCurrentMonth.getDate(), createdDay)

  let dueDate = new Date(year, month, day)

  // If the due date is already passed for the current month
  // add 1 month to it and return the due date of the next month
  const daysUntilDue = getDaysUntilDue(dueDate)
  if (daysUntilDue < 0) {
    dueDate = addMonths(dueDate, 1)
  }

  return dueDate
}

export function getDaysUntilDue(dueDate: Date) {
  const today = new Date()

  return differenceInCalendarDays(dueDate, today)
}
