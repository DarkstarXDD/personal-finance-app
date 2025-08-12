"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { ProgressBar } from "react-aria-components"

import DeletePotDialog from "@/components/pots/DeletePotDialog"
import EditPotDialog from "@/components/pots/EditPotDialog"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import IconButton from "@/components/ui/IconButton"
import Label from "@/components/ui/Label"
import { MenuTrigger, Menu, MenuItem } from "@/components/ui/Menu"
import { Colors } from "@/data-access/lookups"

import type { PotWithIdSchema } from "@/lib/schemas"

export default function PotCard({
  potId,
  name,
  target,
  theme,
  colors,
}: PotWithIdSchema & { colors: Colors }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <Card padding="sm">
      <div className="grid gap-8">
        <div className="flex items-center justify-start gap-4">
          <span
            className="size-4 rounded-full"
            style={{ backgroundColor: theme }}
          />
          <Heading variant="secondary" as="h2">
            {name}
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
          value={800}
          minValue={0}
          maxValue={Number(target)}
          formatOptions={{ style: "currency", currency: "USD" }}
        >
          {({ percentage, valueText }) => (
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label variant="secondary">Total Saved</Label>
                <span className="text-grey-900 text-3xl leading-tight font-bold">
                  {valueText}
                </span>
              </div>
              <div className="bg-beige-100 h-2 rounded">
                <motion.div
                  className="h-full rounded"
                  style={{ backgroundColor: theme }}
                  initial={{ width: 0 }}
                  animate={{ width: percentage + "%" }}
                  transition={{ delay: 0.18 }}
                />
              </div>
              <div className="text-grey-500 flex items-center justify-between text-xs leading-normal">
                <span className="font-bold">
                  {Math.round(percentage ?? 0)}%
                </span>
                <span className="font-normal">Target of ${target}</span>
              </div>
            </div>
          )}
        </ProgressBar>
        <div className="flex justify-center gap-4">
          <Button variant="secondary" className="w-full">
            + Add Money
          </Button>
          <Button variant="secondary" className="w-full">
            Withdraw
          </Button>
        </div>
      </div>

      <DeletePotDialog
        potId={potId}
        potName={name}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
      <EditPotDialog
        potData={{ potId, name, target, theme }}
        colors={colors}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </Card>
  )
}
