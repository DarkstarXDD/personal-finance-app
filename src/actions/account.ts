"use server"

import { revalidatePath } from "next/cache"
import * as z from "zod"

import * as account from "@/data-access/account"
import {
  nameSchema,
  type NameSchema,
  emailSchema,
  type EmailSchema,
} from "@/lib/schemas"
import { EmailUpdateErrors, NameUpdateErrors } from "@/lib/types"

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

// ============================================
// ================ Update Email ==============
// ============================================

export async function updateEmail(
  formData: EmailSchema
): Promise<EmailUpdateErrors | null> {
  const parsed = emailSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  await new Promise((resolve) => setTimeout(resolve, 3000))

  const response = await account.updateEmail(parsed.data)
  if (!response.success) return response.fieldErrors

  revalidatePath("/account")
  return null
}
