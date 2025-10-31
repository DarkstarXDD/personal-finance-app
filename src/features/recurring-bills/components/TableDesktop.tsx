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
import TransactionAmount from "@/features/transactions/components/TransactionAmount"

const columnHelper = createColumnHelper<RecurringBill>()

const columns = [
  columnHelper.accessor("counterparty", {
    header: "Bill Title",
    cell: (data) => (
      <span className="text-primary text-sm font-medium">
        {data.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor("dueDate", {
    header: "Due Date",
    cell: (data) => (
      <span className="text-sm">{format(data.getValue(), "dd MMM yyyy")}</span>
    ),
  }),

  columnHelper.accessor("daysUntilDue", {
    header: "Days Until Due",
    cell: (data) => <DaysUntilDue daysUntilDue={data.getValue()} />,
  }),

  columnHelper.accessor("amount", {
    header: () => <span className="block w-full text-end">Amount</span>,
    cell: (data) => (
      <span className="block w-full text-end">
        <TransactionAmount amount={data.getValue()} />
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

type TableDesktopProps = { recurringBills: RecurringBill[]; className?: string }

export default function TableDesktop({
  recurringBills,
  className,
}: TableDesktopProps) {
  const table = useReactTable({
    data: recurringBills,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className={className}>
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
              className="border-secondary group border-b last:border-none"
            >
              {row.getAllCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className="px-6 py-4 group-last:pb-0"
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
