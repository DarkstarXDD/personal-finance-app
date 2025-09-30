import {
  Label as RacLabel,
  type LabelProps as RacLabelProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

const labelStyles = tv({
  base: "text-grey-500 text-xs leading-normal font-bold",
})

export default function Label({
  children,
  className,
  ...props
}: RacLabelProps) {
  return (
    <RacLabel {...props} className={labelStyles({ className })}>
      {children}
    </RacLabel>
  )
}
