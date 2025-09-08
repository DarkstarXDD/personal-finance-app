import { PiChartDonutFill } from "react-icons/pi"

import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import { Metrics, MetricItem } from "@/components/ui/Metrics"
import { getBudgets } from "@/data-access/budgets"
import { currencyFormatter } from "@/lib/utils"

export default async function BudgetsOverview() {
  const budgets = await getBudgets(4)

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
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div className="bg-cyan size-60 justify-self-center rounded-full" />

          <Metrics className="grid grid-cols-2 gap-4 md:grid-cols-1">
            {budgets.map((budget) => (
              <MetricItem
                key={budget.id}
                label={budget.category.label}
                value={currencyFormatter.format(Number(budget.maximumSpend))}
                color={budget.color.value}
              />
            ))}
          </Metrics>
        </div>
      ) : (
        <BudgetsEmptyState />
      )}
    </Card>
  )
}

function BudgetsEmptyState() {
  return (
    <div className="grid justify-items-center gap-3 py-12 text-center">
      <div className="bg-beige-100 flex h-16 w-16 items-center justify-center rounded-full">
        <PiChartDonutFill className="text-grey-500 size-8" />
      </div>
      <Heading as="h3" variant="secondary">
        No budgets created yet
      </Heading>
      <p className="text-grey-500 text-sm leading-normal font-normal">
        Set spending limits for different categories.
      </p>
    </div>
  )
}
