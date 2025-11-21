import { type ReactNode, type ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const cardStyles = tv({
  base: "border-secondary bg-primary rounded-xl border shadow-xs",

  variants: {
    size: {
      sm: "p-5",
      md: "p-6",
      lg: "p-5 sm:p-6 md:p-8",
    },
  },

  defaultVariants: { size: "md" },
})

type CardVariants = VariantProps<typeof cardStyles>

type CardProps = {
  children: ReactNode
  className?: string
} & ComponentProps<"div"> &
  CardVariants

export default function Card({
  children,
  className,
  size,
  ...props
}: CardProps) {
  return (
    <div {...props} className={cardStyles({ size, className })}>
      {children}
    </div>
  )
}
