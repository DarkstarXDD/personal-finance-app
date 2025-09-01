"use server"

import { revalidatePath } from "next/cache"
import * as z from "zod"

import * as pots from "@/data-access/pots"
import {
  idSchema,
  potSchema,
  potCreateSchema,
  potUpdateSchema,
  PotUpdateSchema,
  type PotSchema,
  type PotCreate,
} from "@/lib/schemas"

import type { CreateNewPotErrors, PotUpdateErrors } from "@/lib/types"

// ============================================
// ================ Create Pot ================
// ============================================

export async function createNewPot(
  formData: PotCreate
): Promise<CreateNewPotErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const parsed = potCreateSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const response = await pots.createNewPot(parsed.data)
  if (!response.success) return response.fieldErrors

  revalidatePath("/pots")
  return null
}

export async function editPot(
  formData: Omit<PotSchema, "currentAmount" | "colorValue">
): Promise<CreateNewPotErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const parsed = potSchema
    .omit({ currentAmount: true, colorValue: true })
    .safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const response = await pots.editPot(parsed.data)
  if (!response.success) return response.fieldErrors

  revalidatePath("/pots")
  return null
}

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

export async function AddToPot(
  formData: PotUpdateSchema
): Promise<PotUpdateErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const parsed = potUpdateSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const response = await pots.updatePotAmount(parsed.data, "increment")
  if (!response.success) return response.fieldErrors

  revalidatePath("/pots")
  return null
}

export async function withdrawFromPot(
  formData: PotUpdateSchema
): Promise<PotUpdateErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const parsed = potUpdateSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const response = await pots.updatePotAmount(parsed.data, "decrement")
  if (!response.success) return response.fieldErrors

  revalidatePath("/pots")
  return null
}
