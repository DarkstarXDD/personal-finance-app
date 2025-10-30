import { format } from "date-fns"

import DaysUntilDue from "@/features/recurring-bills/components/DaysUntilDue"
import OptionsMenu from "@/features/recurring-bills/components/OptionsMenu"
import { type RecurringBill } from "@/features/recurring-bills/data-access"
import TransactionAmount from "@/features/transactions/components/TransactionAmount"

type TableMobileProps = { recurringBills: RecurringBill[] }

export default function TableMobile({ recurringBills }: TableMobileProps) {
  return (
    <ul className="md:hidden">
      {recurringBills.map((recurringBill) => (
        <li
          key={recurringBill.id}
          className="border-secondary grid grid-cols-[1fr_auto_auto] gap-x-2 gap-y-1 border-b py-4 last:border-none"
        >
          <h3 className="text-primary text-sm font-medium">
            {recurringBill.counterparty}
          </h3>
          <TransactionAmount
            transactionAmount={recurringBill.amount}
            className="text-end"
          />
          <p className="text-sm">
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
