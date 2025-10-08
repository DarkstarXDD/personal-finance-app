"use client"

import { useState } from "react"

import DeleteRecurringBillDialog from "@/components/recurring-bills/DeleteRecurringBillDialog"
import IconButton from "@/components/ui/IconButton"
import { Menu, MenuItem, MenuTrigger } from "@/components/ui/Menu"
import { RecurringBill } from "@/data-access/recurring-bills"

export default function OptionsMenu({
  recurringBill,
}: {
  recurringBill: RecurringBill
}) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <>
      <MenuTrigger>
        <IconButton variant="options" className="h-5 w-5 rotate-90" />
        <Menu>
          <MenuItem
            className="text-red"
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
