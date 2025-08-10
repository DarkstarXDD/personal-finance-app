"use server"

import { revalidatePath } from "next/cache"
import * as z from "zod"

import * as pots from "@/data-access/pots"
import { potSchema, type PotSchema } from "@/lib/schemas"
import { CreateNewPotErrors } from "@/lib/types"

export async function createNewPot(
  formData: PotSchema
): Promise<CreateNewPotErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const parsed = potSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const response = await pots.createNewPot(formData)
  if (!response.success) return response.fieldErrors

  revalidatePath("/login")
  return null
}
