"use client"

import { ReactNode } from "react"
import {
  Button as RacButton,
  type ButtonProps as RacButtonProps,
} from "react-aria-components"
import { tv, type VariantProps } from "tailwind-variants"

import Spinner from "@/components/ui/Spinner"

const buttonStyles = tv({
  base: "rac-focus-visible:ring-2 rac-focus-visible:ring-offset-2 rac-disabled:cursor-not-allowed rac-pending:cursor-not-allowed flex cursor-pointer items-center justify-center gap-2 rounded-lg leading-normal font-semibold transition-colors outline-none",
  variants: {
    variant: {
      primary:
        "bg-brand-solid border-brand-solid rac-hover:border-brand-solid_hover ring-brand rac-hover:bg-brand-solid_hover rac-pressed:bg-brand-solid_hover rac-pressed:border-brand-solid_hover rac-disabled:bg-primary rac-disabled:text-disabled_subtle rac-disabled:border-disabled border text-white",
      secondary:
        "text-secondary ring-brand bg-primary border-primary rac-hover:bg-primary_hover rac-pressed:bg-primary_hover rac-disabled:text-disabled_subtle rac-disabled:border-disabled border",
      destructive:
        "bg-error-solid rac-disabled:bg-disabled rac-disabled:border-disabled border-error-solid rac-hover:border-error-solid_hover rac-hover:bg-error-solid_hover rac-pressed:bg-error-solid_hover ring-error rac-disabled:text-disabled_subtle border text-white",
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

export default function Button({
  children,
  className,
  variant,
  size,
  isPending,
  ...props
}: Omit<RacButtonProps, "children" | "className"> &
  ButtonVariants & { children?: ReactNode; className?: string }) {
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
