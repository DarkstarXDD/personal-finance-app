"use client"

import { motion } from "motion/react"
import {
  Checkbox as RacCheckbox,
  type CheckboxProps as RacCheckboxProps,
} from "react-aria-components"

import type { ReactNode } from "react"

export default function Checkbox({
  children,
  ...props
}: Omit<RacCheckboxProps, "children"> & { children: ReactNode }) {
  return (
    <RacCheckbox
      {...props}
      className="group rac-disabled:opacity-40 rac-disabled:cursor-not-allowed flex cursor-pointer items-center gap-2"
    >
      {({ isSelected }) => (
        <>
          <span className="group-rac-selected:bg-beige-500 group-rac-focus-visible:outline-2 outline-beige-500 border-beige-500 relative flex h-5 w-5 items-center justify-center rounded-sm border-2 bg-white outline-offset-2">
            {isSelected && <CheckIcon />}
          </span>
          <span className="text-grey-500 text-sm leading-normal font-normal">
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
      className="h-4 w-4 text-white"
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
