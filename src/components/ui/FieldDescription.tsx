import {
  Text as RacText,
  type TextProps as RacTextProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

export default function FieldDescription({
  children,
  className,
}: RacTextProps) {
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
