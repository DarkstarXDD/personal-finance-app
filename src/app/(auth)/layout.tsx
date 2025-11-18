import "@/styles/globals.css"

import { type Metadata } from "next"
import { type ReactNode } from "react"

import { inter } from "@/lib/fonts"

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
