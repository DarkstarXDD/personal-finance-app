import { currencyFormatter } from "@/lib/utils"

import type { RecurringBill } from "@/data-access/recurring-bills"

export default function TableMobile({
  recurringBills,
}: {
  recurringBills: RecurringBill[]
}) {
  return (
    <ul className="md:hidden">
      {recurringBills.map((recurringBill) => (
        <li
          key={recurringBill.id}
          className="border-b-grey-100 grid grid-cols-[1fr_auto] border-b py-4 first:pt-0 last:border-none last:pb-0"
        >
          <h3 className="text-grey-900 text-sm leading-normal font-bold">
            {recurringBill.counterparty}
          </h3>
          <p className="text-grey-900 text-sm leading-normal font-bold">
            {currencyFormatter.format(Number(recurringBill.amount))}
          </p>
          <p className="text-green text-xs leading-normal font-normal">
            Monthly - {recurringBill.dueDayOfMonth}
          </p>
        </li>
      ))}
    </ul>
  )
}
