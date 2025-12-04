import "@/styles/globals.css"

import { type Metadata } from "next"
import Image from "next/image"
import { type ReactNode } from "react"

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

type AuthLayoutProps = Readonly<{ children: ReactNode }>

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-body text-tertiary text-md bg-primary grid min-h-dvh items-center leading-normal font-normal tracking-normal antialiased lg:grid-cols-2`}
      >
        <div className="w-full px-4 py-6 md:px-10 md:py-8">{children}</div>

        <aside className="hidden h-full lg:block">
          <Image
            src="/pfa-routes-mockup.webp"
            alt="Mockup showcasing the sites various UI pieces including data tables and data cards."
            width="1920"
            height="1440"
            className="h-full object-cover"
            loading="eager"
          />
        </aside>
      </body>
    </html>
  )
}
