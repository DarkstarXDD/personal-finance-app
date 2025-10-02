import { ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

const skeletonStyles = tv({
  base: "block rounded-md motion-safe:animate-pulse",
  variants: { theme: { light: "bg-grey-100", dark: "bg-grey-500/30" } },
  defaultVariants: { theme: "light" },
})

type SkeletonVariants = VariantProps<typeof skeletonStyles>

export default function Skeleton({
  theme,
  className,
  children,
}: { className?: string; children?: ReactNode } & SkeletonVariants) {
  return (
    <span className={skeletonStyles({ theme, className })}>{children} </span>
  )
}
