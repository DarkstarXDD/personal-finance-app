"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { ProgressBar } from "react-aria-components"

import AddToPotDialog from "@/components/pots/AddToPotDialog"
import DeletePotDialog from "@/components/pots/DeletePotDialog"
import EditPotDialog from "@/components/pots/EditPotDialog"
import WithdrawFromPotDialog from "@/components/pots/WithdrawFromPotDialog"
import Card from "@/components/ui/Card"
import Label from "@/components/ui/FieldLabel"
import Heading from "@/components/ui/Heading"
import IconButton from "@/components/ui/IconButton"
import { MenuTrigger, Menu, MenuItem } from "@/components/ui/Menu"

import type { Color } from "@/data-access/lookups"
import type { Pot } from "@/data-access/pots"

export default function PotCard({
  pot,
  colors,
}: {
  pot: Pot
  colors: Color[]
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <Card padding="md">
      <div className="grid gap-8">
        <div className="flex items-center justify-start gap-4">
          <span
            className="size-4 rounded-full"
            style={{ backgroundColor: pot.color.value }}
          />
          <Heading variant="secondary" as="h2">
            {pot.name}
          </Heading>
          <MenuTrigger>
            <IconButton variant="options" className="ml-auto" />
            <Menu>
              <MenuItem onAction={() => setIsEditDialogOpen(true)}>
                Edit Pot
              </MenuItem>
              <MenuItem
                className="text-red"
                onAction={() => setIsDeleteDialogOpen(true)}
              >
                Delete Pot
              </MenuItem>
            </Menu>
          </MenuTrigger>
        </div>
        <ProgressBar
          value={pot.currentAmount}
          minValue={0}
          maxValue={pot.target}
          formatOptions={{ style: "currency", currency: "USD" }}
        >
          {({ percentage, valueText }) => (
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label>Total Saved</Label>
                <span className="text-grey-900 text-3xl leading-tight font-bold">
                  {valueText}
                </span>
              </div>
              <div className="bg-beige-100 h-2 rounded">
                <motion.div
                  className="h-full rounded"
                  style={{ backgroundColor: pot.color.value }}
                  initial={{ width: 0 }}
                  animate={{ width: percentage + "%" }}
                  transition={{ delay: 0.18 }}
                />
              </div>
              <div className="text-grey-500 flex items-center justify-between text-xs leading-normal">
                <span className="font-bold">
                  {Math.round(percentage ?? 0)}%
                </span>
                <span className="font-normal">Target of ${pot.target}</span>
              </div>
            </div>
          )}
        </ProgressBar>
        <div className="flex justify-center gap-4">
          <AddToPotDialog pot={pot} />
          <WithdrawFromPotDialog pot={pot} />
        </div>
      </div>

      <DeletePotDialog
        pot={pot}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
      <EditPotDialog
        pot={pot}
        colors={colors}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </Card>
  )
}
