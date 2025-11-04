import { PiReceiptFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import TableDesktop from "@/features/recurring-bills/components/TableDesktop"
import TableMobile from "@/features/recurring-bills/components/TableMobile"
import { getRecurringBills } from "@/features/recurring-bills/data-access"
import { currencyFormatter } from "@/lib/utils"

export default async function RecurringBillsOverview() {
  const { recurringBills, summary } = await getRecurringBills({})

  return (
    <Card className="grid content-start gap-8 shadow-none">
      <div className="flex items-center justify-between">
        <Heading as="h2" variant="secondary">
          Recurring Bills
        </Heading>
        <Link withIcon href="/recurring-bills">
          See Details
        </Link>
      </div>

      {recurringBills.length > 0 ? (
        <>
          <dl className="grid gap-3">
            <RecurringBillsOverviewItem
              label="Paid Bills"
              value={summary.monthlySummary.paid.total}
              color="#277c78"
            />
            <RecurringBillsOverviewItem
              label="Total Upcoming"
              value={summary.monthlySummary.upcoming.total}
              color="#f2cdac"
            />
            <RecurringBillsOverviewItem
              label="Due Soon"
              value={summary.monthlySummary.dueSoon.total}
              color="#82c9d7"
            />
          </dl>

          <TableMobile recurringBills={recurringBills.slice(0, 3)} />
          <TableDesktop recurringBills={recurringBills.slice(0, 3)} />
        </>
      ) : (
        <EmptyState
          icon={PiReceiptFill}
          title="You don’t have any recurring bills yet"
          description="They’ll appear here once you have some."
        />
      )}
    </Card>
  )
}

function RecurringBillsOverviewItem({
  label,
  value,
  color,
}: {
  label: string
  value: string | number
  color: string
}) {
  return (
    <div
      className="bg-beige-100 flex items-center justify-between gap-3 rounded-lg border-l-4 px-4 py-5"
      style={{ borderColor: color }}
    >
      <dt className="text-grey-500 text-sm leading-normal font-normal">
        {label}
      </dt>
      <dd className="text-grey-900 text-sm leading-normal font-bold">
        {currencyFormatter.format(Number(value))}
      </dd>
    </div>
  )
}
