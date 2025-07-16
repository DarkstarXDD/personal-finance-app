import Image from "next/image"
import NextLink from "next/link"
import { PiArrowFatLinesLeft } from "react-icons/pi"
import { tv } from "tailwind-variants"

// Most probably wll change how the logo SVG is imported and added
import logoLarge from "../../../public/logo-large.svg"
// import logoSmall from "../../../public/logo-small.svg"

import type { ComponentProps, ReactNode } from "react"
import type { IconType } from "react-icons"

export function Navbar({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-grey-900 rounded-t-lg px-4 pt-2 lg:grid lg:w-75 lg:gap-6 lg:rounded-none lg:rounded-r-lg lg:p-0 lg:pr-6">
      <div className="hidden px-8 py-10 lg:block">
        <Image src={logoLarge} alt="Finance" />
      </div>
      <div className="flex items-center justify-between lg:flex-col lg:items-start">
        {children}
      </div>
      <button className="text-grey-300 hover:text-grey-100 flex cursor-pointer items-center justify-start gap-4 px-9 py-4">
        <PiArrowFatLinesLeft className="size-6 shrink-0" />
        <p className="text-base leading-normal font-bold">Minimize Menu</p>
      </button>
    </nav>
  )
}

const navbarItemStyles = tv({
  slots: {
    navLink:
      "text-grey-300 hover:text-grey-100 active:text-grey-100 border-grey-900 ring-grey-300 flex flex-col items-center gap-1 rounded-t-lg border-b-4 px-4 pt-2 pb-2 transition-colors outline-none focus-visible:ring-3 md:px-5 lg:w-full lg:flex-row lg:justify-start lg:gap-4 lg:rounded-none lg:rounded-r-lg lg:border-b-0 lg:border-l-4 lg:px-8 lg:py-4",
    navLinkSpan:
      "hidden text-xs leading-normal font-bold md:block lg:text-base",
  },

  variants: {
    isActive: {
      true: {
        navLink: "bg-beige-100 text-green border-green hover:text-green",
        navLinkSpan: "text-grey-900",
      },
    },
  },
})

const { navLink, navLinkSpan } = navbarItemStyles()

export function NavbarItem({
  label,
  icon: Icon,
  TEMP_CURRENT = false,
  ...props
}: Omit<ComponentProps<typeof NextLink>, "children" | "className"> & {
  label: string
  icon: IconType
  TEMP_CURRENT?: boolean
}) {
  return (
    <NextLink {...props} className={navLink({ isActive: TEMP_CURRENT })}>
      <Icon className="size-6 shrink-0" />
      <span className={navLinkSpan({ isActive: TEMP_CURRENT })}>{label}</span>
    </NextLink>
  )
}
