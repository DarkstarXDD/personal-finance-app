"use client"

import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table"
import { format } from "date-fns"

import TransactionAmount from "@/features/transactions/components/TransactionAmount"
import { type Transaction } from "@/features/transactions/data-access"
import { cn } from "@/lib/utils"

const columnHelper = createColumnHelper<Transaction>()

const columns = [
  columnHelper.accessor("counterparty", {
    header: "Recipient / Sender",
    cell: (data) => (
      <span className="text-primary text-sm font-medium">
        {data.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (data) => <span className="text-sm">{data.getValue().label}</span>,
  }),
  columnHelper.accessor("createdAt", {
    header: "Transaction Date",
    cell: (data) => (
      <span className="text-sm">{format(data.getValue(), "dd MMM yyyy")}</span>
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

type TableDesktopProps = { transactions: Transaction[]; className?: string }

export default function TableDesktop({
  transactions,
  className,
}: TableDesktopProps) {
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
            <tr
              key={headerGroup.id}
              className="bg-secondary border-secondary border-t border-b"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3.5 text-start text-xs leading-normal font-semibold"
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
              className="border-secondary border-b last:border-none"
            >
              {row.getAllCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className="px-6 py-4"
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
