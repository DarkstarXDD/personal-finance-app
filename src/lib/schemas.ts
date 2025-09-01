import * as z from "zod"

// ============================================
// ========= Sign Up Schema and Type ==========
// ============================================

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty"),
  email: z.email("Invalid email format").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters").trim(),
})
export type SignupSchema = z.infer<typeof signupSchema>

// ============================================
// ========== Log In Schema and Type ==========
// ============================================

export const loginSchema = z.object({
  email: z.email("Invalid email format").toLowerCase(),
  password: z.string().trim().min(1, "Password cannot be empty"),
})
export type LoginSchema = z.infer<typeof loginSchema>

export const idSchema = z.object({ id: z.cuid() })
export type IdSchema = z.infer<typeof idSchema>

// ============================================
// ======== Pot Create Schema and Type ========
// ============================================

export const potCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name cannot be empty.")
    .max(30, "Name must be 30 characters or less."),
  target: z.string().trim().min(1, "Target cannot be empty."),
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
// ======== Pot Update Schema and Type ========
// ============================================

export const potAmountUpdateSchema = z.object({
  id: z.cuid(),
  amountToUpdate: z.string().trim().min(1, "Amount cannot be empty."),
})
export type PotAmountUpdate = z.infer<typeof potAmountUpdateSchema>

export const potSchema = z.object({
  potId: z.cuid(),
  name: z
    .string()
    .trim()
    .min(1, "Name cannot be empty")
    .max(30, "Name must be 30 characters or less"),
  target: z.string().trim().min(1, "Target cannot be empty"),
  currentAmount: z.string().trim().min(1, "Amount cannot be empty"),
  colorId: z.cuid("Please select a color."),
  colorValue: z.string().min(1, "Please select a color"),
})
export type PotSchema = z.infer<typeof potSchema>

export const transactionCreateSchema = z.object({
  counterparty: z.string().trim().min(1, "Counterparty name cannot be empty."),
  amount: z.string().min(1, "Amount cannot be empty."),
  categoryId: z.cuid("Please select a category."),
  isRecurring: z.boolean(),
})
export type TransactionCreate = z.infer<typeof transactionCreateSchema>

// ============================================
// ====== Budget Create Schema and Type =======
// ============================================

export const budgetCreateSchema = z.object({
  categoryId: z.cuid("Please select a category."),
  maximumSpend: z.string().min(1, "Maximum spend cannot be empty."),
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
