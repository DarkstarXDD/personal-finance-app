import Card from "@/components/ui/Card"
import { getCategories, getColors } from "@/data-access/lookups"
import BudgetCard from "@/features/budgets/components/BudgetCard"
import BudgetsEmptyState from "@/features/budgets/components/BudgetsEmptyState"
import BudgetsSummary from "@/features/budgets/components/BudgetsSummary"
import { getBudgets } from "@/features/budgets/data-access"
import { getTransactionsForBudget } from "@/features/transactions/data-access"

export default async function Budgets() {
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

  if (budgets.length === 0) return <BudgetsEmptyState />

  return (
    <div className="grid items-start gap-6 @6xl:grid-cols-[2fr_5fr]">
      <Card size="lg" className="@container grid content-start gap-8">
        <h2 className="text-primary text-lg leading-tight font-semibold">
          Budgets Summary
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
  )
}
