"use client"

import {
  Button as RacButton,
  type ButtonProps as RacButtonProps,
} from "react-aria-components"
import { IoCloseCircleOutline as CloseIcon } from "react-icons/io5"
import { PiDotsThreeOutlineFill as OptionsIcon } from "react-icons/pi"
import { tv, type VariantProps } from "tailwind-variants"

const iconButtonStyles = tv({
  slots: {
    buttonStyles:
      "ring-beige-500 text-grey-500 rac-pressed:text-beige-500 rac-hover:text-beige-500 rac-focus-visible:ring-3 rac-disabled:opacity-40 rac-disabled:cursor-not-allowed rac-pending:cursor-not-allowed cursor-pointer rounded-full bg-transparent p-0 ring-offset-2 transition-all outline-none",
    iconStyles: "shrink-0",
  },

  variants: {
    variant: {
      close: { iconStyles: "size-7" },
      options: { iconStyles: "size-5" },
    },
  },
  defaultVariants: {
    variant: "close",
  },
})

const { buttonStyles, iconStyles } = iconButtonStyles()

type IconVariants = VariantProps<typeof iconButtonStyles>

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
      className={buttonStyles({ className })}
    >
      <Icon className={iconStyles({ variant })} />
    </RacButton>
  )
}
