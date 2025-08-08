"use client"

import { motion } from "motion/react"
import { ReactNode } from "react"
import {
  MenuTrigger as RacMenuTrigger,
  Menu as RacMenu,
  MenuItem as RacMenuItem,
  Popover as RacPopover,
  type MenuTriggerProps as RacMenuTriggerProps,
  type MenuProps as RacMenuProps,
  type MenuItemProps as RacMenuItemProps,
  type PopoverProps as RacPopoverProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

function MenuTrigger(props: RacMenuTriggerProps) {
  return <RacMenuTrigger {...props} />
}

const menuStyles = tv({
  base: "border-grey-200 max-h-80 overflow-auto rounded-lg border bg-white px-1 py-1 shadow-xl",
})

function Menu<T extends object>({
  children,
  className,
  placement = "bottom right",
  ...props
}: Omit<RacMenuProps<T>, "className"> & { className?: string } & Pick<
    RacPopoverProps,
    "placement"
  >) {
  return (
    <RacPopover placement={placement}>
      <motion.div
        className="origin-top-right"
        initial={{ y: -10, scale: 0 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
      >
        <RacMenu {...props} className={menuStyles({ className })}>
          {children}
        </RacMenu>
      </motion.div>
    </RacPopover>
  )
}

const menuItemStyles = tv({
  base: "rac-focus-visible:bg-beige-100 rac-pressed:bg-beige-300 rac-selected:bg-beige-300 rac-selected:font-bold rac-hover:bg-beige-100 text-grey-900 cursor-pointer rounded-md px-4 py-3 text-sm leading-normal font-normal outline-none",
})

function MenuItem({
  children,
  className,
  ...props
}: Omit<RacMenuItemProps, "children" | "className"> & {
  children: ReactNode
  className?: string
}) {
  return (
    <RacMenuItem {...props} className={menuItemStyles({ className })}>
      {children}
    </RacMenuItem>
  )
}

export { MenuTrigger, Menu, MenuItem }
