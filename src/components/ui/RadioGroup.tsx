import { motion } from "motion/react"
import { type ReactNode } from "react"
import {
  Radio as RacRadio,
  RadioGroup as RacRadioGroup,
  type RadioGroupProps as RacRadioGroupProps,
  type RadioProps as RacRadioProps,
} from "react-aria-components"
import { type IconType } from "react-icons"

import FieldError from "@/components/ui/FieldError"
import Label from "@/components/ui/FieldLabel"
import { cn } from "@/lib/utils"

type RadioGroupProps = Omit<RacRadioGroupProps, "children" | "className"> & {
  label?: string
  children?: ReactNode
  errorMessage?: string
  className?: string
}

function RadioGroup({
  label,
  children,
  className,
  errorMessage,
  ...props
}: RadioGroupProps) {
  return (
    <RacRadioGroup {...props} className={cn("grid gap-1.5", className)}>
      <Label>{label}</Label>

      <div className={cn("flex flex-col gap-2")}>{children}</div>

      <FieldError>{errorMessage}</FieldError>
    </RacRadioGroup>
  )
}

// ============================================
// ============= Radio Group Item =============
// ============================================

type RadioGroupItemProps = Omit<RacRadioProps, "children"> & {
  title: string
  description?: string
  icon: IconType
}

function RadioGroupItem({
  title,
  description,
  icon: Icon,
  className,
  ...props
}: RadioGroupItemProps) {
  return (
    <RacRadio {...props} className="group w-full">
      {({ isPressed, isSelected, isDisabled, isFocusVisible }) => (
        <div
          className={cn(
            "bg-primary border-primary group-rac-selected:border-brand group-rac-selected:bg-active relative flex cursor-pointer items-start justify-between gap-2 rounded-lg border px-3.5 py-3 text-sm",

            // Pressed
            isPressed && "bg-primary_hover",

            // Focus visible
            isFocusVisible && "ring-brand border-brand ring",

            // Disabled
            isDisabled &&
              "bg-disabled_subtle border-disabled cursor-not-allowed",

            className
          )}
        >
          <div className="flex items-start gap-3">
            <div className="border-primary group-rac-disabled:bg-disabled_subtle group-rac-disabled:text-fg-disabled text-fg-secondary flex size-6 items-center justify-center rounded-md border bg-transparent">
              <Icon className="size-4" />
            </div>

            <div className="grid">
              <p className="text-secondary text-sm font-medium">{title}</p>
              <p className="text-tertiary text-sm">{description}</p>
            </div>
          </div>

          <span className="border-brand group-rac-disabled:border-disabled relative size-4 shrink-0 rounded-full border-2 bg-white">
            <motion.span
              className="bg-brand absolute inset-0 rounded-full"
              initial={{ scale: 0 }}
              animate={isSelected ? "selected" : "unSelected"}
              variants={{
                selected: { scale: 0.75, opacity: 1 },
                unSelected: { scale: 0, opacity: 0 },
              }}
              transition={{ type: "spring", stiffness: 375, damping: 30 }}
            />
          </span>
        </div>
      )}
    </RacRadio>
  )
}

export { RadioGroup, RadioGroupItem }
