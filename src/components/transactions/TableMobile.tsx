"use client"

import { format } from "date-fns"

import type { Transaction } from "@/data-access/transactions"

export default function TableMobile({
  transactions,
}: {
  transactions: Transaction[]
}) {
  const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  return (
    <ul className="md:hidden">
      {transactions.map((transaction) => (
        <li
          key={transaction.id}
          className="border-b-grey-100 grid gap-1 border-b py-4 first:pt-0 last:border-none last:pb-0"
        >
          <div className="text-grey-900 flex items-center justify-between gap-2 text-sm leading-normal font-bold">
            <p>{transaction.counterparty}</p>
            <p>{currencyFormat.format(Number(transaction.amount))}</p>
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
