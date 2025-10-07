"use client"

import { format } from "date-fns"
import { motion } from "motion/react"
import { useState } from "react"
import { ProgressBar } from "react-aria-components"
import { PiWarningCircleFill } from "react-icons/pi"

import DeleteBudgetDialog from "@/components/budgets/DeleteBudgetDialog"
import EditBudgetDialog from "@/components/budgets/EditBudgetDialog"
import FilteredEmptyState from "@/components/empty-states/FilteredEmptyState"
import TransactionAmount from "@/components/transactions/TransactionAmount"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import IconButton from "@/components/ui/IconButton"
import Label from "@/components/ui/Label"
import Link from "@/components/ui/Link"
import { Menu, MenuTrigger, MenuItem } from "@/components/ui/Menu"
import { Category, Color } from "@/data-access/lookups"
import { currencyFormatter } from "@/lib/utils"

import type { Budget } from "@/data-access/budgets"
import type { Transaction } from "@/data-access/transactions"

export default function BudgetCard({
  budget,
  categories,
  colors,
}: {
  budget: Budget & { transactions: Transaction[]; totalSpent: number }
  categories: Category[]
  colors: Color[]
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const remainingAmount =
    Number(budget.maximumSpend) - Number(budget.totalSpent)

  return (
    <Card className="grid gap-5">
      <div className="flex items-center justify-start gap-4">
        <span
          className="size-4 rounded-full"
          style={{ backgroundColor: budget.color.value }}
        />
        <Heading as="h2" variant="secondary">
          {budget.category.label}
        </Heading>

        <MenuTrigger>
          <IconButton variant="options" className="ml-auto" />
          <Menu>
            <MenuItem onAction={() => setIsEditDialogOpen(true)}>
              Edit Budget
            </MenuItem>
            <MenuItem
              className="text-red"
              onAction={() => setIsDeleteDialogOpen(true)}
            >
              Delete Budget
            </MenuItem>
          </Menu>
        </MenuTrigger>
      </div>

      <div className="grid gap-8">
        <ProgressBar
          value={Number(budget.totalSpent)}
          minValue={0}
          maxValue={Number(budget.maximumSpend)}
        >
          {({ percentage }) => (
            <div className="grid gap-4">
              <Label>
                Maximum of{" "}
                {currencyFormatter.format(Number(budget.maximumSpend))}
              </Label>
              <div className="bg-beige-100 flex h-8 w-full items-center rounded-sm p-1">
                <motion.div
                  className="h-full rounded-sm"
                  style={{ backgroundColor: budget.color.value }}
                  initial={{ width: 0 }}
                  animate={{ width: percentage + "%" }}
                  transition={{ delay: 0.18 }}
                />
              </div>
            </div>
          )}
        </ProgressBar>

        {Number(budget.maximumSpend) < Number(budget.totalSpent) && (
          <p className="text-red flex gap-2 text-sm leading-normal font-normal">
            <PiWarningCircleFill className="size-5" />
            You’ve exceeded this month’s budget for this category.
          </p>
        )}

        <div className="grid grid-cols-2">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <span
              className="row-span-2 h-full w-1 rounded-lg"
              style={{ backgroundColor: budget.color.value }}
            />
            <p className="text-grey-500 text-xs leading-normal font-normal">
              Spent
            </p>
            <p className="text-grey-900 text-sm leading-normal font-bold">
              {currencyFormatter.format(Number(budget.totalSpent))}
            </p>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <span className="bg-beige-100 row-span-2 h-full w-1 rounded-lg" />
            <p className="text-grey-500 text-xs leading-normal font-normal">
              Free
            </p>
            <p className="text-grey-900 text-sm leading-normal font-bold">
              {currencyFormatter.format(
                remainingAmount < 0 ? 0 : remainingAmount
              )}
            </p>
          </div>
        </div>

        <div className="bg-beige-100 grid gap-5 rounded-xl p-4 md:p-5">
          <div className="flex justify-between">
            <h3 className="text-grey-900 text-base leading-normal font-bold">
              Latest Spending
            </h3>
            <Link
              href={`/transactions?category=${budget.category.name}`}
              withIcon
            >
              See All
            </Link>
          </div>
          {budget.transactions.length === 0 ? (
            <FilteredEmptyState message="No expenses under this category for this month." />
          ) : (
            <ul>
              {budget.transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="border-grey-200 grid grid-cols-2 gap-1 border-b py-3 first:pt-0 last:border-none last:pb-0"
                >
                  <h4 className="text-grey-900 row-span-2 text-xs leading-normal font-bold">
                    {transaction.counterparty}
                  </h4>
                  <TransactionAmount
                    transactionAmount={transaction.amount}
                    transactionType={transaction.transactionType}
                    className="justify-self-end text-xs"
                  />
                  <p className="text-grey-500 justify-self-end text-xs leading-normal font-normal">
                    {format(transaction.createdAt, "dd MMM yyyy")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <EditBudgetDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        categories={categories}
        colors={colors}
        budget={budget}
      />
      <DeleteBudgetDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        budget={budget}
      />
    </Card>
  )
}
