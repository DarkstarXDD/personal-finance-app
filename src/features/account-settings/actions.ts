"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import * as z from "zod"

import * as account from "@/features/account-settings/data-access"
import {
  passwordUpdateSchema,
  type PasswordUpdate,
} from "@/features/account-settings/schemas"
import {
  nameSchema,
  type Name,
  emailSchema,
  type Email,
} from "@/features/auth/schemas"
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

  const response = await account.updateEmail(parsed.data)
  if (!response.success) return response.fieldErrors

  revalidatePath("/account")
  return null
}

// ============================================
// ============== Update Password =============
// ============================================

export async function updatePassword(
  formData: PasswordUpdate
): Promise<PasswordUpdateErrors | null> {
  const parsed = passwordUpdateSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

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

// ============================================
// ============= Delete Account ===============
// ============================================

export async function deleteAccount(
  // Kept these two parameters to satisfy the function signature though these two are not needed
  // Not the cleanest approach, so need to check back later
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _prev: unknown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _formData: FormData
): Promise<string | undefined> {
  const response = await account.deleteAccount()
  if (!response.success) return "Error deleting account. Please try again."

  signOut()
}
