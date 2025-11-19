import "@/styles/globals.css"

import { type Metadata } from "next"
import { cookies } from "next/headers"
import { type ReactNode } from "react"

import NavbarDesktop from "@/components/ui/NavbarDesktop"
import NavbarMobile from "@/components/ui/NavbarMobile"
import { inter } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "Personal Finance App",
  description:
    "A finance management app with transaction tracking, budget management, savings goals, and recurring bill monitoring.",

  authors: {
    name: "Darkstar",
    url: "https://github.com/DarkstarXDD",
  },

  openGraph: {
    type: "website",
    url: "https://personal-finance-darkstar.vercel.app/",
    title: "Personal Finance App",

    description:
      "A finance management app with transaction tracking, budget management, savings goals, and recurring bill monitoring.",
  },
}

type DashboardLayoutProps = Readonly<{ children: ReactNode }>

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const cookieStore = await cookies()
  const isExpanded = cookieStore.get("isExpanded")?.value

  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-body bg-primary text-tertiary text-md grid min-h-dvh grid-rows-[1fr_auto] leading-normal font-normal tracking-normal antialiased [grid-template-areas:'main'_'navbar'] lg:grid-cols-[auto_1fr] lg:grid-rows-1 lg:[grid-template-areas:'navbar_main']`}
      >
        <NavbarDesktop
          initialExpanded={isExpanded === "0" ? false : true}
          className="sticky bottom-0 hidden [grid-area:navbar] lg:top-0 lg:flex"
        />

        <div className="px-4 py-6 md:px-10 md:py-8">{children}</div>

        <NavbarMobile className="sticky bottom-0 [grid-area:navbar] lg:hidden" />
      </body>
    </html>
  )
}
