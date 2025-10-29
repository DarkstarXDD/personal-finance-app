import {
  Label as RacLabel,
  type LabelProps as RacLabelProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

export default function FieldLabel({
  children,
  className,
  ...props
}: RacLabelProps) {
  return (
    <RacLabel
      {...props}
      className={cn(
        "text-secondary block text-sm leading-normal font-medium",
        className
      )}
    >
      {children}
    </RacLabel>
  )
}
