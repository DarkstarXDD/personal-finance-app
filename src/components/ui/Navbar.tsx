"use client"

import Image from "next/image"
import NextLink from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { useState, createContext, useContext } from "react"
import { Button as RacButton } from "react-aria-components"
import {
  PiArrowFatLinesLeft,
  PiHouseFill as OverviewIcon,
  PiArrowsDownUpFill as TransactionsIcon,
  PiChartDonutFill as BudgetsIcon,
  PiTipJarFill as PotsIcon,
  PiReceiptFill as BillsIcon,
} from "react-icons/pi"
import { tv } from "tailwind-variants"

// Most probably wll change how the logo SVG is imported and added
import logoLarge from "../../../public/logo-large.svg"
import logoSmall from "../../../public/logo-small.svg"

import type { ComponentProps } from "react"
import type { IconType } from "react-icons"

type NavbarContextType = { isExpanded: boolean | undefined }

const NavbarContext = createContext<NavbarContextType>({
  isExpanded: undefined,
})

const navbarStyles = tv({
  slots: {
    nav: "bg-grey-900 w-full rounded-t-lg px-4 pt-2 lg:flex lg:min-h-full lg:flex-col lg:justify-start lg:gap-6 lg:rounded-none lg:rounded-r-xl lg:p-0 lg:pr-6 lg:pb-6",
    logoDivSmall: "hidden p-10 lg:block",
    logoDivLarge: "hidden p-10 lg:block",
    navItemsWrapper:
      "flex items-center justify-between lg:grow lg:flex-col lg:items-start lg:justify-start lg:gap-1",
    buttonIcon: "size-6 shrink-0",
    buttonSpan: "text-base leading-normal font-bold",
  },
  variants: {
    isExpanded: {
      true: {
        nav: "lg:w-75",
        logoDivSmall: "lg:hidden",
        logoDivLarge: "lg:block",
        buttonSpan: "lg:block",
      },
      false: {
        nav: "lg:w-min lg:pr-0",
        logoDivSmall: "lg:block",
        logoDivLarge: "lg:hidden",
        buttonSpan: "lg:hidden",
        buttonIcon: "rotate-180",
      },
    },
  },
})

const {
  nav,
  navItemsWrapper,
  logoDivSmall,
  logoDivLarge,
  buttonIcon,
  buttonSpan,
} = navbarStyles()

export function Navbar({ className }: { className?: string }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <NavbarContext.Provider value={{ isExpanded }}>
      <nav className={nav({ isExpanded, className })}>
        <div className={logoDivSmall({ isExpanded })}>
          <Image src={logoSmall} alt="Finance" />
        </div>
        <div className={logoDivLarge({ isExpanded })}>
          <Image src={logoLarge} alt="Finance" />
        </div>
        <div className={navItemsWrapper()}>
          <NavbarItem href="/" label="Overview" icon={OverviewIcon} />
          <NavbarItem
            href="/transactions"
            label="Transactions"
            icon={TransactionsIcon}
          />
          <NavbarItem href="/budgets" label="Budgets" icon={BudgetsIcon} />
          <NavbarItem href="/pots" label="Pots" icon={PotsIcon} />
          <NavbarItem
            href="/recurring-bills"
            label="Recurring Bills"
            icon={BillsIcon}
          />
        </div>
        <RacButton
          className="text-grey-300 rac-hover:text-grey-100 rac-pressed:text-grey-100 rac-focus-visible:ring-2 ring-grey-300 hidden cursor-pointer items-center justify-start gap-4 rounded-lg px-9 py-4 transition-colors outline-none lg:flex"
          onPress={() => setIsExpanded((prev) => !prev)}
        >
          <PiArrowFatLinesLeft className={buttonIcon({ isExpanded })} />
          <span className={buttonSpan({ isExpanded })}>Minimize Menu</span>
        </RacButton>
      </nav>
    </NavbarContext.Provider>
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
    isExpanded: {
      true: { navLinkSpan: "lg:block" },
      false: { navLinkSpan: "lg:hidden", navLink: "lg:rounded-r-none" },
    },
  },
})

const { navLink, navLinkSpan } = navbarItemStyles()

export function NavbarItem({
  label,
  href,
  icon: Icon,
  ...props
}: Omit<ComponentProps<typeof NextLink>, "children" | "className"> & {
  label: string
  icon: IconType
}) {
  const { isExpanded } = useContext(NavbarContext)
  const currentSegment = useSelectedLayoutSegment()

  let segmentNameFromHref: string | null = null

  if (typeof href === "string") {
    segmentNameFromHref = href.split("/").filter(Boolean)[0] || null
  }

  const isActive = currentSegment === segmentNameFromHref

  return (
    <NextLink
      {...props}
      href={href}
      className={navLink({
        isActive: isActive,
        isExpanded,
      })}
    >
      <Icon className="size-6 shrink-0" />
      <span className={navLinkSpan({ isActive: isActive, isExpanded })}>
        {label}
      </span>
    </NextLink>
  )
}
