import { FieldError as RacFieldError } from "react-aria-components"

import { cn } from "@/lib/utils"

import type { ReactNode } from "react"

export default function FieldError({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <RacFieldError
      className={cn(
        "text-error-primary block text-sm leading-normal font-normal",
        className
      )}
    >
      {children}
    </RacFieldError>
  )
}
