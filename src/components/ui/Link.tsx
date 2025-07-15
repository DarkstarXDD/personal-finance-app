import NextLink from "next/link"
import { ComponentProps } from "react"
import { PiCaretRightFill } from "react-icons/pi"
import { tv, VariantProps } from "tailwind-variants"

const LinkStyles = tv({
  base: "ring-grey-500 text-grey-900 hover:text-grey-900/80 active:text-grey-500 rounded text-sm leading-normal font-normal underline outline-none focus-visible:ring-2",
  variants: {
    withIcon: {
      true: "text-grey-500 hover:text-grey-900 active:text-grey-900/80 justify flex items-center gap-3 no-underline hover:underline",
    },
  },
  defaultVariants: {
    withIcon: false,
  },
})

type LinkVariants = VariantProps<typeof LinkStyles>

export default function Link({
  children,
  withIcon,
  className,
  ...props
}: ComponentProps<typeof NextLink> & LinkVariants) {
  return (
    <NextLink {...props} className={LinkStyles({ withIcon, className })}>
      {withIcon ? (
        <>
          {children}
          <PiCaretRightFill className="shrink-0" />
        </>
      ) : (
        <>{children}</>
      )}
    </NextLink>
  )
}
