import "server-only"

import { redirect } from "next/navigation"

import {
  type BudgetCreate,
  type BudgetUpdate,
} from "@/features/budgets/schemas"
import { DEMO_ACCOUNT_ERROR_MESSAGE } from "@/lib/constants"
import { prisma, Prisma } from "@/lib/prisma"
import { verifySession } from "@/lib/session"
import {
  type DALReturn,
  type DALDeleteItemReurn,
  type BudgetCreateErrors,
} from "@/lib/types"

// ============================================
// =============== Create Budget ==============
// ============================================

export async function createBudget({
  categoryId,
  maximumSpend,
  colorId,
}: BudgetCreate): Promise<DALReturn<BudgetCreateErrors>> {
  const session = await verifySession()
  if (!session) redirect("/login")

  if (session.role === "DEMO") {
    return {
      success: false,
      fieldErrors: { categoryId: [DEMO_ACCOUNT_ERROR_MESSAGE] },
    }
  }

  try {
    await prisma.budget.create({
      data: { userId: session.userId, categoryId, maximumSpend, colorId },
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
  const session = await verifySession()
  if (!session) redirect("/login")

  if (session.role === "DEMO") {
    return {
      success: false,
      fieldErrors: { categoryId: [DEMO_ACCOUNT_ERROR_MESSAGE] },
    }
  }

  try {
    await prisma.budget.update({
      where: { userId: session.userId, id },
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
): Promise<DALDeleteItemReurn> {
  const session = await verifySession()
  if (!session) redirect("/login")

  if (session.role === "DEMO") {
    return { success: false, message: DEMO_ACCOUNT_ERROR_MESSAGE }
  }

  try {
    await prisma.budget.delete({
      where: { userId: session.userId, id: budgetId },
    })
    return { success: true }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      message: "Error deleting budget. Please try agian.",
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

export type Budget = Omit<BudgetRaw, "maximumSpend"> & { maximumSpend: number }

export async function getBudgets(take?: number) {
  const session = await verifySession()
  if (!session) redirect("/login")

  // await new Promise((resolve) => setTimeout(resolve, 4000))

  const budgets = await prisma.budget.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    take: take,
    select: budgetSelect,
  })

  return budgets.map((budget) => ({
    ...budget,
    maximumSpend: budget.maximumSpend.toNumber(),
  }))
}
