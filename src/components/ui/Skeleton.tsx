import { tv, VariantProps } from "tailwind-variants"

const skeletonStyles = tv({
  base: "block animate-pulse rounded-md",
  variants: { theme: { light: "bg-grey-100", dark: "bg-grey-500/30" } },
  defaultVariants: { theme: "light" },
})

type SkeletonVariants = VariantProps<typeof skeletonStyles>

export default function Skeleton({
  theme,
  className,
}: { className?: string } & SkeletonVariants) {
  return <span className={skeletonStyles({ theme, className })} />
}
