import * as z from "zod"

export const potCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name cannot be empty.")
    .max(30, "Name must be 30 characters or less."),
  target: z
    .number("Target cannot be empty.")
    .nonnegative("Target cannot be negative."),
  colorId: z.cuid("Please select a color."),
})
export type PotCreate = z.infer<typeof potCreateSchema>

export const potUpdateSchema = potCreateSchema.extend({
  id: z.cuid(),
})
export type PotUpdate = z.infer<typeof potUpdateSchema>

export const potAmountUpdateSchema = z.object({
  id: z.cuid(),
  amountToUpdate: z
    .number("Amount cannot be empty.")
    .nonnegative("Amount cannot be negative."),
})
export type PotAmountUpdate = z.infer<typeof potAmountUpdateSchema>
