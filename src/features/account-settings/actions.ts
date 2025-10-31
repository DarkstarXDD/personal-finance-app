"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import * as z from "zod"

import * as account from "@/features/account-settings/data-access"
import {
  nameSchema,
  type Name,
  emailSchema,
  type Email,
} from "@/features/auth/schemas"
import { passwordUpdateSchema, type PasswordUpdateSchema } from "@/lib/schemas"
import {
  EmailUpdateErrors,
  NameUpdateErrors,
  PasswordUpdateErrors,
} from "@/lib/types"

// ============================================
// ================ Update Name ===============
// ============================================

export async function updateName(
  formData: Name
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
  formData: Email
): Promise<EmailUpdateErrors | null> {
  const parsed = emailSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  await new Promise((resolve) => setTimeout(resolve, 3000))

  const response = await account.updateEmail(parsed.data)
  if (!response.success) return response.fieldErrors

  revalidatePath("/account")
  return null
}

// ============================================
// ============== Update Password =============
// ============================================

export async function updatePassword(
  formData: PasswordUpdateSchema
): Promise<PasswordUpdateErrors | null> {
  const parsed = passwordUpdateSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  await new Promise((resolve) => setTimeout(resolve, 3000))

  const response = await account.updatePassword(parsed.data)
  if (!response.success) return response.fieldErrors

  revalidatePath("/account")
  return null
}

// ============================================
// ================= Sign Out =================
// ============================================

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  redirect("/login")
}
