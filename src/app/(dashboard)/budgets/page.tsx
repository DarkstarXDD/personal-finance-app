import { PiChartDonutFill } from "react-icons/pi"

import PageHeader from "@/components/common/PageHeader"
import EmptyState from "@/components/empty-states/EmptyState"
import Card from "@/components/ui/Card"
import { getCategories, getColors } from "@/data-access/lookups"
import AddBudgetDialog from "@/features/budgets/components/AddBudgetDialog"
import BudgetCard from "@/features/budgets/components/BudgetCard"
import BudgetsSummary from "@/features/budgets/components/BudgetsSummary"
import { getBudgets } from "@/features/budgets/data-access"
import { getTransactionsForBudget } from "@/features/transactions/data-access"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Budgets - Personal Finance",
}

export default async function BudgetsPage() {
  const categories = await getCategories()
  const colors = await getColors()
  const budgets = await getBudgets()

  const budgetsWithTransactions = await Promise.all(
    budgets.map(async (budget) => {
      const { transactions, totalSpent } = await getTransactionsForBudget(
        budget.category.id
      )
      return { ...budget, transactions, totalSpent }
    })
  )

  return (
    <main className="@container grid gap-8">
      <PageHeader
        title="Budgets"
        description="Set monthly limits and track how much you’ve spent in each category."
        action={<AddBudgetDialog categories={categories} colors={colors} />}
      />

      {budgets.length > 0 ? (
        <div className="grid gap-6 2xl:grid-cols-[auto_1fr] 2xl:items-start">
          <Card size="lg" className="grid gap-6">
            <h2 className="text-primary text-lg leading-tight font-semibold">
              Spending Summary
            </h2>
            <BudgetsSummary budgets={budgetsWithTransactions} />
          </Card>

          <div className="grid gap-6 @5xl:grid-cols-2">
            {budgetsWithTransactions.map(async (budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                categories={categories}
                colors={colors}
              />
            ))}
          </div>
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={PiChartDonutFill}
            title="No budgets created yet"
            description="Set spending limits for different categories."
          />
        </Card>
      )}
    </main>
  )
}
