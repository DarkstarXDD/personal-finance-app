import "server-only"

import { redirect } from "next/navigation"

import { verifySession } from "@/data-access/auth"
import { Prisma, prisma } from "@/lib/prisma"
import { type TransactionCreate } from "@/lib/schemas"

import type { CreateTransactionErrors, DALReturn } from "@/lib/types"

const ITEMS_PER_PAGE = 5

export async function createTransaction(
  formData: TransactionCreate
): Promise<DALReturn<CreateTransactionErrors>> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.transaction.create({
      data: {
        userId,
        counterparty: formData.counterparty,
        amount: formData.amount,
        categoryId: formData.categoryId,
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
}

export async function getTransactions({
  query = "",
  sortby = "latest",
  category = "all",
  currentPage = 1,
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

  const [transactions, total] = await prisma.$transaction([
    prisma.transaction.findMany({
      where,
      select: transactionSelect,
      orderBy,
      take: ITEMS_PER_PAGE,
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
    }),
    prisma.transaction.count({ where }),
  ])

  return {
    transactions: transactions.map((t) => ({
      ...t,
      amount: t.amount.toString(),
    })),
    total,
  }
}

type TransactionRaw = Prisma.TransactionGetPayload<{
  select: typeof transactionSelect
}>

export type Transaction = Omit<TransactionRaw, "amount"> & {
  amount: string
}
