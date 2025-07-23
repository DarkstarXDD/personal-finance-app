import Image from "next/image"

import LogoLarge from "@/components/icons/LogoLarge"
import { publicSans } from "@/lib/fonts"

import brandImage from "../../../public/illustration-authentication.svg"
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

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} font-public-sans bg-beige-100 text-grey-900 grid min-h-dvh grid-rows-[auto_1fr] tracking-normal lg:grid-cols-[auto_1fr] lg:grid-rows-1`}
      >
        <div className="bg-grey-900 grid w-full justify-items-center rounded-b-lg px-10 py-6 lg:hidden">
          <LogoLarge />
        </div>
        <div className="hidden p-5 lg:block">
          <Image
            src={brandImage}
            alt=""
            priority={true}
            className="rounded-xl"
          />
        </div>
        <div className="grid place-content-center px-4 py-6 md:px-10 md:py-8">
          {children}
        </div>
      </body>
    </html>
  )
}
