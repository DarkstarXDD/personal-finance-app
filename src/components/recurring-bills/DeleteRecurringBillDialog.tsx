import { useActionState } from "react"

import { deleteRecurringBill } from "@/actions/recurring-bills"
import Button from "@/components/ui/Button"
import { Dialog } from "@/components/ui/Dialog"
// import { fieldErrorStyles } from "@/components/ui/FieldError"

import type { RecurringBill } from "@/data-access/recurring-bills"

export default function DeleteRecurringBillDialog({
  isOpen,
  onOpenChange,
  recurringBill,
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  recurringBill: RecurringBill
}) {
  const [error, deleteRecurringBillAction, isPending] = useActionState(
    deleteRecurringBill,
    undefined
  )

  return (
    <Dialog
      title={`Delete '${recurringBill.counterparty}'?`}
      role="alertdialog"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <form className="grid gap-5" action={deleteRecurringBillAction}>
        <input name="recurringBillId" value={recurringBill.id} type="hidden" />
        <p className="grid gap-2">
          <span>Are you sure you want to delete this recurring bill?</span>
          <span className="text-grey-500 text-sm">
            Note: Deleting the recurring bill won&apos;t delete the initial
            transaction that created it.
          </span>
        </p>
        {error && <p role="alert">{error}</p>}
        <Button type="submit" variant="destructive" isPending={isPending}>
          Yes, Confirm Deletion
        </Button>
        <Button variant="secondary" slot="close" isDisabled={isPending}>
          No, Go Back
        </Button>
      </form>
    </Dialog>
  )
}
