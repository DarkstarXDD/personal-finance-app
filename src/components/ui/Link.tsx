import NextLink from "next/link"
import { ComponentProps } from "react"
import { PiCaretRightFill } from "react-icons/pi"
import { tv, VariantProps } from "tailwind-variants"

const LinkStyles = tv({
  base: "ring-grey-500 rounded text-sm leading-normal font-normal underline ring-offset-4 transition-all outline-none focus-visible:ring-3",
  variants: {
    withIcon: {
      true: "text-grey-500 hover:text-grey-900/85 group active:text-grey-900/85 justify flex items-center gap-2 no-underline hover:underline",
      false: "text-grey-900 hover:text-grey-900/85 active:text-grey-900/85",
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
          <PiCaretRightFill className="shrink-0 transition-transform group-hover:translate-x-1" />
        </>
      ) : (
        <>{children}</>
      )}
    </NextLink>
  )
}
