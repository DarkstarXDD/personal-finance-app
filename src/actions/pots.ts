"use server"

import { revalidatePath } from "next/cache"
import * as z from "zod"

import * as pots from "@/data-access/pots"
import {
  idSchema,
  potSchema,
  potUpdateSchema,
  PotUpdateSchema,
  type PotSchema,
} from "@/lib/schemas"

import type { CreateNewPotErrors, AddToPotErrors } from "@/lib/types"

export async function createNewPot(
  formData: Pick<PotSchema, "name" | "target" | "colorId">
): Promise<CreateNewPotErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const parsed = potSchema
    .pick({ name: true, target: true, colorId: true })
    .safeParse(formData)
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
): Promise<AddToPotErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const parsed = potUpdateSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const response = await pots.AddToPot(parsed.data)
  if (!response.success) return response.fieldErrors

  revalidatePath("/pots")
  return null
}

export async function withdrawFromPot(
  formData: PotUpdateSchema
): Promise<AddToPotErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const parsed = potUpdateSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const response = await pots.withdrawFromPot(parsed.data)
  if (!response.success) return response.fieldErrors

  revalidatePath("/pots")
  return null
}
