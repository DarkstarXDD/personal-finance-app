"use client"

import NextLink from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { type ComponentProps } from "react"
import { type IconType } from "react-icons"
import {
  PiHouseFill as OverviewIcon,
  PiArrowsDownUpFill as TransactionsIcon,
  PiChartDonutFill as BudgetsIcon,
  PiTipJarFill as PotsIcon,
  PiReceiptFill as BillsIcon,
  PiGearSixFill as SettingsIcon,
} from "react-icons/pi"

import { cn } from "@/lib/utils"

type NavbarMobileProps = { className?: string }

export default function NavbarMobile({ className }: NavbarMobileProps) {
  return (
    <nav className={cn("bg-navbar w-full rounded-t-lg px-4 py-2", className)}>
      <ul className="flex items-center justify-between">
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
          href="/settings"
          label="Settings"
          icon={SettingsIcon}
          title="Settings"
        />
      </ul>
    </nav>
  )
}

type NavItemMobileProps = Omit<
  ComponentProps<typeof NextLink>,
  "children" | "className"
> & {
  label: string
  icon: IconType
}

function NavItemMobile({
  label,
  href,
  icon: Icon,
  ...props
}: NavItemMobileProps) {
  const currentSegment = useSelectedLayoutSegment()

  let segmentNameFromProps: string | null = null

  if (typeof href === "string") {
    segmentNameFromProps = href.split("/").filter(Boolean)[0] || null
  }

  const isActive = currentSegment === segmentNameFromProps

  return (
    <li className="w-full">
      <NextLink
        {...props}
        href={href}
        className={cn(
          "hover:bg-navbar_hover grid justify-items-center gap-1 rounded-md px-2.5 py-2.5 sm:px-3",
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

        <span
          className={cn(
            "text-secondary_on-brand hidden text-xs font-semibold md:block",
            isActive && "text-secondary"
          )}
        >
          {label}
        </span>
      </NextLink>
    </li>
  )
}
