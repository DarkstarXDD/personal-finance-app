import { format } from "date-fns"

import TransactionAmount from "@/features/transactions/components/TransactionAmount"
import { type Transaction } from "@/features/transactions/data-access"

type TableMobileProps = { transactions: Transaction[]; className?: string }

export default function TableMobile({
  transactions,
  className,
}: TableMobileProps) {
  return (
    <ul className={className}>
      {transactions.map((transaction) => (
        <li
          key={transaction.id}
          className="border-secondary grid grid-cols-2 gap-x-2 gap-y-1 border-b py-4 last:border-none"
        >
          <p className="text-primary text-sm font-medium">
            {transaction.counterparty}
          </p>

          <TransactionAmount
            amount={transaction.amount}
            transactionType={transaction.transactionType}
            className="justify-self-end"
          />

          <p className="text-sm">{transaction.category.label}</p>

          <p className="justify-self-end text-sm">
            {format(transaction.createdAt, "dd MMM yyyy")}
          </p>
        </li>
      ))}
    </ul>
  )
}
