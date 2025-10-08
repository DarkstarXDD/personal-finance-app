import { PiReceiptFill } from "react-icons/pi"

import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import { currencyFormatter } from "@/lib/utils"

import type { MonthlySummary } from "@/lib/helpers/recurring-bills"

export default function Summary({
  totalValue,
  monthlySummary,
}: {
  totalValue?: string | number
  monthlySummary: MonthlySummary
}) {
  const today = new Date()
  const currentMonth = today.toLocaleDateString(undefined, { month: "long" })

  return (
    <div className="grid gap-3 md:grid-cols-2 md:gap-6 xl:grid-cols-1">
      <Card
        theme="dark"
        className="flex items-center gap-5 md:flex-col md:items-start md:gap-8"
      >
        <PiReceiptFill className="size-10 shrink-0 text-white" />
        <div className="grid gap-3">
          <Heading as="h2" variant="tertiary" className="text-white">
            Total biils
          </Heading>
          <p className="text-3xl leading-tight font-bold text-white">
            {currencyFormatter.format(Number(totalValue ?? 0))}
          </p>
        </div>
      </Card>

      <Card theme="light" className="grid gap-5">
        <Heading as="h2" variant="secondary" className="text-base">
          <span>Summary for</span>
          <span className="text-turquoise"> {currentMonth}</span>
        </Heading>
        <dl>
          <div className="border-grey-100 flex justify-between gap-2 border-b pb-4">
            <dt className="text-grey-500 text-sm leading-normal font-semibold">
              Paid Bills
            </dt>
            <dd className="text-grey-900 text-sm leading-normal font-bold">
              <span>{monthlySummary.paid.count} </span>
              <span>
                ({currencyFormatter.format(monthlySummary.paid.total)})
              </span>
            </dd>
          </div>
          <div className="border-grey-100 flex justify-between gap-2 border-b py-4">
            <dt className="text-grey-500 text-sm leading-normal font-semibold">
              Total Upcoming
            </dt>
            <dd className="text-grey-900 text-sm leading-normal font-bold">
              <span>{monthlySummary.upcoming.count} </span>
              <span>
                ({currencyFormatter.format(monthlySummary.upcoming.total)})
              </span>
            </dd>
          </div>
          <div className="flex justify-between gap-2 pt-4">
            <dt className="text-red text-sm leading-normal font-semibold">
              Due Soon
            </dt>
            <dd className="text-red text-sm leading-normal font-bold">
              <span>{monthlySummary.dueSoon.count} </span>
              <span>
                ({currencyFormatter.format(monthlySummary.dueSoon.total)})
              </span>
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  )
}
