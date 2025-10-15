import * as z from "zod"

// ============================================
// ========== Signup Schema and Type ==========
// ============================================

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty."),
  email: z.email("Invalid email format.").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters.").trim(),
})
export type SignupSchema = z.infer<typeof signupSchema>

// ============================================
// =========== Login Schema and Type ==========
// ============================================

export const loginSchema = z.object({
  email: z.email("Invalid email format.").toLowerCase(),
  password: z.string().trim().min(1, "Password cannot be empty."),
})
export type LoginSchema = z.infer<typeof loginSchema>

// ============================================
// ============ Id Schema and Type ============
// ============================================

export const idSchema = z.object({ id: z.cuid() })
export type IdSchema = z.infer<typeof idSchema>

// ============================================
// =========== Name Schema and Type ===========
// ============================================

export const nameSchema = signupSchema.pick({ name: true })
export type NameSchema = z.infer<typeof nameSchema>

// ============================================
// ========== Email Schema and Type ===========
// ============================================

export const emailSchema = signupSchema.pick({ email: true })
export type EmailSchema = z.infer<typeof emailSchema>

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
export type PasswordUpdateSchema = z.infer<typeof passwordUpdateSchema>

// ============================================
// ==== Transaction Create Schema and Type ====
// ============================================

export const transactionCreateSchema = z.object({
  counterparty: z.string().trim().min(1, "Counterparty name cannot be empty."),
  amount: z
    .number("Amount cannot be empty.")
    .nonnegative("Amount cannot be negative."),
  categoryId: z.cuid("Please select a category."),
  transactionType: z.enum(
    ["INCOME", "EXPENSE"],
    "Please pick a transaction type."
  ),
  isRecurring: z.boolean(),
})
export type TransactionCreate = z.infer<typeof transactionCreateSchema>

// ============================================
// ====== Budget Create Schema and Type =======
// ============================================

export const budgetCreateSchema = z.object({
  categoryId: z.cuid("Please select a category."),
  maximumSpend: z
    .number("Maximum spend cannot be empty.")
    .nonnegative("Maximum spend cannot be negative."),
  colorId: z.cuid("Please select a color."),
})
export type BudgetCreate = z.infer<typeof budgetCreateSchema>

// ============================================
// ====== Budget Update Schema and Type =======
// ============================================

export const budgetUpdateSchema = budgetCreateSchema.extend({
  id: z.cuid(),
})
export type BudgetUpdate = z.infer<typeof budgetUpdateSchema>

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
