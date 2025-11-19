import * as z from "zod"

// ============================================
// ============ Id Schema and Type ============
// ============================================

export const idSchema = z.object({ id: z.cuid() })
export type Id = z.infer<typeof idSchema>

// ============================================
// ===== Password Update Schema and Type ======
// ============================================

export const passwordUpdateSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .trim(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: "Passowrds don't match.",
    path: ["confirmPassword"],
  })
export type PasswordUpdate = z.infer<typeof passwordUpdateSchema>

// ============================================
// ======== Pot Create Schema and Type ========
// ============================================

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

// ============================================
// ======== Pot Update Schema and Type ========
// ============================================

export const potUpdateSchema = potCreateSchema.extend({
  id: z.cuid(),
})
export type PotUpdate = z.infer<typeof potUpdateSchema>

// ============================================
// ===== Pot Amount Update Schema and Type ====
// ============================================

export const potAmountUpdateSchema = z.object({
  id: z.cuid(),
  amountToUpdate: z
    .number("Amount cannot be empty.")
    .nonnegative("Amount cannot be negative."),
})
export type PotAmountUpdate = z.infer<typeof potAmountUpdateSchema>
