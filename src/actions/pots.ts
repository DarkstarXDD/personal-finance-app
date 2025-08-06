"use server"

import z from "zod"

import { potSchema, type PotSchema } from "@/lib/schemas"

export type CreateNewPotErrors = {
  [Key in keyof PotSchema]?: string[]
}

export async function createNewPot(
  formData: PotSchema
): Promise<CreateNewPotErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const parsed = potSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  console.log(formData)
  return null
}
