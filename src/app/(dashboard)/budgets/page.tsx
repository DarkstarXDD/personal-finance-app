import AddBudgetDialog from "@/components/budgets/AddBudgetDialog"
import BudgetCard from "@/components/budgets/BudgetCard"
import BudgetsEmptyState from "@/components/budgets/BudgetsEmptyState"
import BudgetsSummary from "@/components/budgets/BudgetsSummary"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import { getBudgets } from "@/data-access/budgets"
import { getCategories, getColors } from "@/data-access/lookups"
import { getTransactionsForBudget } from "@/data-access/transactions"

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
    <main className="grid gap-8">
      <div className="flex items-center justify-between">
        <Heading as="h1" variant="primary">
          Budgets
        </Heading>
        <AddBudgetDialog categories={categories} colors={colors} />
      </div>

      {budgets.length > 0 ? (
        <div className="grid gap-6 2xl:grid-cols-[2fr_3fr] 2xl:items-start">
          <BudgetsSummary budgets={budgetsWithTransactions} />
          <div className="grid gap-6">
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
          <BudgetsEmptyState />
        </Card>
      )}
    </main>
  )
}
