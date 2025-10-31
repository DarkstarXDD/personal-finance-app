import DonutChart from "@/components/ui/DonutChart"
import { type Budget } from "@/features/budgets/data-access"
import { type Transaction } from "@/features/transactions/data-access"
import { currencyFormatter } from "@/lib/utils"

type BudgetsSummaryProps = {
  budgets: (Budget & { transactions: Transaction[]; totalSpent: number })[]
}

export default function BudgetsSummary({ budgets }: BudgetsSummaryProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-start 2xl:grid-cols-1">
      <DonutChart
        chartData={budgets.map((budget) => ({
          label: budget.category.label,
          current: budget.totalSpent,
          target: budget.maximumSpend,
          color: budget.color.value,
        }))}
      />

      <ul className="@container">
        {budgets.map((budget) => (
          <SummaryItem
            key={budget.id}
            budgetCategory={budget.category.label}
            currentSpend={budget.totalSpent}
            maximumSpend={budget.maximumSpend}
            color={budget.color.value}
          />
        ))}
      </ul>
    </div>
  )
}

type SummaryItemProps = {
  budgetCategory: string
  currentSpend: number
  maximumSpend: number
  color: string
}

function SummaryItem({
  budgetCategory,
  currentSpend,
  maximumSpend,
  color,
}: SummaryItemProps) {
  return (
    <li className="border-secondary flex items-start gap-4 border-b py-4 first:pt-0 last:border-none last:pb-0 @xs:items-center">
      <span className="h-5 w-1 rounded-lg" style={{ backgroundColor: color }} />

      <div className="flex w-full flex-col gap-1 @xs:flex-row @xs:items-center @xs:justify-between">
        <span className="text-sm leading-none font-medium">
          {budgetCategory}
        </span>

        <span className="text-primary font-semibold">
          {currencyFormatter.format(Number(currentSpend))}{" "}
          <span className="text-tertiary text-xs font-medium">
            of {currencyFormatter.format(maximumSpend)}
          </span>
        </span>
      </div>
    </li>
  )
}
