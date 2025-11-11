import NextLink from "next/link"
import { ComponentProps } from "react"
import { PiCaretRightFill } from "react-icons/pi"
import { tv, VariantProps } from "tailwind-variants"

const LinkStyles = tv({
  base: "ring-brand block rounded text-sm font-normal underline outline-none focus-visible:ring-2",
  variants: {
    withIcon: {
      true: "text-tertiary hover:text-tertiary_hover group hover:bg-active active:bg-active active:text-tertiary_hover justify flex items-center gap-1 px-2 py-1 font-medium no-underline hover:underline active:underline",
      false: "text-primary hover:text-primary/85 active:text-primary/85",
    },
  },
  defaultVariants: {
    withIcon: false,
  },
})

type LinkVariants = VariantProps<typeof LinkStyles>

type LinkProps = ComponentProps<typeof NextLink> & LinkVariants

export default function Link({
  children,
  withIcon,
  className,
  ...props
}: LinkProps) {
  return (
    <NextLink {...props} className={LinkStyles({ withIcon, className })}>
      {withIcon ? (
        <>
          {children}
          <PiCaretRightFill className="text-fg-quaternary size-4 shrink-0 transition-transform" />
        </>
      ) : (
        <>{children}</>
      )}
    </NextLink>
  )
}
