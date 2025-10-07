"use server"

import { revalidatePath } from "next/cache"

import * as recurringBills from "@/data-access/recurring-bills"
import { idSchema } from "@/lib/schemas"

export async function deleteRecurringBill(
  prev: unknown,
  formData: FormData
): Promise<string | null> {
  const recurringBillId = formData.get("recurringBillId")
  const parsed = idSchema.safeParse({ id: recurringBillId })
  if (!parsed.success) {
    return "Error deleting bill. Please try agian."
  }

  const response = await recurringBills.deleteRecurringBill(parsed.data.id)
  if (!response.success) return "Error deleting pot. Please try again."

  revalidatePath("/recurring-bills")
  return null
}
