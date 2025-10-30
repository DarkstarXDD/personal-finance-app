import { format } from "date-fns"

import DaysUntilDue from "@/features/recurring-bills/components/DaysUntilDue"
import OptionsMenu from "@/features/recurring-bills/components/OptionsMenu"
import { type RecurringBill } from "@/features/recurring-bills/data-access"
import { currencyFormatter } from "@/lib/utils"

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
          className="border-b-grey-100 grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-2 border-b py-4 first:pt-0 last:border-none last:pb-0"
        >
          <h3 className="text-grey-900 text-sm leading-normal font-bold">
            {recurringBill.counterparty}
          </h3>
          <p className="text-grey-900 text-end text-sm leading-normal font-bold">
            {currencyFormatter.format(Number(recurringBill.amount))}
          </p>
          <p className="text-grey-500 text-xs leading-normal font-normal">
            {format(recurringBill.dueDate, "dd MMM yyyy")}
          </p>
          <DaysUntilDue daysUntilDue={recurringBill.daysUntilDue} />
          <div className="col-start-3 row-span-2 row-start-1 flex flex-col justify-center">
            <OptionsMenu recurringBill={recurringBill} />
          </div>
        </li>
      ))}
    </ul>
  )
}
