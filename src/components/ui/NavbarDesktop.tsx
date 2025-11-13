"use client"

import Cookies from "js-cookie"
import { motion, type Variants } from "motion/react"
import NextLink from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { useState } from "react"
import { type ComponentProps } from "react"
import { Button as RacButton } from "react-aria-components"
import { type IconType } from "react-icons"
import {
  PiArrowFatLinesRight as ButtonIcon,
  PiHouseFill as OverviewIcon,
  PiArrowsDownUpFill as TransactionsIcon,
  PiChartDonutFill as BudgetsIcon,
  PiTipJarFill as PotsIcon,
  PiReceiptFill as BillsIcon,
  PiGearSixFill as SettingsIcon,
} from "react-icons/pi"

import LogoIcon from "@/components/icons/LogoIcon"
import { cn } from "@/lib/utils"

const navbarVariants: Variants = {
  expanded: {
    width: "17.5rem",
  },
  collapsed: {
    width: "5rem",
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

type NavbarDesktopProps = {
  initialExpanded: boolean
  className?: string
}

export default function NavbarDesktop({
  initialExpanded,
  className,
}: NavbarDesktopProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded)

  return (
    <motion.nav
      className={cn(
        "bg-navbar flex max-h-dvh w-full flex-col justify-start gap-10 rounded-r-2xl p-4 pb-6",
        className
      )}
      variants={navbarVariants}
      initial={false}
      animate={isExpanded ? "expanded" : "collapsed"}
    >
      <div className="flex items-center gap-3 py-4 pl-3">
        <LogoIcon className="size-6 text-white" />
        <motion.div
          className="div"
          variants={buttonTextVariants}
          initial={false}
        >
          <p
            className={cn(
              "text-2xl leading-none font-bold text-white",
              className
            )}
          >
            Finance
          </p>
        </motion.div>
      </div>

      <motion.ul
        className="flex grow flex-col items-start justify-start gap-3"
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
        <NavItemDesktop
          href="/settings"
          label="Settings"
          icon={SettingsIcon}
          title="Settings"
        />
      </motion.ul>

      <RacButton
        className="rac-hover:bg-navbar_hover rac-pressed:bg-navbar_hover flex cursor-pointer items-center justify-start gap-3 rounded-md px-3 py-4"
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
        <ButtonIcon
          className={cn(
            "text-fg-quaternary size-6",
            isExpanded && "rotate-180"
          )}
        />

        <motion.span
          className={cn(
            "text-md text-secondary_on-brand hidden font-semibold",
            isExpanded && "blcok"
          )}
          variants={buttonTextVariants}
          initial={false}
        >
          Minimize Menu
        </motion.span>
      </RacButton>
    </motion.nav>
  )
}

// These variants get triggered through staggeredChildre on the parent.
// So no need to use `animate` to tell motion to whcih variant to use.
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

type NavbarItemDesktopProps = Omit<
  ComponentProps<typeof NextLink>,
  "children" | "className"
> & {
  label: string
  icon: IconType
}

function NavItemDesktop({
  label,
  href,
  icon: Icon,
  ...props
}: NavbarItemDesktopProps) {
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
        className={cn(
          "hover:bg-navbar_hover flex items-center justify-start gap-3 rounded-md px-3 py-2.5",
          isActive && "bg-active hover:bg-active"
        )}
        aria-label={label}
      >
        <Icon
          className={cn(
            "text-fg-quaternary size-6",
            isActive && "text-fg-brand-primary"
          )}
        />
        <motion.span
          className={cn(
            "text-secondary_on-brand text-md font-semibold",
            isActive && "text-secondary"
          )}
          initial={false}
          variants={navItemTextVariants}
        >
          {label}
        </motion.span>
      </NextLink>
    </li>
  )
}
