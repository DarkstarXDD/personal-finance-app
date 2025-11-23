"use server"

import { revalidatePath } from "next/cache"

import * as recurringBills from "@/features/recurring-bills/data-access"
import { idSchema } from "@/lib/schemas"

export async function deleteRecurringBill(
  prev: unknown,
  formData: FormData
): Promise<string | null> {
  const recurringBillId = formData.get("itemId")
  const parsed = idSchema.safeParse({ id: recurringBillId })
  if (!parsed.success) {
    return "Error deleting bill. Please try agian."
  }

  const response = await recurringBills.deleteRecurringBill(parsed.data.id)
  if (!response.success) return response.message

  revalidatePath("/recurring-bills")
  return null
}
