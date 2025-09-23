import { format } from "date-fns"

import DaysUntilDue from "@/components/recurring-bills/DaysUntilDue"
import { currencyFormatter } from "@/lib/utils"

import type { RecurringBill } from "@/data-access/recurring-bills"

export default function TableMobile({
  recurringBills,
}: {
  recurringBills: RecurringBill[]
}) {
  return (
    <ul className="md:hidden">
      {recurringBills.map(
        ({ id, counterparty, amount, dueDate, daysUntilDue }) => (
          <li
            key={id}
            className="border-b-grey-100 grid grid-cols-[1fr_auto] gap-2 border-b py-4 first:pt-0 last:border-none last:pb-0"
          >
            <h3 className="text-grey-900 text-sm leading-normal font-bold">
              {counterparty}
            </h3>
            <p className="text-grey-900 text-end text-sm leading-normal font-bold">
              {currencyFormatter.format(Number(amount))}
            </p>
            <p className="text-grey-500 text-xs leading-normal font-normal">
              {format(dueDate, "dd MMM yyyy")}
            </p>
            <DaysUntilDue daysUntilDue={daysUntilDue} />
          </li>
        )
      )}
    </ul>
  )
}
