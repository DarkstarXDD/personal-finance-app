import { Suspense } from "react"
import { PiChartDonutFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import Card from "@/components/ui/Card"
import Link from "@/components/ui/Link"
import BudgetsSummary from "@/features/budgets/components/BudgetsSummary"
import BudgetsSummaryLoading from "@/features/budgets/components/BudgetsSummaryLoading"
import { getBudgets } from "@/features/budgets/data-access"
import { getTransactionsForBudget } from "@/features/transactions/data-access"

export default function BudgetsOverview() {
  return (
    <Card size="md" className="grid content-start gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-primary text-xl leading-tight font-semibold">
          Budgets
        </h2>

        <Link withIcon href="/budgets">
          See Details
        </Link>
      </div>

      <div className="@container">
        <Suspense fallback={<BudgetsSummaryLoading />}>
          <Budgets />
        </Suspense>
      </div>
    </Card>
  )
}

async function Budgets() {
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
    <>
      {budgets.length > 0 ? (
        <BudgetsSummary budgets={budgetsWithTransactions} />
      ) : (
        <EmptyState
          icon={PiChartDonutFill}
          title="No budgets created yet"
          description="Set spending limits for different categories."
        />
      )}
    </>
  )
}
