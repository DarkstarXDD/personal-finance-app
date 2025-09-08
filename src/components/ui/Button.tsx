"use client"

import { ReactNode } from "react"
import {
  Button as RacButton,
  type ButtonProps as RacButtonProps,
} from "react-aria-components"
import { tv, type VariantProps } from "tailwind-variants"

export const buttonStyles = tv({
  base: "rac-focus-visible:ring-3 rac-disabled:opacity-40 rac-disabled:cursor-not-allowed rac-pending:cursor-not-allowed cursor-pointer rounded-lg p-4 text-sm leading-normal font-bold ring-offset-2 transition-all outline-none",
  variants: {
    variant: {
      primary:
        "bg-grey-900 ring-navy rac-hover:bg-grey-900/95 rac-pressed:bg-grey-900/95 text-white",
      secondary:
        "text-grey-500 bg-beige-100 ring-beige-500 rac-hover:bg-beige-300 rac-pressed:bg-beige-300",
      destructive:
        "bg-red rac-hover:bg-red/90 rac-pressed:bg-red/90 ring-red text-white",
    },
  },
})

type ButtonVariants = VariantProps<typeof buttonStyles>

export default function Button({
  children,
  className,
  variant,
  isPending,
  ...props
}: Omit<RacButtonProps, "children" | "className"> &
  ButtonVariants & { children?: ReactNode; className?: string }) {
  return (
    <RacButton
      {...props}
      isPending={isPending}
      className={buttonStyles({ variant, className })}
    >
      {isPending ? "Loading..." : children}
    </RacButton>
  )
}
