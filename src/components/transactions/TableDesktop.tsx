"use client"

import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table"
import { format } from "date-fns"
import { tv } from "tailwind-variants"

import type { Transaction } from "@/data-access/transactions"

const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const columnHelper = createColumnHelper<Transaction>()

const columns = [
  columnHelper.accessor("counterparty", {
    header: () => <span className="block w-full">Recipient / Sender</span>,
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
    cell: (data) => (
      <span className="text-grey-900 block w-full text-end text-sm leading-normal font-bold">
        {currencyFormat.format(Number(data.getValue()))}
      </span>
    ),
  }),
]

const tableStyles = tv({
  slots: {
    tableElement: "w-full",
    headCells:
      "text-grey-50 border-b-grey-100 relative border-b px-4 py-3 text-start text-xs leading-normal font-normal",
    bodyRows: "border-b-grey-100 border-b last:border-none",
    bodyCells: "px-4 py-4",
    resizeHandler:
      "bg-beige-500 absolute top-1/2 right-0 h-1/2 w-1.5 -translate-y-1/2 cursor-ew-resize rounded opacity-20 transition-all hover:opacity-80 active:opacity-80",
  },
  variants: {
    isResizing: {
      true: {
        resizeHandler: "h-2/3",
      },
    },
  },
})

const { tableElement, headCells, bodyRows, bodyCells, resizeHandler } =
  tableStyles()

export default function TableDesktop({
  transactions,
}: {
  transactions: Transaction[]
}) {
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  })

  console.log(table)

  return (
    <div className="hidden md:block">
      <table className={tableElement()}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={headCells()}
                  style={{ width: header.getSize() }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <span
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={resizeHandler({
                      isResizing: header.column.getIsResizing(),
                    })}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={bodyRows()}>
              {row.getAllCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className={bodyCells()}
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
