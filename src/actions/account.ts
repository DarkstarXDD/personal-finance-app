"use server"

import { revalidatePath } from "next/cache"
import * as z from "zod"

import * as account from "@/data-access/account"
import { nameSchema, type NameSchema } from "@/lib/schemas"
import { NameUpdateErrors } from "@/lib/types"

// ============================================
// ================ Update Name ===============
// ============================================

export async function updateName(
  formData: NameSchema
): Promise<NameUpdateErrors | null> {
  const parsed = nameSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  await new Promise((resolve) => setTimeout(resolve, 3000))

  const response = await account.updateName(parsed.data)
  if (!response.success) return response.fieldErrors

  revalidatePath("/account")
  return null
}
