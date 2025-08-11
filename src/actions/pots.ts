"use server"

import { revalidatePath } from "next/cache"
import * as z from "zod"

import * as pots from "@/data-access/pots"
import { potSchema, type PotSchema, idSchema } from "@/lib/schemas"
import { CreateNewPotErrors } from "@/lib/types"

export async function createNewPot(
  formData: PotSchema
): Promise<CreateNewPotErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const parsed = potSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const response = await pots.createNewPot(formData)
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
  if (!response.success) return "Error deleting pot. Please try agian."

  revalidatePath("/pots")
  return null
}
