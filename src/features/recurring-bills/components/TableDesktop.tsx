"use client"

import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table"
import { format } from "date-fns"

import DaysUntilDue from "@/features/recurring-bills/components/DaysUntilDue"
import OptionsMenu from "@/features/recurring-bills/components/OptionsMenu"
import { type RecurringBill } from "@/features/recurring-bills/data-access"
import { currencyFormatter } from "@/lib/utils"

const columnHelper = createColumnHelper<RecurringBill>()

const columns = [
  columnHelper.accessor("counterparty", {
    header: "Bill Title",
    cell: (data) => (
      <span className="text-grey-900 text-sm leading-normal font-bold">
        {data.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor("dueDate", {
    header: "Due Date",
    cell: (data) => (
      <span className="text-grey-500 text-xs leading-normal font-normal">
        {format(data.getValue(), "dd MMM yyyy")}
      </span>
    ),
  }),

  columnHelper.accessor("daysUntilDue", {
    header: "Days Until Due",
    cell: (data) => <DaysUntilDue daysUntilDue={data.getValue()} />,
  }),

  columnHelper.accessor("amount", {
    header: () => <span className="block w-full text-end">Amount</span>,
    cell: (data) => (
      <span className="text-grey-900 block w-full text-end text-sm leading-normal font-bold">
        {currencyFormatter.format(Number(data.getValue()))}
      </span>
    ),
    size: 50,
  }),

  columnHelper.display({
    id: "delete",
    header: "",
    cell: ({ row }) => {
      return (
        <span className="flex justify-end">
          <OptionsMenu recurringBill={row.original} key={row.original.id} />
        </span>
      )
    },
    size: 40,
  }),
]

export default function TableDesktop({
  recurringBills,
}: {
  recurringBills: RecurringBill[]
}) {
  const table = useReactTable({
    data: recurringBills,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className="hidden w-full md:block">
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
              className="border-grey-100 hover:bg-beige-100 group border-b last:border-none"
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
