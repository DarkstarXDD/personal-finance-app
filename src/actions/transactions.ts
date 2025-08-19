"use server"

import { revalidatePath } from "next/cache"
import * as z from "zod"

import * as transactions from "@/data-access/transactions"
import { transactionCreateSchema, type TransactionCreate } from "@/lib/schemas"

import type { CreateTransactionErrors } from "@/lib/types"

export async function createTransaction(
  formData: TransactionCreate
): Promise<CreateTransactionErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const parsed = transactionCreateSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const response = await transactions.createTransaction(parsed.data)
  if (!response.success) return response.fieldErrors

  revalidatePath("/transactions")
  return null
}
