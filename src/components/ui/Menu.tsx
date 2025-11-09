"use client"

import { motion } from "motion/react"
import { type ReactNode } from "react"
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

import { cn } from "@/lib/utils"

type MenuTriggerProps = RacMenuTriggerProps

function MenuTrigger(props: MenuTriggerProps) {
  return <RacMenuTrigger {...props} />
}

type MenuProps<T extends object> = Omit<RacMenuProps<T>, "className"> & {
  className?: string
} & Pick<RacPopoverProps, "placement">

function Menu<T extends object>({
  children,
  className,
  placement = "bottom right",
  ...props
}: MenuProps<T>) {
  return (
    <RacPopover placement={placement}>
      <motion.div
        className="origin-top-right"
        initial={{ y: -10, scale: 0.7 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
      >
        <RacMenu
          {...props}
          className={cn(
            "bg-primary border-secondary custom-scrollbar max-h-80 overflow-auto rounded-lg border p-1.5 shadow-sm outline-none",
            className
          )}
        >
          {children}
        </RacMenu>
      </motion.div>
    </RacPopover>
  )
}

type MenuItemProps = Omit<RacMenuItemProps, "children" | "className"> & {
  children: ReactNode
  className?: string
}

function MenuItem({ children, className, ...props }: MenuItemProps) {
  return (
    <RacMenuItem
      {...props}
      className={({ isHovered, isPressed, isFocusVisible, isSelected }) =>
        cn(
          "text-secondary [&_svg]:text-quaternary flex cursor-pointer items-center gap-2 rounded-md p-2.5 text-sm font-medium outline-none [&_svg]:size-4",

          isHovered && "bg-active",

          isPressed && "bg-active",

          isFocusVisible && "bg-active",

          isSelected && "bg-active",

          className
        )
      }
    >
      {children}
    </RacMenuItem>
  )
}

export { MenuTrigger, Menu, MenuItem }
