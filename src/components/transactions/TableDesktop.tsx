"use client"

import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table"
import { format } from "date-fns"

import { Transaction } from "@/data-access/transactions"

const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

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
    header: "Amount",
    cell: (data) => (
      <span className="text-grey-900 text-sm leading-normal font-bold">
        {currencyFormat.format(Number(data.getValue()))}
      </span>
    ),
  }),
]

export default function TableDesktop({
  transactions,
}: {
  transactions: Transaction[]
}) {
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  console.log(table)

  return (
    <div className="hidden md:block">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="py-4">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-grey-500 border-b-grey-100 border-b py-3 text-start text-xs leading-normal font-normal"
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
              className="border-b-grey-100 border-b last:border-none"
            >
              {row.getAllCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className="py-4"
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
