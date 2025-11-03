import { DeleteDialog } from "@/components/ui/DeleteDialog"
import { deleteBudget } from "@/features/budgets/actions"
import { type Budget } from "@/features/budgets/data-access"

export default function DeleteBudgetDialog({
  isOpen,
  onOpenChange,
  budget,
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  budget: Budget
}) {
  return (
    <DeleteDialog
      title={`Delete '${budget.category.label}'?`}
      description="Are you sure you want to delete this budget? This action cannot be undone."
      action={deleteBudget}
      itemId={budget.id}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  )
}
