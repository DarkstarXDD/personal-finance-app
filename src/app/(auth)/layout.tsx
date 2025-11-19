import "@/styles/globals.css"

import { type Metadata } from "next"
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
        className={`${inter.variable} font-body text-tertiary text-md bg-primary grid min-h-dvh items-center leading-normal font-normal tracking-normal antialiased`}
      >
        <div className="w-full px-4 py-6 md:px-10 md:py-8">{children}</div>
      </body>
    </html>
  )
}
