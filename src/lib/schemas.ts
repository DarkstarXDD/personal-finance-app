import * as z from "zod"

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty"),
  email: z.email("Invalid email format").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters").trim(),
})
export type SignupSchema = z.infer<typeof signupSchema>

export const loginSchema = z.object({
  email: z.email("Invalid email format").toLowerCase(),
  password: z.string().trim().min(1, "Password cannot be empty"),
})
export type LoginSchema = z.infer<typeof loginSchema>

export const idSchema = z.object({ id: z.cuid() })
export type IdSchema = z.infer<typeof idSchema>

export const potSchema = z.object({
  potId: z.cuid(),
  name: z
    .string()
    .trim()
    .min(1, "Name cannot be empty")
    .max(30, "Name must be 30 characters or less"),
  target: z.string().min(1, "Target cannot be empty"),
  currentAmount: z.string().trim().min(1, "Amount cannot be empty"),
  colorId: z.cuid(),
  colorValue: z.string().min(1, "Please select a color"),
})
export type PotSchema = z.infer<typeof potSchema>

export const potUpdateSchema = z.object({
  potId: z.cuid(),
  amountToUpdate: z.string().trim().min(1, "Amount cannot be empty."),
})
export type PotUpdateSchema = z.infer<typeof potUpdateSchema>
