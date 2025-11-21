import { type Metadata } from "next"
import { Suspense } from "react"

import PageHeader from "@/components/common/PageHeader"
import { getCategories, getColors } from "@/data-access/lookups"
import AddBudgetDialog from "@/features/budgets/components/AddBudgetDialog"
import Budgets from "@/features/budgets/components/Budgets"
import BudgetsLoading from "@/features/budgets/components/BudgetsLoading"

export const metadata: Metadata = {
  title: "Budgets - Personal Finance",
}

export default async function BudgetsPage() {
  const categories = await getCategories()
  const colors = await getColors()

  return (
    <main className="@container grid gap-8">
      <PageHeader
        title="Budgets"
        description="Set monthly spending limits by category. Each budget tracks spending for the current month."
        action={<AddBudgetDialog categories={categories} colors={colors} />}
      />

      <Suspense fallback={<BudgetsLoading />}>
        <Budgets />
      </Suspense>
    </main>
  )
}
