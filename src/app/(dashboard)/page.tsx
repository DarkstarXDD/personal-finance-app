"use client"

import {
  PiHouseFill,
  PiArrowsDownUpFill,
  PiChartDonutFill,
  PiTipJarFill,
  PiReceiptFill,
} from "react-icons/pi"

import { Navbar, NavbarItem } from "@/components/ui/Navbar"

export default function Home() {
  return (
    <main className="grid gap-10">
      <Navbar>
        <NavbarItem
          href="/"
          label="Overview"
          icon={PiHouseFill}
          TEMP_CURRENT={true}
        />
        <NavbarItem href="/" label="Transactions" icon={PiArrowsDownUpFill} />
        <NavbarItem href="/" label="Budgets" icon={PiChartDonutFill} />
        <NavbarItem href="/" label="Pots" icon={PiTipJarFill} />
        <NavbarItem href="/" label="Recurring Bills" icon={PiReceiptFill} />
      </Navbar>
    </main>
  )
}
