"use client"

import {
  Button as RacButton,
  type ButtonProps as RacButtonProps,
} from "react-aria-components"
import { tv, type VariantProps } from "tailwind-variants"

const buttonStyles = tv({
  base: "rac-focus-visible:ring-3 rac-disabled:opacity-40 rac-disabled:cursor-not-allowed cursor-pointer rounded-lg p-4 text-sm leading-normal font-bold transition-colors outline-none",
  variants: {
    variant: {
      primary:
        "bg-grey-900 rac-hover:bg-grey-900/85 rac-pressed:bg-grey-900/85 text-white",
      secondary:
        "text-grey-900 bg-beige-100 rac-hover:border-beige-500 rac-pressed:border-beige-500 ring-beige-500 border-beige-100 rac-hover:bg-transparent rac-pressed:bg-transparent border",
      tertiary: "text-grey-500 rac-hover:bg-beige-100 rac-pressed:bg-beige-100",
      destructive:
        "bg-red rac-hover:bg-red/85 rac-pressed:bg-red/85 text-white",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

type ButtonVariants = VariantProps<typeof buttonStyles>

export default function Button({
  children,
  className,
  variant,
  ...props
}: Omit<RacButtonProps, "className"> &
  ButtonVariants & { className?: string }) {
  return (
    <RacButton {...props} className={buttonStyles({ variant, className })}>
      {children}
    </RacButton>
  )
}
