"use client"

import { useActionState } from "react"

import { deletePot } from "@/actions/pots"
import Button from "@/components/ui/Button"
import { Dialog } from "@/components/ui/Dialog"
import { fieldErrorStyles } from "@/components/ui/FieldError"

import type { Pot } from "@/data-access/pots"

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
        {error && (
          <p className={fieldErrorStyles()} role="alert">
            {error}
          </p>
        )}
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
