import NextLink from "next/link"
import { type ComponentProps } from "react"
import { PiCaretRightFill } from "react-icons/pi"
import { tv, type VariantProps } from "tailwind-variants"

const LinkStyles = tv({
  base: "text-tertiary hover:text-tertiary_hover active:text-tertiary_hover ring-brand block rounded text-sm font-medium outline-none focus-visible:ring-2",
  variants: {
    withIcon: {
      true: "group hover:bg-active active:bg-active justify flex items-center gap-1 px-2 py-1 hover:underline active:underline",
      false: "underline",
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
          <PiCaretRightFill className="text-fg-quaternary size-4 shrink-0" />
        </>
      ) : (
        <>{children}</>
      )}
    </NextLink>
  )
}
