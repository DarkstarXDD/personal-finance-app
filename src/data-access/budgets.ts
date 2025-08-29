import "server-only"

import { redirect } from "next/navigation"

import { verifySession } from "@/data-access/auth"
import { prisma, type Prisma } from "@/lib/prisma"

import type { BudgetCreate } from "@/lib/schemas"
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
// =============== Fetch Budgets ==============
// ============================================

const budgetSelect = {
  id: true,
  category: true,
  color: true,
  maximumSpend: true,
} satisfies Prisma.BudgetSelect

type BudgetRaw = Prisma.BudgetGetPayload<{ select: typeof budgetSelect }>

export type Budget = Omit<BudgetRaw, "maximumSpend"> & { maximumSpend: string }

export async function getBudgets() {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  const budgets = await prisma.budget.findMany({
    where: { userId },
    select: budgetSelect,
  })

  return budgets.map((budget) => ({
    ...budget,
    maximumSpend: budget.maximumSpend.toString(),
  }))
}
