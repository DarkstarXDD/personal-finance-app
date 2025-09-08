import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import { currencyFormatter } from "@/lib/utils"

export default async function RecurringBillsOverview() {
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

      <div className="grid gap-3">
        <RecurringBillsOverviewItem
          label="Paid Bills"
          value="190"
          color="#277c78"
        />
        <RecurringBillsOverviewItem
          label="Total Upcoming"
          value="194.98"
          color="#f2cdac"
        />
        <RecurringBillsOverviewItem
          label="Due Soon"
          value="59.98"
          color="#82c9d7"
        />
      </div>
    </Card>
  )
}

function RecurringBillsOverviewItem({
  label,
  value,
  color,
}: {
  label: string
  value: string
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
