import "server-only"

import { startOfMonth } from "date-fns"
import { redirect } from "next/navigation"

import { verifySession } from "@/data-access/auth"
import { ITEMS_PER_PAGE } from "@/lib/constants"
import { Prisma, prisma } from "@/lib/prisma"

import type { TransactionCreate } from "@/lib/schemas"
import type { TransactionCreateErrors, DALReturn } from "@/lib/types"

// ============================================
// ============ Create Transaction ============
// ============================================

export async function createTransaction({
  counterparty,
  amount,
  categoryId,
  transactionType,
  recurringBillId,
}: TransactionCreate & { recurringBillId?: string }): Promise<
  DALReturn<TransactionCreateErrors>
> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.transaction.create({
      data: {
        userId,
        counterparty,
        amount,
        categoryId,
        transactionType,
        recurringBillId: recurringBillId,
      },
    })
    return { success: true }
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
// ============ Fetch Transactions ============
// ============================================

const transactionSelect = {
  id: true,
  createdAt: true,
  counterparty: true,
  amount: true,
  category: true,
  transactionType: true,
} satisfies Prisma.TransactionSelect

type GetTransactionsParams = {
  query?: string
  sortby?: string
  category?: string
  currentPage?: number
  take?: number
}

export async function getTransactions({
  query = "",
  sortby = "latest",
  category = "all",
  currentPage = 1,
  take,
}: GetTransactionsParams) {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  let orderBy: Prisma.TransactionOrderByWithRelationInput

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

  const where: Prisma.TransactionWhereInput = {
    userId,
    category: { name: category != "all" ? category : undefined },
    counterparty: { contains: query, mode: "insensitive" },
  }

  const [transactions, filteredItemCount, unfilteredItemCount] =
    await prisma.$transaction([
      prisma.transaction.findMany({
        where,
        select: transactionSelect,
        orderBy,
        take: take ?? ITEMS_PER_PAGE,
        skip: (currentPage - 1) * ITEMS_PER_PAGE,
      }),

      // Transactions count with filters applied
      prisma.transaction.count({ where }),

      // Transactions count without filters applied, for the global empty state
      prisma.transaction.count({ where: { userId } }),
    ])

  const totalPages = Math.ceil(filteredItemCount / ITEMS_PER_PAGE)

  return {
    transactions: transactions.map((t) => ({
      ...t,
      amount: t.amount.toString(),
    })),
    pagination: { totalPages },
    totalItemsWithoutFiltering: unfilteredItemCount,
  }
}

type TransactionRaw = Prisma.TransactionGetPayload<{
  select: typeof transactionSelect
}>

export type Transaction = Omit<TransactionRaw, "amount"> & {
  amount: string
}

// ============================================
// ======= Fetch Transactions for Budget ======
// ============================================

// The returned "transaction" from the below function
// has the same shape as "type Transaction" from above
// because the same "transactionSelect" object is used as above.

export async function getTransactionsForBudget(categoryId: string) {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  const [transactions, spent] = await prisma.$transaction([
    prisma.transaction.findMany({
      where: {
        userId,
        categoryId,
        createdAt: { gte: startOfMonth(new Date()) },
        transactionType: "EXPENSE",
      },
      select: transactionSelect,
      orderBy: { createdAt: "desc" },
      take: 3,
    }),

    prisma.transaction.aggregate({
      where: {
        userId,
        categoryId,
        createdAt: { gte: startOfMonth(new Date()) },
        transactionType: "EXPENSE",
      },
      _sum: { amount: true },
    }),
  ])

  return {
    transactions: transactions.map((t) => ({
      ...t,
      amount: t.amount.toString(),
    })),
    totalSpent: spent._sum.amount?.toNumber() ?? 0,
  }
}

// ============================================
// ========== Fetch Transaction Totals ========
// ============================================

export async function getTransactionTotals() {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  const groupedTotals = await prisma.transaction.groupBy({
    by: "transactionType",
    where: { userId },
    _sum: { amount: true },
  })

  let income = 0
  let expense = 0

  for (const g of groupedTotals) {
    if (g.transactionType === "INCOME") income = Number(g._sum.amount)
    if (g.transactionType === "EXPENSE") expense = Number(g._sum.amount)
  }

  const currentBalance = income - expense

  return { currentBalance, income, expense }
}
