import { type ReactNode } from "react"
import {
  FieldError as RacFieldError,
  type FieldErrorProps as RacFieldErrorProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

type FieldErrorProps = Omit<RacFieldErrorProps, "children" | "className"> & {
  children: ReactNode
  className?: string
}

export default function FieldError({ children, className }: FieldErrorProps) {
  return (
    <RacFieldError
      className={cn(
        "text-error-primary block text-sm leading-tight font-normal",
        className
      )}
    >
      {children}
    </RacFieldError>
  )
}
