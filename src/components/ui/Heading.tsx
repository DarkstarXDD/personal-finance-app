import { tv, type VariantProps } from "tailwind-variants"

import type { ReactNode } from "react"

const headingStyles = tv({
  variants: {
    variant: {
      primary: "text-grey-900 text-2xl leading-tight font-bold md:text-3xl",
      secondary: "text-grey-900 text-xl leading-tight font-bold",
      tertiary: "text-grey-500 text-sm leading-normal font-normal",
    },
  },
  defaultVariants: { variant: "primary" },
})

type HeadingVariants = VariantProps<typeof headingStyles>
type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export default function Heading({
  children,
  as = "h1",
  className,
  variant,
}: {
  as: HeadingElement
  children: ReactNode
  className?: string
} & HeadingVariants) {
  const Component = as

  return (
    <Component className={headingStyles({ variant, className })}>
      {children}
    </Component>
  )
}
