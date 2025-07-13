import { tv, VariantProps } from "tailwind-variants"

import type { ReactNode } from "react"

const cardStyles = tv({
  base: "rounded-xl shadow-xs",

  variants: {
    theme: {
      light: "text-grey-900 bg-white",
      dark: "bg-grey-900 text-white",
    },
    padding: {
      sm: "p-5 md:p-6",
      lg: "px-5 py-6 md:p-8",
    },
  },

  defaultVariants: {
    theme: "light",
    padding: "lg",
  },
})

type CardVariants = VariantProps<typeof cardStyles>

export default function Card({
  children,
  theme,
  padding,
}: { children: ReactNode } & CardVariants) {
  return <div className={cardStyles({ theme, padding })}>{children}</div>
}
