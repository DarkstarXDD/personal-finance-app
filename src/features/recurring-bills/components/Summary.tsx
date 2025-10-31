import Card from "@/components/ui/Card"
import { type Summary } from "@/features/recurring-bills/data-access"
import { currencyFormatter } from "@/lib/utils"

export default function Summary({ summary }: { summary: Summary }) {
  const today = new Date()
  const currentMonth = today.toLocaleDateString(undefined, { month: "long" })

  return (
    <div className="@container">
      <div className="grid gap-6 @lg:grid-cols-2">
        <Card size="sm" className="grid gap-1">
          <h2 className="text-sm font-medium">Total Bills</h2>
          <p className="text-primary text-2xl font-semibold">
            {summary.billCount}
          </p>
        </Card>

        <Card size="sm" className="grid gap-1">
          <h2 className="text-sm font-medium">Total Amount</h2>
          <p className="text-primary text-2xl font-semibold">
            {currencyFormatter.format(Number(summary.sum ?? 0))}
          </p>
        </Card>

        <Card size="sm" className="grid gap-6 @lg:col-span-2">
          <h2 className="text-lg leading-tight font-semibold">
            Summary for <span className="text-primary">{currentMonth}</span>
          </h2>

          <dl className="grid gap-4 @xl:grid-cols-3">
            <div className="grid gap-1">
              <dt className="text-sm font-medium">Paid Bills</dt>
              <dd className="text-primary text-2xl font-semibold">
                {currencyFormatter.format(summary.monthlySummary.paid.total)}
              </dd>
            </div>

            <div className="grid gap-1">
              <dt className="text-sm font-medium">Total Upcoming</dt>
              <dd className="text-primary text-2xl font-semibold">
                {currencyFormatter.format(
                  summary.monthlySummary.upcoming.total
                )}
              </dd>
            </div>

            <div className="grid gap-1">
              <dt className="text-sm font-medium">Due Soon</dt>
              <dd className="text-primary text-2xl font-semibold">
                {currencyFormatter.format(summary.monthlySummary.dueSoon.total)}
              </dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  )
}
