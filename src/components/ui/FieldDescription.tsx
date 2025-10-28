import { Text as RacText } from "react-aria-components"

import { cn } from "@/lib/utils"

import type { ReactNode } from "react"

export default function FieldDescription({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <RacText
      slot="description"
      className={cn(
        "text-tertiary block text-sm leading-normal font-normal",
        className
      )}
    >
      {children}
    </RacText>
  )
}
