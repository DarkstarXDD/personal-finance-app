"use client"

import NextLink from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import {
  PiHouseFill as OverviewIcon,
  PiArrowsDownUpFill as TransactionsIcon,
  PiChartDonutFill as BudgetsIcon,
  PiTipJarFill as PotsIcon,
  PiReceiptFill as BillsIcon,
  PiUserFill as AccountIcon,
} from "react-icons/pi"
import { tv } from "tailwind-variants"

import type { ComponentProps } from "react"
import type { IconType } from "react-icons"

const navbarMobileStyles = tv({
  slots: {
    navbarMobile: "bg-grey-900 w-full rounded-t-lg px-4 pt-2",
    navItemsMobile: "flex items-center justify-between",
  },
})

const { navbarMobile, navItemsMobile } = navbarMobileStyles()

export default function NavbarMobile({ className }: { className?: string }) {
  return (
    <nav className={navbarMobile({ className })}>
      <ul className={navItemsMobile()}>
        <NavItemMobile
          href="/"
          label="Overview"
          icon={OverviewIcon}
          title="Overview"
        />
        <NavItemMobile
          href="/transactions"
          label="Transactions"
          icon={TransactionsIcon}
          title="Transactions"
        />
        <NavItemMobile
          href="/budgets"
          label="Budgets"
          icon={BudgetsIcon}
          title="Budgets"
        />
        <NavItemMobile href="/pots" label="Pots" icon={PotsIcon} title="Pots" />
        <NavItemMobile
          href="/recurring-bills"
          label="Recurring Bills"
          icon={BillsIcon}
          title="Recurring Bills"
        />
        <NavItemMobile
          href="/account"
          label="Account"
          icon={AccountIcon}
          title="Account"
        />
      </ul>
    </nav>
  )
}

const navItemMobileStyles = tv({
  slots: {
    navItemMobile:
      "text-grey-300 hover:text-grey-100 active:text-grey-100 border-grey-900 ring-grey-300 flex w-full flex-col items-center gap-1 rounded-t-lg border-b-4 px-3 py-2 transition-colors outline-none focus-visible:ring-3 md:px-4",
    navItemTextMobile:
      "hidden text-center text-xs leading-normal font-bold md:block",
  },

  variants: {
    isActive: {
      true: {
        navItemMobile:
          "bg-beige-100 text-green border-green hover:text-green active:text-green",
        navItemTextMobile: "text-grey-900",
      },
    },
  },
})

const { navItemMobile, navItemTextMobile } = navItemMobileStyles()

function NavItemMobile({
  label,
  href,
  icon: Icon,
  ...props
}: Omit<ComponentProps<typeof NextLink>, "children" | "className"> & {
  label: string
  icon: IconType
}) {
  const currentSegment = useSelectedLayoutSegment()

  let segmentNameFromProps: string | null = null

  if (typeof href === "string") {
    segmentNameFromProps = href.split("/").filter(Boolean)[0] || null
  }

  const isActive = currentSegment === segmentNameFromProps

  return (
    <li className="w-full max-w-26 md:max-w-none">
      <NextLink
        {...props}
        href={href}
        className={navItemMobile({ isActive })}
        aria-label={label}
      >
        <Icon className="size-6" />
        <span className={navItemTextMobile({ isActive })}>{label}</span>
      </NextLink>
    </li>
  )
}
