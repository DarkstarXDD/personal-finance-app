import Card from "@/components/ui/Card"
import DonutChart from "@/components/ui/DonutChart"
import Heading from "@/components/ui/Heading"
import { currencyFormatter } from "@/lib/utils"

import type { Budget } from "@/data-access/budgets"
import type { Transaction } from "@/data-access/transactions"

export default function BudgetsSummary({
  budgets,
}: {
  budgets: (Budget & { transactions: Transaction[]; totalSpent: number })[]
}) {
  return (
    <Card className="grid gap-6">
      <Heading as="h2" variant="secondary">
        Spending Summary
      </Heading>

      <div className="grid gap-6 md:grid-cols-2 md:items-center 2xl:grid-cols-1">
        <DonutChart
          chartData={budgets.map((budget) => ({
            label: budget.category.label,
            current: budget.totalSpent,
            target: budget.maximumSpend,
            color: budget.color.value,
          }))}
        />
        <dl>
          {budgets.map((budget) => (
            <SummaryItem
              key={budget.id}
              budgetCategory={budget.category.label}
              currentSpend={budget.totalSpent}
              maximumSpend={budget.maximumSpend}
              color={budget.color.value}
            />
          ))}
        </dl>
      </div>
    </Card>
  )
}

function SummaryItem({
  budgetCategory,
  currentSpend,
  maximumSpend,
  color,
}: {
  budgetCategory: string
  currentSpend: number
  maximumSpend: number
  color: string
}) {
  return (
    <div className="border-grey-100 flex items-center gap-4 border-b pt-4 pb-4 first:pt-0 last:border-none last:pb-0">
      <span className="h-5 w-1 rounded-lg" style={{ backgroundColor: color }} />
      <dt className="text-grey-500 text-sm leading-normal font-normal">
        {budgetCategory}
      </dt>
      <dd className="text-grey-900 ml-auto text-base leading-normal font-bold">
        {currencyFormatter.format(Number(currentSpend))}{" "}
        <span className="text-grey-500 text-xs leading-normal font-normal">
          of {currencyFormatter.format(maximumSpend)}
        </span>
      </dd>
    </div>
  )
}
