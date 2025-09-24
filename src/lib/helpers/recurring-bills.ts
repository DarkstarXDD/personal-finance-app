import {
  lastDayOfMonth,
  differenceInCalendarDays,
  addMonths,
  isSameMonth,
} from "date-fns"

// ============================================
// ============ Get Bill Due Date =============
// ============================================

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

// ============================================
// =========== Get Days Until Due =============
// ============================================

export function getDaysUntilDue(dueDate: Date) {
  const today = new Date()
  return differenceInCalendarDays(dueDate, today)
}

// ============================================
// ========= Get Bill Monthly Status ==========
// ============================================

type BillMonthlyStatus = "paid" | "upcoming" | "dueSoon"

export function getBillMonthlyStatus(dueDate: Date): BillMonthlyStatus {
  const today = new Date()
  const daysUntilDue = getDaysUntilDue(dueDate)

  // 1. If due date is next month => already paid
  if (!isSameMonth(today, dueDate)) {
    return "paid"
  }

  // 2. If due date is this month but not within 7 days => upcoming
  if (daysUntilDue > 7) {
    return "upcoming"
  }

  // 3. If due date is within 7 days and same month => dueSoon
  if (daysUntilDue <= 7 && daysUntilDue >= 0) {
    return "dueSoon"
  }

  // 4. If already passed this month => consider it paid
  return "paid"
}
