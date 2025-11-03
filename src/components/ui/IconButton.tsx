"use client"

import {
  Button as RacButton,
  type ButtonProps as RacButtonProps,
} from "react-aria-components"
import { IoCloseCircleOutline as CloseIcon } from "react-icons/io5"
import { PiDotsThreeOutlineFill as OptionsIcon } from "react-icons/pi"

import { cn } from "@/lib/utils"

type IconButtonProps = Omit<RacButtonProps, "children" | "className"> & {
  variant: "close" | "options"
  className?: string
}

export default function IconButton({
  variant,
  className,
  ...props
}: IconButtonProps) {
  const Icon = variant === "options" ? OptionsIcon : CloseIcon

  return (
    <RacButton
      aria-label={variant === "options" ? "Options" : "Close"}
      {...props}
      className={cn(
        "text-fg-tertiary ring-brand bg-primary border-primary rac-hover:text-fg-tertiary_hover rac-pressed:text-fg-tertiary_hover rac-disabled:cursor-not-allowed rac-pending:cursor-not-allowed rac-focus-visible:ring-2 rac-disabled:text-disabled_subtle cursor-pointer rounded-full ring-offset-1 transition-colors outline-none",
        className
      )}
    >
      <Icon
        className={cn(
          variant == "close" && "size-7",
          variant == "options" && "size-5"
        )}
      />
    </RacButton>
  )
}
