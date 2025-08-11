"use client"

import { deletePot } from "@/actions/pots"
import Button from "@/components/ui/Button"
import { Dialog } from "@/components/ui/Dialog"

export default function DeletePotDialog({
  potId,
  potName,
  isOpen,
  onOpenChange,
}: {
  potId: string
  potName: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}) {
  return (
    <Dialog
      title={`Delete '${potName}'?`}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className="grid gap-5">
        <p>
          Are you sure you want to delete this pot? This action cannot be
          reversed, and all the data inside it will be removed forever.
        </p>
        <Button variant="destructive" onPress={async () => deletePot(potId)}>
          Yes, Confirm Deletion
        </Button>
        <Button variant="tertiary" slot="close">
          No, Go Back
        </Button>
      </div>
    </Dialog>
  )
}
