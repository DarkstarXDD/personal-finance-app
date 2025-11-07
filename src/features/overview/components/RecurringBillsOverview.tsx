import { Suspense } from "react"
import { PiReceiptFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import Card from "@/components/ui/Card"
import Link from "@/components/ui/Link"
import RecurringBillsOverviewLoading from "@/features/overview/components/RecurringBillsOverviewLoading"
import TableDesktop from "@/features/recurring-bills/components/TableDesktop"
import TableMobile from "@/features/recurring-bills/components/TableMobile"
import { getRecurringBills } from "@/features/recurring-bills/data-access"
import { currencyFormatter } from "@/lib/utils"

export default function RecurringBillsOverview() {
  return (
    <Card size="md" className="grid content-start gap-6 md:px-0">
      <div className="flex items-center justify-between md:px-6">
        <h2 className="text-primary text-xl leading-tight font-semibold">
          Recurring Bills
        </h2>

        <Link withIcon href="/recurring-bills">
          See Details
        </Link>
      </div>

      <Suspense fallback={<RecurringBillsOverviewLoading />}>
        <RecurringBills />
      </Suspense>
    </Card>
  )
}

async function RecurringBills() {
  const { recurringBills, summary } = await getRecurringBills({})

  const today = new Date()
  const currentMonth = today.toLocaleDateString(undefined, { month: "long" })
  return (
    <>
      {recurringBills.length > 0 ? (
        <div className="grid gap-6">
          <div className="grid gap-6 md:px-6">
            <dl className="grid gap-3">
              <RecurringBillsOverviewItem
                label="Active Subscriptions"
                count={summary.billCount}
              />
              <RecurringBillsOverviewItem
                label="Monthly Cost"
                value={summary.sum ?? 0}
              />
            </dl>

            <div className="grid gap-4">
              <h2 className="text-lg leading-tight font-semibold">
                Summary for <span className="text-primary">{currentMonth}</span>
              </h2>

              <dl className="grid gap-3">
                <RecurringBillsOverviewItem
                  label="Paid Bills"
                  value={summary.monthlySummary.paid.total}
                />
                <RecurringBillsOverviewItem
                  label="Total Upcoming"
                  value={summary.monthlySummary.upcoming.total}
                />
                <RecurringBillsOverviewItem
                  label="Due Soon"
                  value={summary.monthlySummary.dueSoon.total}
                />
              </dl>
            </div>
          </div>

          <TableMobile
            recurringBills={recurringBills.slice(0, 3)}
            className="md:hidden"
          />
          <TableDesktop
            recurringBills={recurringBills.slice(0, 3)}
            className="hidden md:block"
          />
        </div>
      ) : (
        <EmptyState
          icon={PiReceiptFill}
          title="You don’t have any recurring bills yet"
          description="They’ll appear here once you have some."
        />
      )}
    </>
  )
}

function RecurringBillsOverviewItem({
  label,
  count,
  value,
}: {
  label: string
  count?: number
  value?: string | number
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-sm font-medium">{label}</dt>
      <dd className="text-primary text-xl font-semibold">
        {count ?? currencyFormatter.format(Number(value))}
      </dd>
    </div>
  )
}
