"use client"

import Cookies from "js-cookie"
import { motion, type Variants } from "motion/react"
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

import BrandLogo from "@/components/icons/BrandLogo"

import type { ComponentProps } from "react"
import type { IconType } from "react-icons"

const navbarStyles = tv({
  slots: {
    navbar:
      "bg-grey-900 w-full lg:flex lg:max-h-dvh lg:flex-col lg:justify-start lg:gap-6 lg:rounded-r-2xl lg:pb-6",
    logo: "hidden p-10 lg:block",
    navItems:
      "flex lg:grow lg:flex-col lg:items-start lg:justify-start lg:gap-1",
    button:
      "text-grey-300 rac-hover:text-grey-100 rac-pressed:text-grey-100 rac-focus-visible:ring-2 ring-grey-300 hidden cursor-pointer items-center justify-start gap-4 rounded-lg px-9 py-4 transition-colors outline-none lg:flex",
    buttonIcon: "size-6 shrink-0",
    buttonText: "text-base leading-normal font-bold",
  },

  variants: {
    isExpanded: {
      true: {
        navbar: "lg:w-70 lg:pr-6",
        buttonText: "lg:block",
      },
      false: {
        navbar: "lg:w-min lg:pr-0",
        buttonText: "lg:hidden",
        buttonIcon: "rotate-180",
      },
    },
  },
})

const { navbar, navItems, logo, button, buttonIcon, buttonText } =
  navbarStyles()

type NavbarContextType = { isExpanded: boolean | undefined }

const NavbarContext = createContext<NavbarContextType>({
  isExpanded: undefined,
})

const navbarVariants: Variants = {
  expanded: {
    width: "17.5rem",
    paddingRight: "1.5rem",
  },
  collapsed: {
    width: "6rem",
    paddingRight: 0,
    transition: { delay: 0.2 },
  },
}

const navItemsVariants: Variants = {
  expanded: { transition: { staggerChildren: 0.025, delayChildren: 0.15 } },
  collapsed: { transition: { staggerChildren: 0.025 } },
}

const buttonTextVariants: Variants = {
  expanded: {
    display: "block",
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, delay: 0.2 },
  },
  collapsed: {
    display: "none",
    opacity: 0,
    y: "-0.8rem",
    transition: { duration: 0.15 },
  },
}

export default function NavbarDesktop({
  initialExpanded,
  className,
}: {
  initialExpanded: boolean
  className?: string
}) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded)

  return (
    <NavbarContext.Provider value={{ isExpanded }}>
      <motion.nav
        className={navbar({ className })}
        variants={navbarVariants}
        initial={false}
        animate={isExpanded ? "expanded" : "collapsed"}
      >
        <div className={logo()}>
          <BrandLogo isExpanded={isExpanded} />
        </div>

        <motion.ul
          className={navItems()}
          variants={navItemsVariants}
          initial={false}
          animate={isExpanded ? "expanded" : "collapsed"}
        >
          <NavItemDesktop
            href="/"
            label="Overview"
            icon={OverviewIcon}
            title="Overview"
          />
          <NavItemDesktop
            href="/transactions"
            label="Transactions"
            icon={TransactionsIcon}
            title="Transactions"
          />
          <NavItemDesktop
            href="/budgets"
            label="Budgets"
            icon={BudgetsIcon}
            title="Budgets"
          />
          <NavItemDesktop
            href="/pots"
            label="Pots"
            icon={PotsIcon}
            title="Pots"
          />
          <NavItemDesktop
            href="/recurring-bills"
            label="Recurring Bills"
            icon={BillsIcon}
            title="Recurring Bills"
          />
        </motion.ul>

        <RacButton
          className={button()}
          onPress={() =>
            setIsExpanded((prev) => {
              const newValue = !prev
              Cookies.set("isExpanded", newValue ? "1" : "0", {
                expires: 30,
              })
              return newValue
            })
          }
          aria-label={isExpanded ? undefined : "Expand Menu"}
        >
          <PiArrowFatLinesLeft className={buttonIcon({ isExpanded })} />
          <motion.span
            className={buttonText({ isExpanded })}
            variants={buttonTextVariants}
            initial={false}
          >
            Minimize Menu
          </motion.span>
        </RacButton>
      </motion.nav>
    </NavbarContext.Provider>
  )
}

const navItemStyles = tv({
  slots: {
    navItem:
      "text-grey-300 hover:text-grey-100 active:text-grey-100 border-grey-900 ring-grey-300 flex items-center transition-colors outline-none focus-visible:ring-3 md:px-5 lg:w-full lg:flex-row lg:justify-start lg:gap-4 lg:rounded-r-lg lg:border-l-4 lg:px-8 lg:py-4",
    navItemText: "text-center leading-normal font-bold lg:text-base",
  },

  variants: {
    isActive: {
      true: {
        navItem:
          "bg-beige-100 text-green border-green hover:text-green active:text-green",
        navItemText: "text-grey-900",
      },
    },
    isExpanded: {
      true: { navItemText: "lg:block" },
      false: { navItemText: "lg:hidden", navItem: "lg:rounded-r-none" },
    },
  },
})

const { navItem, navItemText } = navItemStyles()

const navItemTextVariants: Variants = {
  expanded: {
    display: "block",
    opacity: 1,
    y: 0,
    transition: { duration: 0.15 },
  },
  collapsed: {
    display: "none",
    opacity: 0,
    y: "-0.8rem",
    transition: { duration: 0.15 },
  },
}

function NavItemDesktop({
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
        className={navItem({ isActive, isExpanded })}
        aria-label={label}
      >
        <Icon className="size-6 shrink-0" />
        <motion.span
          className={navItemText({ isActive, isExpanded })}
          initial={false}
          variants={navItemTextVariants}
        >
          {label}
        </motion.span>
      </NextLink>
    </li>
  )
}
