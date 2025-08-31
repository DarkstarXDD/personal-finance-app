"use server"

import { revalidatePath } from "next/cache"
import * as z from "zod"

import * as budgets from "@/data-access/budgets"
import {
  budgetCreateSchema,
  budgetUpdateSchema,
  type BudgetCreate,
  type BudgetUpdate,
} from "@/lib/schemas"

import type { BudgetCreateErrors } from "@/lib/types"

// ============================================
// =============== Create Budget ==============
// ============================================

export async function createBudget(
  formData: BudgetCreate
): Promise<BudgetCreateErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const parsed = budgetCreateSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const response = await budgets.createBudget(parsed.data)
  if (!response.success) return response.fieldErrors

  revalidatePath("/budgets")
  return null
}

// ============================================
// =============== Update Budget ==============
// ============================================

export async function updateBudget(
  formData: BudgetUpdate
): Promise<BudgetCreateErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const parsed = budgetUpdateSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const response = await budgets.updateBudget(parsed.data)
  if (!response.success) return response.fieldErrors

  revalidatePath("/budgets")
  return null
}
