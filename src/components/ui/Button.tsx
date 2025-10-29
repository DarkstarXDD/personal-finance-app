"use client"

import { type ReactNode } from "react"
import {
  Button as RacButton,
  type ButtonProps as RacButtonProps,
} from "react-aria-components"
import { tv, type VariantProps } from "tailwind-variants"

import Spinner from "@/components/ui/Spinner"

const buttonStyles = tv({
  base: "rac-focus-visible:ring-2 rac-focus-visible:ring-offset-2 rac-disabled:cursor-not-allowed rac-pending:cursor-not-allowed rac-disabled:text-disabled_subtle rac-disabled:bg-disabled_subtle rac-disabled:border-disabled flex cursor-pointer items-center justify-center gap-2 rounded-lg border leading-normal font-semibold transition-colors outline-none",
  variants: {
    variant: {
      primary:
        "bg-brand-solid border-brand-solid rac-hover:border-brand-solid_hover ring-brand rac-hover:bg-brand-solid_hover rac-pressed:bg-brand-solid_hover rac-pressed:border-brand-solid_hover text-white",
      secondary:
        "text-secondary ring-brand bg-primary border-primary rac-hover:bg-primary_hover rac-pressed:bg-primary_hover",
      destructive:
        "bg-error-solid border-error-solid rac-hover:border-error-solid_hover rac-hover:bg-error-solid_hover rac-pressed:bg-error-solid_hover ring-error text-white",
    },
    size: {
      md: "min-h-10 px-3.5 py-2 text-sm",
      lg: "text-md min-h-11 px-3.5 py-2",
      xl: "text-md min-h-13 px-4 py-3",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "xl",
  },
})

type ButtonVariants = VariantProps<typeof buttonStyles>

type ButtonProps = Omit<RacButtonProps, "children" | "className"> &
  ButtonVariants & { children?: ReactNode; className?: string }

export default function Button({
  children,
  className,
  variant,
  size,
  isPending,
  ...props
}: ButtonProps) {
  return (
    <RacButton
      {...props}
      isPending={isPending}
      className={buttonStyles({ variant, size, className })}
    >
      {isPending && <Spinner variant={variant} />}
      {children}
    </RacButton>
  )
}
