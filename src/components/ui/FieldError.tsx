import { FieldError as RacFieldError } from "react-aria-components"
import { tv } from "tailwind-variants"

import type { ReactNode } from "react"

const fieldErrorStyles = tv({
  base: "text-red text-xs leading-normal font-normal",
})

export default function FieldError({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <RacFieldError className={fieldErrorStyles({ className })}>
      {children}
    </RacFieldError>
  )
}
