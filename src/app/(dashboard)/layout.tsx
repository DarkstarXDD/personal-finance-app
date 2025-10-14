import { cookies } from "next/headers"

import NavbarDesktop from "@/components/ui/NavbarDesktop"
import NavbarMobile from "@/components/ui/NavbarMobile"
import { publicSans } from "@/lib/fonts"

import "../globals.css"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Personal Finance App",
  description:
    "Check out Darkstar's solution for the Personal Finance App challenge on Frontend Mentor",

  authors: {
    name: "Darkstar",
    url: "https://github.com/DarkstarXDD",
  },

  openGraph: {
    type: "website",
    url: "https://personal-finance-darkstar.vercel.app/",
    title: "Personal Finance App",

    description:
      "Check out Darkstar's solution for the Personal Finance App challenge on Frontend Mentor",

    images: {
      url: "https://personal-finance-darkstar.vercel.app/og-img.jpeg",
      type: "image/jpeg",
      width: 1200,
      height: 630,
    },
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const isExpanded = cookieStore.get("isExpanded")?.value

  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} font-public-sans bg-beige-100 text-grey-900 grid min-h-dvh grid-rows-[1fr_auto] leading-normal tracking-normal [grid-template-areas:'main'_'navbar'] lg:grid-cols-[auto_1fr] lg:grid-rows-1 lg:[grid-template-areas:'navbar_main']`}
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
