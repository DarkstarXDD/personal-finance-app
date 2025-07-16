import NextLink from "next/link"
import { ComponentProps } from "react"
import { PiHouseFill } from "react-icons/pi"
import { tv } from "tailwind-variants"

import type { IconType } from "react-icons"

export default function Navbar() {
  return (
    <nav className="bg-grey-900 flex items-center justify-between rounded-t-lg px-4 pt-2 lg:w-75 lg:flex-col lg:rounded-none lg:rounded-tr-lg lg:rounded-br-lg">
      <NavbarItem
        href="/"
        label="Overview"
        icon={PiHouseFill}
        TEMP_CURRENT={true}
      />
      <NavbarItem href="/" label="Overview" icon={PiHouseFill} />
      <NavbarItem href="/" label="Overview" icon={PiHouseFill} />
    </nav>
  )
}

const navbarItemStyles = tv({
  slots: {
    navLink:
      "text-grey-300 hover:text-grey-100 active:text-grey-100 border-grey-900 ring-grey-300 grid justify-items-center gap-1 rounded-t-lg border-b-4 px-4 pt-2 pb-2 transition-colors outline-none focus-visible:ring-3 md:px-5",
    navLinkSpan: "hidden text-xs leading-normal font-bold md:block",
  },

  variants: {
    isActive: {
      true: {
        navLink: "bg-beige-100 text-green border-green hover:text-green",
      },
    },
  },
})

const { navLink, navLinkSpan } = navbarItemStyles()

function NavbarItem({
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
      <span className={navLinkSpan()}>{label}</span>
    </NextLink>
  )
}
