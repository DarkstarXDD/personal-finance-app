import "server-only"

import { redirect } from "next/navigation"

import { verifySession } from "@/data-access/auth"
import { Prisma, prisma } from "@/lib/prisma"
import { type TransactionCreate } from "@/lib/schemas"

import type { CreateTransactionErrors, DALReturn } from "@/lib/types"

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

export type Transaction = Prisma.TransactionGetPayload<{
  select: typeof transactionSelect
}>

export async function getTransactions() {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  const transactions = await prisma.transaction.findMany({
    where: { userId },
    select: transactionSelect,
  })
  return transactions
}
