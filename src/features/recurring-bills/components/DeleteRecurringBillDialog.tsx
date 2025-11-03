import { DeleteDialog } from "@/components/ui/DeleteDialog"
import { deleteRecurringBill } from "@/features/recurring-bills/actions"
import { type RecurringBill } from "@/features/recurring-bills/data-access"

export default function DeleteRecurringBillDialog({
  isOpen,
  onOpenChange,
  recurringBill,
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  recurringBill: RecurringBill
}) {
  return (
    <DeleteDialog
      title={`Delete '${recurringBill.counterparty}'?`}
      description="Are you sure you want to delete this recurring bill? This action cannot be undone."
      action={deleteRecurringBill}
      itemId={recurringBill.id}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <p className="text-sm">
        Note: Deleting the recurring bill won&apos;t delete the initial
        transaction that created it.
      </p>
    </DeleteDialog>
  )
}
