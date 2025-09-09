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

export async function createTransaction(
  formData: TransactionCreate & { recurringBillId?: string }
): Promise<DALReturn<TransactionCreateErrors>> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.transaction.create({
      data: {
        userId,
        counterparty: formData.counterparty,
        amount: formData.amount,
        categoryId: formData.categoryId,
        recurringBillId: formData.recurringBillId,
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

      // Transactions count without filters applied for the global empty state
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
      where: { userId, categoryId },
      select: transactionSelect,
      orderBy: { createdAt: "desc" },
      take: 3,
    }),

    prisma.transaction.aggregate({
      where: {
        userId,
        categoryId,
        createdAt: { gte: startOfMonth(new Date()) },
      },
      _sum: { amount: true },
    }),
  ])

  return {
    transactions: transactions.map((t) => ({
      ...t,
      amount: t.amount.toString(),
    })),
    totalSpent: spent._sum.amount?.toString() ?? "0",
  }
}
