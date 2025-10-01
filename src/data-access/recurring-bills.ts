import "server-only"

import { redirect } from "next/navigation"

import { verifySession } from "@/data-access/auth"
import {
  getBillMonthlyStatus,
  getDaysUntilDue,
  getDueDate,
  getMonthlySummary,
  type BillMonthlyStatus,
} from "@/lib/helpers/recurring-bills"
import { prisma, type Prisma } from "@/lib/prisma"
import { TransactionCreate } from "@/lib/schemas"
import { TransactionCreateErrors, DALReturn } from "@/lib/types"

// ============================================
// =========== Create Recurring Bill ==========
// ============================================

export async function createRecurringBill({
  amount,
  counterparty,
}: TransactionCreate): Promise<
  DALReturn<TransactionCreateErrors> & { recurringBillId?: string }
> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    const result = await prisma.recurringBill.create({
      data: {
        userId,
        counterparty,
        amount,
      },
      select: { id: true },
    })
    return { success: true, recurringBillId: result.id }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      fieldErrors: {
        counterparty: ["Error creating transaction. Please try again."],
      },
    }
  }
}

// ============================================
// =========== Fetch Recurring Bills ==========
// ============================================

const recurringBillSelect = {
  id: true,
  counterparty: true,
  amount: true,
  createdAt: true,
} satisfies Prisma.RecurringBillSelect

type RecurringBillRaw = Prisma.RecurringBillGetPayload<{
  select: typeof recurringBillSelect
}>

export type RecurringBill = Omit<RecurringBillRaw, "amount"> & {
  amount: string
  dueDate: Date
  daysUntilDue: number
  monthlyStatus: BillMonthlyStatus
}

type GetRecurringBillsParams = {
  query?: string
  sortby?: string
}

export async function getRecurringBills({
  query = "",
  sortby = "daysAsc",
}: GetRecurringBillsParams) {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  let orderBy: Prisma.RecurringBillOrderByWithRelationInput

  switch (sortby) {
    case "latest":
      orderBy = { createdAt: "desc" }
      break
    case "oldest":
      orderBy = { createdAt: "asc" }
      break
    case "asc":
      orderBy = { counterparty: "asc" }
      break
    case "desc":
      orderBy = { counterparty: "desc" }
      break
    case "highest":
      orderBy = { amount: "desc" }
      break
    case "lowest":
      orderBy = { amount: "asc" }
      break
    default:
      orderBy = { createdAt: "desc" }
  }

  // Prisma queries
  const [allRecurringBills, filteredRecurringBills, recurringBillsSummary] =
    await prisma.$transaction([
      prisma.recurringBill.findMany({
        where: { userId },
        select: recurringBillSelect,
      }),

      prisma.recurringBill.findMany({
        where: {
          userId,
          counterparty: { contains: query, mode: "insensitive" },
        },
        orderBy: orderBy,
        select: recurringBillSelect,
      }),

      prisma.recurringBill.aggregate({
        where: { userId },
        _sum: { amount: true },
        _count: { _all: true },
      }),
    ])

  // Include dueDate and daysUntilDue after fetching
  const allRecurringBillsEnriched = allRecurringBills.map((recurringBill) => {
    const amount = recurringBill.amount.toString()
    const dueDate = getDueDate(recurringBill.createdAt)
    return {
      ...recurringBill,
      amount,
      dueDate,
      daysUntilDue: getDaysUntilDue(dueDate),
      monthlyStatus: getBillMonthlyStatus(dueDate),
    }
  })

  // Include dueDate and daysUntilDue after fetching
  const filteredRecurringBillsEnriched = filteredRecurringBills.map(
    (recurringBill) => {
      const amount = recurringBill.amount.toString()
      const dueDate = getDueDate(recurringBill.createdAt)
      return {
        ...recurringBill,
        amount,
        dueDate,
        daysUntilDue: getDaysUntilDue(dueDate),
        monthlyStatus: getBillMonthlyStatus(dueDate),
      }
    }
  )

  // Sort the list based on the daysUntilDue
  if (sortby === "daysAsc") {
    filteredRecurringBillsEnriched.sort(
      (a, b) => a.daysUntilDue - b.daysUntilDue
    )
  } else if (sortby === "daysDesc") {
    filteredRecurringBillsEnriched.sort(
      (a, b) => b.daysUntilDue - a.daysUntilDue
    )
  }

  return {
    recurringBills: filteredRecurringBillsEnriched,
    summary: {
      sum: recurringBillsSummary._sum.amount?.toString(),
      count: recurringBillsSummary._count._all,
      monthlySummary: getMonthlySummary(allRecurringBillsEnriched),
    },
  }
}
