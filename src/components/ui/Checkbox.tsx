"use client"

import { motion } from "motion/react"
import { type ReactNode } from "react"
import {
  Checkbox as RacCheckbox,
  type CheckboxProps as RacCheckboxProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

type CheckboxProps = Omit<RacCheckboxProps, "children"> & {
  children: ReactNode
}

export default function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <RacCheckbox
      {...props}
      className="group rac-disabled:cursor-not-allowed flex cursor-pointer items-start gap-2"
    >
      {({ isSelected, isHovered, isPressed, isFocusVisible }) => (
        <>
          <span
            className={cn(
              "border-primary bg-primary flex size-5 items-center justify-center rounded-sm border text-white",

              // Hover
              isHovered && "bg-primary_hover",

              // Pressed
              isPressed && "bg-primary_hover",

              // Focus visible
              isFocusVisible && "ring-brand border-brand ring",

              // Selected
              "group-rac-selected:bg-brand group-rac-selected:border-brand",

              // Disabled
              "group-rac-disabled:bg-disabled_subtle group-rac-disabled:border-disabled group-rac-disabled:text-disabled_subtle"
            )}
          >
            {isSelected && <CheckIcon />}
          </span>

          <span className="text-secondary text-sm leading-normal font-medium">
            {children}
          </span>
        </>
      )}
    </RacCheckbox>
  )
}

function CheckIcon() {
  return (
    <svg
      className="size-4"
      stroke="currentColor"
      strokeWidth={3}
      fill="none"
      viewBox="0 0 24 24"
    >
      <motion.path
        d="M5 13l4 4L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.15 }}
      />
    </svg>
  )
}
