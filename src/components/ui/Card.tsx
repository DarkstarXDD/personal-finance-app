import { type ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

const cardStyles = tv({
  base: "border-secondary bg-primary rounded-xl border",

  variants: {
    size: {
      sm: "p-5",
      md: "p-6",
      lg: "p-6 md:p-8",
    },
  },

  defaultVariants: { size: "md" },
})

type CardVariants = VariantProps<typeof cardStyles>

type CardProps = { children: ReactNode; className?: string } & CardVariants

export default function Card({ children, className, size }: CardProps) {
  return <div className={cardStyles({ size, className })}>{children}</div>
}
