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
        className={`${publicSans.variable} font-public-sans bg-beige-100 text-grey-900 grid min-h-dvh grid-rows-[auto_1fr] items-center justify-items-center tracking-normal lg:grid-cols-[auto_1fr] lg:grid-rows-1 lg:items-center`}
      >
        <div className="bg-grey-900 grid w-full justify-items-center rounded-b-lg px-10 py-6 lg:hidden">
          <LogoLarge />
        </div>
        <div className="hidden p-5 lg:block">
          <div className="relative">
            <Image
              src={brandImage}
              alt=""
              priority={true}
              className="w-[35rem] rounded-xl"
            />
            <LogoLarge className="absolute top-10 left-10" />
            <div className="absolute bottom-10 left-10 grid max-w-110 gap-6">
              <p className="text-3xl leading-tight font-bold text-white">
                Keep track of your money and save for your future
              </p>
              <p className="text-sm leading-normal font-normal text-white">
                Personal finance app puts you in control of your spending. Track
                transactions, set budgets, and add to savings pots easily.
              </p>
            </div>
          </div>
        </div>
        <div className="px-4 py-6 md:px-10 md:py-8">{children}</div>
      </body>
    </html>
  )
}
