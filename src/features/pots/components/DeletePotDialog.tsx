import { DeleteDialog } from "@/components/ui/DeleteDialog"
import { deletePot } from "@/features/pots/actions"

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
  return (
    <DeleteDialog
      title={`Delete '${pot.name}'?`}
      description="Are you sure you want to delete this pot? This action cannot be undone."
      action={deletePot}
      itemId={pot.id}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  )
}
