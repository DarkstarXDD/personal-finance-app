import { type ReactNode } from "react"
import { Text as RacText } from "react-aria-components"

import { cn } from "@/lib/utils"

type FieldDescriptionProps = {
  children: ReactNode
  className?: string
}

export default function FieldDescription({
  children,
  className,
}: FieldDescriptionProps) {
  return (
    <RacText
      slot="description"
      className={cn(
        "text-tertiary block justify-self-end text-sm leading-tight font-normal",
        className
      )}
    >
      {children}
    </RacText>
  )
}
