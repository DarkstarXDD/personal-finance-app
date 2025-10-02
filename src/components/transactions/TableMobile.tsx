"use client"

import { format } from "date-fns"

import TransactionAmount from "@/components/transactions/TransactionAmount"
import { cn } from "@/lib/utils"

import type { Transaction } from "@/data-access/transactions"

export default function TableMobile({
  transactions,
  className,
}: {
  transactions: Transaction[]
  className?: string
}) {
  return (
    <ul className={cn(className)}>
      {transactions.map((transaction) => (
        <li
          key={transaction.id}
          className="border-b-grey-100 grid gap-1 border-b py-4 first:pt-0 last:border-none last:pb-0"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-grey-900 text-sm leading-normal font-bold">
              {transaction.counterparty}
            </p>
            <TransactionAmount
              transactionAmount={transaction.amount}
              transactionType={transaction.transactionType}
            />
          </div>
          <div className="text-grey-500 flex items-center justify-between gap-2 text-xs leading-normal font-normal">
            <p>{transaction.category.label}</p>
            <p>{format(transaction.createdAt, "dd MMM yyyy")}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
