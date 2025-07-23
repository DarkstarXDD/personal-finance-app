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
        className={`${publicSans.variable} font-public-sans bg-beige-100 text-grey-900 tracking-normal`}
      >
        {children}
      </body>
    </html>
  )
}
