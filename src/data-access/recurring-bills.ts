import "server-only"

import { redirect } from "next/navigation"

import { verifySession } from "@/data-access/auth"
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
        dueDayOfMonth: 20,
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

const recurringBillsSelect = {
  id: true,
  counterparty: true,
  dueDayOfMonth: true,
  amount: true,
} satisfies Prisma.RecurringBillSelect

type RecurringBillRaw = Prisma.RecurringBillGetPayload<{
  select: typeof recurringBillsSelect
}>

export type RecurringBill = Omit<RecurringBillRaw, "amount"> & {
  amount: string
}

type GetRecurringBillsParams = {
  query?: string
  sortby?: string
}

export async function getRecurringBills({
  query,
  sortby = "latest",
}: GetRecurringBillsParams) {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  let orderBy: Prisma.RecurringBillOrderByWithRelationInput

  switch (sortby) {
    case "latest":
      orderBy = { dueDayOfMonth: "asc" }
      break
    case "oldest":
      orderBy = { dueDayOfMonth: "desc" }
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
      orderBy = { dueDayOfMonth: "asc" }
  }

  const [recurringBills, unfilteredItemCount] = await prisma.$transaction([
    prisma.recurringBill.findMany({
      where: { userId, counterparty: { contains: query, mode: "insensitive" } },
      orderBy: orderBy,
      select: recurringBillsSelect,
    }),

    // Recurring bill count without filters applied, for the global empty state
    prisma.recurringBill.count({ where: { userId } }),
  ])

  return {
    recurringBills: recurringBills.map((recurringBill) => ({
      ...recurringBill,
      amount: recurringBill.amount.toString(),
    })),
    totalItemsWithoutFiltering: unfilteredItemCount,
  }
}
