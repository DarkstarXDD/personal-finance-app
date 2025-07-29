"use client"

import { ReactNode } from "react"
import {
  Button as RacButton,
  type ButtonProps as RacButtonProps,
} from "react-aria-components"
import { IoCloseCircleOutline } from "react-icons/io5"
import { tv, type VariantProps } from "tailwind-variants"

const buttonStyles = tv({
  base: "rac-focus-visible:ring-3 rac-disabled:opacity-40 rac-disabled:cursor-not-allowed rac-pending:cursor-not-allowed cursor-pointer rounded-lg p-4 text-sm leading-normal font-bold transition-colors outline-none",
  variants: {
    variant: {
      primary:
        "bg-grey-900 rac-hover:bg-grey-900/85 rac-pressed:bg-grey-900/85 text-white",
      secondary:
        "text-grey-900 bg-beige-100 rac-hover:border-beige-500 rac-pressed:border-beige-500 ring-beige-500 border-beige-100 rac-hover:bg-transparent rac-pressed:bg-transparent border",
      tertiary: "text-grey-500 rac-hover:bg-beige-100 rac-pressed:bg-beige-100",
      destructive:
        "bg-red rac-hover:bg-red/85 rac-pressed:bg-red/85 text-white",
      close:
        "ring-beige-500 text-grey-500 rac-pressed:text-beige-500 rac-hover:text-beige-500 size-7 rounded-full p-0",
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
  "aria-label": ariaLabel,
  isPending,
  ...props
}: Omit<RacButtonProps, "children" | "className"> &
  ButtonVariants & { children?: ReactNode; className?: string }) {
  return (
    <RacButton
      {...props}
      isPending={isPending}
      className={buttonStyles({ variant, className })}
      aria-label={variant === "close" ? (ariaLabel ?? "Close") : ariaLabel}
    >
      {variant === "close" ? (
        <IoCloseCircleOutline className="size-7 shrink-0" />
      ) : (
        <>{isPending ? "Loading..." : children}</>
      )}
    </RacButton>
  )
}
