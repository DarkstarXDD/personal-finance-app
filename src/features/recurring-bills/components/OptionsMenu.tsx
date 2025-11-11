"use client"

import { useState } from "react"

import IconButton from "@/components/ui/IconButton"
import { Menu, MenuItem, MenuTrigger } from "@/components/ui/Menu"
import DeleteRecurringBillDialog from "@/features/recurring-bills/components/DeleteRecurringBillDialog"
import { type RecurringBill } from "@/features/recurring-bills/data-access"

type OptionsMenuProps = { recurringBill: RecurringBill }

export default function OptionsMenu({ recurringBill }: OptionsMenuProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <>
      <MenuTrigger>
        <IconButton variant="options" className="h-5 w-5 rotate-90" />
        <Menu>
          <MenuItem
            className="text-error-primary"
            onAction={() => setIsDeleteDialogOpen(true)}
          >
            Delete...
          </MenuItem>
        </Menu>
      </MenuTrigger>

      <DeleteRecurringBillDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        recurringBill={recurringBill}
      />
    </>
  )
}
