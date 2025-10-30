"use client"

import { format } from "date-fns"

import TransactionAmount from "@/features/transactions/components/TransactionAmount"
import { type Transaction } from "@/features/transactions/data-access"
import { cn } from "@/lib/utils"

type TableMobileProps = { transactions: Transaction[]; className?: string }

export default function TableMobile({
  transactions,
  className,
}: TableMobileProps) {
  return (
    <ul className={cn(className)}>
      {transactions.map((transaction) => (
        <li
          key={transaction.id}
          className="border-secondary grid gap-1 border-b py-4 last:border-none"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-primary text-sm font-medium">
              {transaction.counterparty}
            </p>
            <TransactionAmount
              transactionAmount={transaction.amount}
              transactionType={transaction.transactionType}
            />
          </div>

          <div className="flex items-center justify-between gap-2 text-sm">
            <p>{transaction.category.label}</p>
            <p>{format(transaction.createdAt, "dd MMM yyyy")}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
