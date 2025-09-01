"use server"

import { revalidatePath } from "next/cache"
import * as z from "zod"

import * as pots from "@/data-access/pots"
import {
  idSchema,
  potCreateSchema,
  potUpdateSchema,
  potAmountUpdateSchema,
  type PotUpdate,
  type PotCreate,
  type PotAmountUpdate,
} from "@/lib/schemas"

import type { PotCreateErrors, PotAmountUpdateErrors } from "@/lib/types"

// ============================================
// ================ Create Pot ================
// ============================================

export async function createPot(
  formData: PotCreate
): Promise<PotCreateErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const parsed = potCreateSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const response = await pots.createPot(parsed.data)
  if (!response.success) return response.fieldErrors

  revalidatePath("/pots")
  return null
}

// ============================================
// ================ Update Pot ================
// ============================================

export async function updatePot(
  formData: PotUpdate
): Promise<PotCreateErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const parsed = potUpdateSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const response = await pots.UpdatePot(parsed.data)
  if (!response.success) return response.fieldErrors

  revalidatePath("/pots")
  return null
}

// ============================================
// ================ Delete Pot ================
// ============================================

export async function deletePot(
  prev: unknown,
  formData: FormData
): Promise<string | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const potId = formData.get("potId")
  const parsed = idSchema.safeParse({ id: potId })
  if (!parsed.success) {
    return "Error deleting pot. Please try agian."
  }

  const response = await pots.deletePot(parsed.data.id)
  if (!response.success) return "Error deleting pot. Please try again."

  revalidatePath("/pots")
  return null
}

// ============================================
// ============= Add Money to Pot =============
// ============================================

export async function addToPot(
  formData: PotAmountUpdate
): Promise<PotAmountUpdateErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const parsed = potAmountUpdateSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const response = await pots.updatePotAmount(parsed.data, "increment")
  if (!response.success) return response.fieldErrors

  revalidatePath("/pots")
  return null
}

// ============================================
// ========== Withdraw Money from Pot =========
// ============================================

export async function withdrawFromPot(
  formData: PotAmountUpdate
): Promise<PotAmountUpdateErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const parsed = potAmountUpdateSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const response = await pots.updatePotAmount(parsed.data, "decrement")
  if (!response.success) return response.fieldErrors

  revalidatePath("/pots")
  return null
}
