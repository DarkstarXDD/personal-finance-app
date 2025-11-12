"use client"

import { format } from "date-fns"
import { motion } from "motion/react"
import { useState } from "react"
import { ProgressBar } from "react-aria-components"
import { PiWarningCircleFill } from "react-icons/pi"

import FilteredEmptyState from "@/components/empty-states/FilteredEmptyState"
import Card from "@/components/ui/Card"
import IconButton from "@/components/ui/IconButton"
import Link from "@/components/ui/Link"
import { Menu, MenuTrigger, MenuItem } from "@/components/ui/Menu"
import { Category, Color } from "@/data-access/lookups"
import DeleteBudgetDialog from "@/features/budgets/components/DeleteBudgetDialog"
import EditBudgetDialog from "@/features/budgets/components/EditBudgetDialog"
import TransactionAmount from "@/features/transactions/components/TransactionAmount"
import { currencyFormatter } from "@/lib/utils"

import type { Budget } from "@/features/budgets/data-access"
import type { Transaction } from "@/features/transactions/data-access"

type BudgetCardProps = {
  budget: Budget & { transactions: Transaction[]; totalSpent: number }
  categories: Category[]
  colors: Color[]
}

export default function BudgetCard({
  budget,
  categories,
  colors,
}: BudgetCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const remainingAmount =
    Number(budget.maximumSpend) - Number(budget.totalSpent)

  return (
    <Card size="lg">
      <div className="grid gap-8 self-start">
        <div className="flex items-center justify-start gap-4">
          <span
            className="size-4 rounded-full"
            style={{ backgroundColor: budget.color.value }}
          />
          <h2 className="text-primary text-lg leading-tight font-semibold">
            {budget.category.label}
          </h2>
          <MenuTrigger>
            <IconButton variant="options" className="ml-auto" />
            <Menu>
              <MenuItem onAction={() => setIsEditDialogOpen(true)}>
                Edit Budget...
              </MenuItem>
              <MenuItem
                className="text-error-primary"
                onAction={() => setIsDeleteDialogOpen(true)}
              >
                Delete Budget...
              </MenuItem>
            </Menu>
          </MenuTrigger>
        </div>

        <div className="grid gap-8">
          <p>
            <span className="text-primary text-3xl leading-tight font-semibold">
              {currencyFormatter.format(budget.totalSpent)}
            </span>
            <span className="font-medium" data-testid="maximum-amount">
              {" "}
              of {currencyFormatter.format(budget.maximumSpend)}
            </span>
          </p>

          <ProgressBar
            aria-label={`${budget.category.name} progress`}
            value={Number(budget.totalSpent)}
            minValue={0}
            maxValue={Number(budget.maximumSpend)}
            formatOptions={{ style: "currency", currency: "USD" }}
          >
            {({ percentage }) => (
              <div className="grid gap-1.5">
                <div className="bg-quaternary h-3 rounded">
                  <motion.div
                    className="h-full rounded"
                    style={{ backgroundColor: budget.color.value }}
                    initial={{ width: 0 }}
                    animate={{ width: percentage + "%" }}
                    transition={{ delay: 0.18 }}
                  />
                </div>

                <div className="flex justify-between gap-2 text-sm font-medium">
                  <p>{Math.round(percentage ?? 0)}% used</p>
                  <p>
                    {remainingAmount > 0
                      ? currencyFormatter.format(remainingAmount)
                      : currencyFormatter.format(0)}{" "}
                    remaining
                  </p>
                </div>
              </div>
            )}
          </ProgressBar>

          {Number(budget.maximumSpend) < Number(budget.totalSpent) && (
            <p className="text-error-primary flex items-center gap-2 text-sm">
              <PiWarningCircleFill className="text-fg-error-secondary size-5" />
              You’ve exceeded this month’s budget for this category.
            </p>
          )}

          <Card size="sm" className="bg-secondary grid gap-5 px-0">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-primary font-semibold">Latest Spending</h3>
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
                    className="border-secondary grid grid-cols-2 gap-x-2 gap-y-1 border-b px-4 py-4 first:pt-0 last:border-none last:pb-0"
                  >
                    <p className="text-primary text-sm font-medium">
                      {transaction.counterparty}
                    </p>

                    <TransactionAmount
                      amount={transaction.amount}
                      transactionType={transaction.transactionType}
                      className="justify-self-end"
                    />

                    <p className="text-sm">{transaction.category.label}</p>

                    <p className="justify-self-end text-sm">
                      {format(transaction.createdAt, "dd MMM yyyy")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
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
      </div>
    </Card>
  )
}
