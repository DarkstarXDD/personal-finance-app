import "server-only"

import { redirect } from "next/navigation"

import { verifySession } from "@/data-access/auth"
import { prisma, Prisma } from "@/lib/prisma"

import type { BudgetCreate, BudgetUpdate } from "@/lib/schemas"
import type { BudgetCreateErrors, DALReturn } from "@/lib/types"

// ============================================
// =============== Create Budget ==============
// ============================================

export async function createBudget({
  categoryId,
  maximumSpend,
  colorId,
}: BudgetCreate): Promise<DALReturn<BudgetCreateErrors>> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.budget.create({
      data: { userId, categoryId, maximumSpend, colorId },
    })
    return { success: true }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      fieldErrors: { categoryId: ["Error creating budget."] },
    }
  }
}

// ============================================
// =============== Update Budget ==============
// ============================================

export async function updateBudget({
  id,
  categoryId,
  maximumSpend,
  colorId,
}: BudgetUpdate): Promise<DALReturn<BudgetCreateErrors>> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.budget.update({
      where: { userId, id },
      data: { categoryId, maximumSpend, colorId },
    })
    return { success: true }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      fieldErrors: { categoryId: ["Error updating budget."] },
    }
  }
}

// ============================================
// =============== Delete Budget ==============
// ============================================

export async function deleteBudget(
  budgetId: string
): Promise<{ success: boolean }> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.budget.delete({ where: { userId, id: budgetId } })
    return { success: true }
  } catch (e) {
    console.error(e)
    return { success: false }
  }
}

// ============================================
// =============== Fetch Budgets ==============
// ============================================

const budgetSelect = {
  id: true,
  category: true,
  color: true,
  maximumSpend: true,
} satisfies Prisma.BudgetSelect

type BudgetRaw = Prisma.BudgetGetPayload<{ select: typeof budgetSelect }>

export type Budget = Omit<BudgetRaw, "maximumSpend"> & { maximumSpend: number }

export async function getBudgets(take?: number) {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  // await new Promise((resolve) => setTimeout(resolve, 4000))

  const budgets = await prisma.budget.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: take,
    select: budgetSelect,
  })

  return budgets.map((budget) => ({
    ...budget,
    maximumSpend: budget.maximumSpend.toNumber(),
  }))
}
