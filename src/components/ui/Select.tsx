"use client"

import { motion } from "motion/react"
import { type ReactNode, type Ref } from "react"
import {
  Select as RacSelect,
  SelectValue as RacSelectValue,
  Popover as RacPopover,
  ListBox as RacListBox,
  ListBoxItem as RacListBoxItem,
  type SelectProps as RacSelectProps,
  type ListBoxItemProps as RacListBoxItemProps,
} from "react-aria-components"
import { PiCheckBold, PiCaretDownFill } from "react-icons/pi"

import Button from "@/components/ui/Button"
import FieldDescription from "@/components/ui/FieldDescription"
import FieldError from "@/components/ui/FieldError"
import FieldLabel from "@/components/ui/FieldLabel"
import { cn } from "@/lib/utils"

type SelectProps<T extends object> = Omit<
  RacSelectProps<T>,
  "children" | "className"
> & {
  label?: string
  description?: string
  errorMessage?: string
  items?: Iterable<T>
  children?: ReactNode | ((item: T) => ReactNode)
  ref?: Ref<HTMLDivElement>
  className?: string
}

function Select<T extends object>({
  label,
  description,
  errorMessage,
  isInvalid,
  items,
  children,
  ref,
  className,
  ...props
}: SelectProps<T>) {
  return (
    <RacSelect
      isInvalid={isInvalid}
      {...props}
      ref={ref}
      className={cn("group", className)}
    >
      {({ isOpen }) => (
        <>
          <div className="grid justify-items-start gap-1.5">
            <FieldLabel>{label}</FieldLabel>

            <Button
              variant="secondary"
              size="lg"
              className="rac-focus-visible:ring-offset-0 group-rac-invalid:border-error group-rac-invalid:ring-error rac-focus-visible:ring rac-focus-visible:border-brand group-rac-invalid:rac-focus-visible:border-error flex w-full justify-between gap-2 transition-none"
            >
              <RacSelectValue className="rac-placeholder-shown:text-placeholder rac-placeholder-shown:font-normal text-primary text-md rac-placeholder-shown:truncate truncate leading-normal font-medium" />

              <PiCaretDownFill
                className={cn(
                  "text-fg-quaternary transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </Button>

            <FieldError>{errorMessage}</FieldError>

            {description && !isInvalid && (
              <FieldDescription>{description}</FieldDescription>
            )}
          </div>

          <RacPopover>
            <motion.div
              initial={{ y: -12, opacity: 0.4 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
              className="bg-primary border-secondary custom-scrollbar max-h-80 w-(--trigger-width) overflow-auto rounded-lg border p-1.5"
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

type SelectItemProps = Omit<RacListBoxItemProps, "children" | "className"> & {
  children: ReactNode
  className?: string
}

function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <RacListBoxItem
      {...props}
      textValue={typeof children === "string" ? children : undefined}
      className={cn(
        "text-md text-primary rac-selected:bg-active rac-focus-visible:bg-active rac-pressed:bg-active rac-hover:bg-active cursor-pointer rounded-md p-2 leading-normal font-medium outline-none",
        className
      )}
    >
      {({ isSelected }) => (
        <span className="flex w-full items-center justify-between gap-4">
          {children}

          {isSelected && <PiCheckBold className="text-fg-tertiary size-4" />}
        </span>
      )}
    </RacListBoxItem>
  )
}

export { Select, SelectItem }
