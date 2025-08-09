import { Navbar } from "@/components/ui/Navbar"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} font-public-sans bg-beige-100 text-grey-900 min-h-dvh tracking-normal lg:grid lg:grid-cols-[auto_1fr]`}
      >
        <Navbar className="fixed bottom-0 lg:static" />
        <div className="px-4 py-6 pb-16.5 md:px-10 md:py-8 md:pb-26.5 lg:pb-8">
          {children}
        </div>
      </body>
    </html>
  )
}
