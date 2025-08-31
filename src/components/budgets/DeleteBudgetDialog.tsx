"use client"

import { useActionState } from "react"

import { deleteBudget } from "@/actions/budgets"
import Button from "@/components/ui/Button"
import { Dialog } from "@/components/ui/Dialog"
import { fieldErrorStyles } from "@/components/ui/FieldError"

import type { Budget } from "@/data-access/budgets"

export default function DeleteBudgetDialog({
  isOpen,
  onOpenChange,
  budget,
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  budget: Budget
}) {
  const [error, deleteBudgetAction, isPending] = useActionState(
    deleteBudget,
    undefined
  )

  return (
    <Dialog
      title={`Delete '${budget.category.label}'?`}
      role="alertdialog"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <form className="grid gap-5" action={deleteBudgetAction}>
        <input name="budgetId" value={budget.id} type="hidden" />
        <p>
          Are you sure you want to delete this budget? This action cannot be
          reversed, and all the data inside it will be removed forever.
        </p>
        {error && (
          <p className={fieldErrorStyles()} role="alert">
            {error}
          </p>
        )}
        <Button type="submit" variant="destructive" isPending={isPending}>
          Yes, Confirm Deletion
        </Button>
        <Button variant="tertiary" slot="close" isDisabled={isPending}>
          No, Go Back
        </Button>
      </form>
    </Dialog>
  )
}
