"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { ProgressBar } from "react-aria-components"

import Card from "@/components/ui/Card"
import IconButton from "@/components/ui/IconButton"
import { MenuTrigger, Menu, MenuItem } from "@/components/ui/Menu"
import AddToPotDialog from "@/features/pots/components/AddToPotDialog"
import DeletePotDialog from "@/features/pots/components/DeletePotDialog"
import EditPotDialog from "@/features/pots/components/EditPotDialog"
import WithdrawFromPotDialog from "@/features/pots/components/WithdrawFromPotDialog"
import { currencyFormatter } from "@/lib/utils"

import type { Color } from "@/data-access/lookups"
import type { Pot } from "@/data-access/pots"

type PotCardProps = { pot: Pot; colors: Color[] }

export default function PotCard({ pot, colors }: PotCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <Card padding="lg" className="grid gap-8">
      <div className="flex items-center justify-start gap-4">
        <span
          className="size-4 rounded-full"
          style={{ backgroundColor: pot.color.value }}
        />
        <h2 className="text-primary text-lg leading-tight font-semibold">
          {pot.name}
        </h2>

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

      <div className="flex items-start justify-between gap-2">
        <p className="grid gap-1">
          <span className="text-sm font-medium">Saved</span>
          <span className="text-primary text-3xl leading-tight font-semibold">
            {currencyFormatter.format(pot.currentAmount)}
          </span>
        </p>
        <p className="grid justify-items-end gap-1">
          <span className="text-sm font-medium">Target</span>
          <span className="text-lg leading-tight font-semibold">
            {currencyFormatter.format(pot.target)}
          </span>
        </p>
      </div>

      <ProgressBar
        aria-label={`${pot.name} progress`}
        value={pot.currentAmount}
        minValue={0}
        maxValue={pot.target}
        formatOptions={{ style: "currency", currency: "USD" }}
      >
        {({ percentage }) => (
          <div className="grid gap-1.5">
            <div className="bg-quaternary h-3 rounded">
              <motion.div
                className="h-full rounded"
                style={{ backgroundColor: pot.color.value }}
                initial={{ width: 0 }}
                animate={{ width: percentage + "%" }}
                transition={{ delay: 0.18 }}
              />
            </div>
            <p className="text-xs font-medium">
              {Math.round(percentage ?? 0)}% complete
            </p>
          </div>
        )}
      </ProgressBar>

      <div className="xs:flex-row flex flex-col items-start justify-center gap-4 lg:gap-6">
        <AddToPotDialog pot={pot} />
        <WithdrawFromPotDialog pot={pot} />
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
