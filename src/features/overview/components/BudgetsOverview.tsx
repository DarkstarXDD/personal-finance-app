import { PiChartDonutFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import BudgetsSummary from "@/features/budgets/components/BudgetsSummary"
import { getBudgets } from "@/features/budgets/data-access"
import { getTransactionsForBudget } from "@/features/transactions/data-access"

export default async function BudgetsOverview() {
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
    <Card className="grid content-start gap-8 shadow-none">
      <div className="flex items-center justify-between">
        <Heading as="h2" variant="secondary">
          Budgets
        </Heading>
        <Link
          withIcon
          href="/budgets"
          className="flex items-center justify-between"
        >
          See Details
        </Link>
      </div>

      {budgets.length > 0 ? (
        <BudgetsSummary budgets={budgetsWithTransactions} />
      ) : (
        <EmptyState
          icon={PiChartDonutFill}
          title="No budgets created yet"
          description="Set spending limits for different categories."
        />
      )}
    </Card>
  )
}
