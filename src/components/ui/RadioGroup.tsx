import { motion } from "motion/react"
import {
  Radio as RacRadio,
  RadioGroup as RacRadioGroup,
} from "react-aria-components"
import { tv, VariantProps } from "tailwind-variants"

import FieldError from "@/components/ui/FieldError"
import Label from "@/components/ui/FieldLabel"
import { cn } from "@/lib/utils"

import type { ReactNode } from "react"
import type {
  RadioGroupProps as RacRadioGroupProps,
  RadioProps as RacRadioProps,
} from "react-aria-components"

const radioStyles = tv({
  slots: {
    radioItemsWrapper: "flex gap-3",
  },
  variants: {
    layout: {
      vertical: { radioItemsWrapper: "flex-col" },
      horizontal: { radioItemsWrapper: "flex-row" },
    },
  },
  defaultVariants: { layout: "vertical" },
})

const { radioItemsWrapper } = radioStyles()

type RadioVariants = VariantProps<typeof radioStyles>

type RadioGroupProps = Omit<RacRadioGroupProps, "children" | "className"> & {
  label?: string
  children?: ReactNode
  errorMessage?: string
  className?: string
} & RadioVariants

function RadioGroup({
  label,
  children,
  className,
  errorMessage,
  layout,
  ...props
}: RadioGroupProps) {
  return (
    <RacRadioGroup
      {...props}
      className={cn("grid gap-1", className)}
      orientation={layout}
    >
      <Label>{label}</Label>
      <div className={radioItemsWrapper({ layout })}>{children}</div>
      <FieldError>{errorMessage}</FieldError>
    </RacRadioGroup>
  )
}

type RadioGroupItemProps = Omit<RacRadioProps, "children"> & {
  children: ReactNode
}

function RadioGroupItem({
  children,
  className,
  ...props
}: RadioGroupItemProps) {
  return (
    <RacRadio {...props} className="group w-full">
      {({ isSelected }) => (
        <div
          className={cn(
            "border-beige-500 group-rac-disabled:opacity-40 group-rac-disabled:cursor-not-allowed text-grey-500 group-rac-hover:bg-beige-100 group-rac-focus-visible:ring-2 ring-beige-500 group-rac-selected:bg-beige-300 relative flex cursor-pointer items-center gap-2 rounded-lg border bg-white px-5 py-3 text-sm leading-normal font-normal transition-[background-color]",
            className
          )}
        >
          <motion.span
            className="border-grey-500 relative h-5 w-5 shrink-0 rounded-full border-2 bg-white"
            animate={isSelected ? "selected" : "unSelected"}
            variants={{
              selected: { borderColor: "var(--color-beige-500)" },
              unSelected: { borderColor: "var(--color-beige-500)" },
            }}
          >
            <motion.span
              className="bg-beige-500 absolute inset-0 rounded-full"
              initial={{ scale: 0 }}
              animate={isSelected ? "selected" : "unSelected"}
              variants={{
                selected: { scale: 0.7, opacity: 1 },
                unSelected: { scale: 0, opacity: 0 },
              }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          </motion.span>
          {children}
        </div>
      )}
    </RacRadio>
  )
}

export { RadioGroup, RadioGroupItem }
