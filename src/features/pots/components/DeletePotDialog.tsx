import { useActionState } from "react"

import Button from "@/components/ui/Button"
import { Dialog } from "@/components/ui/Dialog"
import { deletePot } from "@/features/pots/actions"
// import { fieldErrorStyles } from "@/components/ui/FieldError"

import type { Pot } from "@/features/pots/data-access"

export default function DeletePotDialog({
  pot,
  isOpen,
  onOpenChange,
}: {
  pot: Pot
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}) {
  const [error, deletePotAction, isPending] = useActionState(
    deletePot,
    undefined
  )

  return (
    <Dialog
      title={`Delete '${pot.name}'?`}
      role="alertdialog"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <form className="grid gap-5" action={deletePotAction}>
        <input name="potId" value={pot.id} type="hidden" />
        <p>
          Are you sure you want to delete this pot? This action cannot be
          reversed, and all the data inside it will be removed forever.
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
