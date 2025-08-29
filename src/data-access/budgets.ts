import "server-only"

import { redirect } from "next/navigation"

import { verifySession } from "@/data-access/auth"
import { prisma } from "@/lib/prisma"

import type { BudgetCreate } from "@/lib/schemas"
import type { BudgetCreateErrors, DALReturn } from "@/lib/types"

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
