import { tv, type VariantProps } from "tailwind-variants"

const spinnerStyles = tv({
  slots: {
    svg: "h-5 w-5 motion-safe:animate-spin motion-safe:[animation-duration:800ms]",
    backgroundCircle: "",
    arc: "",
  },

  variants: {
    variant: {
      primary: {
        backgroundCircle: "text-fg-disabled_subtle",
        arc: "text-fg-tertiary",
      },
      secondary: {
        backgroundCircle: "text-fg-disabled_subtle",
        arc: "text-fg-quaternary",
      },
      destructive: {
        backgroundCircle: "text-fg-error-tertiary",
        arc: "text-fg-error-secondary",
      },
    },
  },

  defaultVariants: { variant: "primary" },
})

type SpinnerVariants = VariantProps<typeof spinnerStyles>

export default function Spinner({
  variant,
  className,
}: { className?: string } & SpinnerVariants) {
  const { svg, backgroundCircle, arc } = spinnerStyles({ variant })

  return (
    <svg className={svg({ className })} viewBox="0 0 50 50">
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="5"
        className={backgroundCircle()}
        fill="none"
      />
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="5"
        className={arc()}
        strokeDasharray="30 150"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
