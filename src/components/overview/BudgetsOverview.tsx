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
    </Card>
  )
}
