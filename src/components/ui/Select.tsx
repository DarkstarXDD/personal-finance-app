"use client"

import { motion } from "motion/react"
import {
  Select as RacSelect,
  Button as RacButton,
  SelectValue as RacSelectValue,
  Popover as RacPopover,
  ListBox as RacListBox,
  ListBoxItem as RacListBoxItem,
  Text as RacText,
  FieldError as RacFieldError,
  type SelectProps as RacSelectProps,
  type ListBoxItemProps as RacListBoxItemProps,
} from "react-aria-components"
import { FaCheck } from "react-icons/fa6"
import { PiCaretDownFill } from "react-icons/pi"
import { tv, type VariantProps } from "tailwind-variants"

import Label from "@/components/ui/Label"

import type { ReactNode } from "react"

const MotionPiCaretDownFill = motion.create(PiCaretDownFill)

const selectStyles = tv({
  base: "flex",
  variants: {
    layout: {
      vertical: "flex-col gap-1",
      horizontal: "flex-row items-center gap-2",
    },
  },
  defaultVariants: {
    layout: "vertical",
  },
})

type SelectStyles = VariantProps<typeof selectStyles>

type SelectProps<T extends object> = Omit<
  RacSelectProps<T>,
  "children" | "className"
> & {
  label?: string
  description?: string
  errorMessage?: string
  items?: Iterable<T>
  className?: string
  children?: ReactNode | ((item: T) => ReactNode)
} & SelectStyles

export function Select<T extends object>({
  label,
  description,
  errorMessage,
  isInvalid,
  items,
  // className,
  layout,
  children,
  ...props
}: SelectProps<T>) {
  return (
    <RacSelect isInvalid={isInvalid} {...props}>
      {({ isOpen }) => (
        <>
          <div className={selectStyles({ layout })}>
            <Label className="self-start">{label}</Label>
            <RacButton className="border-beige-500 text-grey-900 rac-focus-visible:ring-2 ring-beige-500 flex cursor-pointer items-center justify-between gap-2 rounded-lg border px-5 py-3 text-start text-sm leading-normal font-normal outline-none">
              <RacSelectValue />
              <MotionPiCaretDownFill
                className="text-grey-500 shrink-0"
                animate={isOpen ? "open" : "closed"}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
              />
            </RacButton>
          </div>
          {description && !isInvalid && (
            <RacText slot="description">{description}</RacText>
          )}
          <RacFieldError>{errorMessage}</RacFieldError>
          <RacPopover>
            <motion.div
              initial={{ y: -12, opacity: 0.4 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
              className="border-grey-200 w-(--trigger-width) rounded-lg border bg-white px-1 py-1 shadow-xl"
            >
              <RacListBox className="outline-none" items={items}>
                {children}
              </RacListBox>
            </motion.div>
          </RacPopover>
        </>
      )}
    </RacSelect>
  )
}

const selectItemStyles = tv({
  base: "rac-focus-visible:bg-beige-300 rac-pressed:bg-beige-300 rac-selected:bg-beige-300 rac-selected:font-bold rac-hover:bg-beige-300 text-grey-900 cursor-pointer rounded-md px-4 py-3 text-sm leading-normal font-normal outline-none",
})

export function SelectItem({
  className,
  children,
  ...props
}: Omit<RacListBoxItemProps, "children" | "className"> & {
  children: ReactNode
  className?: string
}) {
  return (
    <RacListBoxItem
      textValue={typeof children === "string" ? children : undefined}
      {...props}
      className={selectItemStyles({ className })}
    >
      {({ isSelected }) => (
        <div className="flex w-full items-center justify-between gap-2">
          {children}
          {isSelected && (
            <FaCheck className="text-grey-500 size-3.5 shrink-0" />
          )}
        </div>
      )}
    </RacListBoxItem>
  )
}
