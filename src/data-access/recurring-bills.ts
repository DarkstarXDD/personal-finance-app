import "server-only"

import { redirect } from "next/navigation"

import { verifySession } from "@/data-access/auth"
import { prisma } from "@/lib/prisma"
import { TransactionCreate } from "@/lib/schemas"
import { CreateTransactionErrors, DALReturn } from "@/lib/types"

export async function createRecurringBill({
  amount,
  counterparty,
}: TransactionCreate): Promise<
  DALReturn<CreateTransactionErrors> & { recurringBillId?: string }
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

export async function getRecurringBills() {
  const userId = await verifySession()
  if (!userId) redirect("/login")
}
