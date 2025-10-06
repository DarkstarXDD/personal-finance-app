import { tv, type VariantProps } from "tailwind-variants"

const spinnerStyles = tv({
  base: "border-grey-900 size-4 rounded-full border-2 motion-safe:animate-spin motion-safe:[animation-duration:600ms]",

  variants: {
    theme: {
      dark: "border-grey-500 border-b-transparent",
      light: "border-white border-b-transparent",
    },
  },

  defaultVariants: { theme: "light" },
})

type SpinnerVariants = VariantProps<typeof spinnerStyles>

export default function Spinner({
  theme,
  className,
}: { className?: string } & SpinnerVariants) {
  return <div className={spinnerStyles({ theme, className })} />
}
