import {
  Label as RacLabel,
  type LabelProps as RacLabelProps,
} from "react-aria-components"
import { tv, type VariantProps } from "tailwind-variants"

const labelStyles = tv({
  base: "text-grey-500 leading-normal",
  variants: {
    variant: {
      primary: "text-xs font-bold",
      secondary: "text-sm font-normal",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

export type LabelVariants = VariantProps<typeof labelStyles>

export default function Label({
  children,
  className,
  variant,
  ...props
}: RacLabelProps & LabelVariants) {
  return (
    <RacLabel {...props} className={labelStyles({ variant, className })}>
      {children}
    </RacLabel>
  )
}
