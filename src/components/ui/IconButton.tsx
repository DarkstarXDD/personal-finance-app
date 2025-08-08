"use client"

import {
  Button as RacButton,
  type ButtonProps as RacButtonProps,
} from "react-aria-components"
import { IoCloseCircleOutline as CloseIcon } from "react-icons/io5"
import { PiDotsThreeOutlineFill as OptionsIcon } from "react-icons/pi"
import { tv, type VariantProps } from "tailwind-variants"

import { buttonStyles } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const iconStyles = tv({
  base: "shrink-0",
  variants: {
    variant: {
      close: "size-7",
      options: "size-5",
    },
  },
  defaultVariants: {
    variant: "close",
  },
})

type IconVariants = VariantProps<typeof iconStyles>

export default function IconButton({
  variant,
  className,
  ...props
}: Omit<RacButtonProps, "children" | "className"> &
  IconVariants & { className?: string }) {
  const Icon = variant === "options" ? OptionsIcon : CloseIcon
  return (
    <RacButton
      aria-label={variant === "options" ? "Options" : "Close"}
      {...props}
      className={buttonStyles({
        className: cn(
          "ring-beige-500 text-grey-500 rac-pressed:text-beige-500 rac-hover:text-beige-500 rounded-full bg-transparent p-0",
          className
        ),
      })}
    >
      <Icon className={iconStyles({ variant })} />
    </RacButton>
  )
}
