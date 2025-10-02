"use client"

import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table"
import { format } from "date-fns"

import TransactionAmount from "@/components/transactions/TransactionAmount"
import { cn } from "@/lib/utils"

import type { Transaction } from "@/data-access/transactions"

const columnHelper = createColumnHelper<Transaction>()

const columns = [
  columnHelper.accessor("counterparty", {
    header: "Recipient / Sender",
    cell: (data) => (
      <span className="text-grey-900 text-sm leading-normal font-bold">
        {data.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (data) => (
      <span className="text-grey-500 text-xs leading-normal font-normal">
        {data.getValue().label}
      </span>
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: "Transaction Date",
    cell: (data) => (
      <span className="text-grey-500 text-xs leading-normal font-normal">
        {format(data.getValue(), "dd MMM yyyy")}
      </span>
    ),
  }),
  columnHelper.accessor("amount", {
    header: () => <span className="block w-full text-end">Amount</span>,
    cell: (data) => {
      const { amount, transactionType } = data.row.original
      return (
        <span className="block w-full text-end">
          <TransactionAmount
            transactionAmount={amount}
            transactionType={transactionType}
          />
        </span>
      )
    },
  }),
]

export default function TableDesktop({
  transactions,
  className,
}: {
  transactions: Transaction[]
  className?: string
}) {
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className={cn("w-full", className)}>
      <table className="w-full" style={{ minWidth: table.getTotalSize() }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-beige-100 border-b">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-grey-500 px-4 pt-3 pb-5 text-start text-xs leading-normal font-normal"
                  style={{ width: header.getSize() }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-grey-100 hover:bg-beige-100 border-b last:border-none"
            >
              {row.getAllCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className="px-4 py-4"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
