"use client"

import Link from "next/link"
import { ComponentProps } from "react"
import {
  PiCaretLeftFill,
  PiCaretRightFill,
  // PiDotsThreeOutlineFill,
} from "react-icons/pi"
import { tv } from "tailwind-variants"

import { cn } from "@/lib/utils"

const paginationStyles = tv({
  slots: {
    wrapper:
      "border-beige-500 ring-beige-500 text-grey-900 active:bg-beige-100 hover:bg-beige-100 flex items-center justify-center gap-4 rounded-lg border outline-none focus-visible:ring-2",
    icon: "text-grey-500 size-4 shrink-0",
    text: "text-sm leading-normal font-normal",
  },
  variants: {
    size: {
      sm: { wrapper: "size-10" },
      lg: { wrapper: "h-10 w-12 md:w-24.5" },
    },
    isActive: {
      true: {
        wrapper: "bg-grey-900 border-grey-900 hover:bg-grey-900/85 text-white",
      },
    },
  },
  compoundSlots: [
    { slots: ["text"], size: "lg", className: "hidden md:block" },
  ],
})

function Pagination({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      {...props}
      className={cn("flex w-full justify-center gap-2", className)}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  const { wrapper, icon, text } = paginationStyles({ size: "lg" })
  return (
    <li className={className}>
      <Link {...props} className={wrapper()} aria-label="Go to previous page">
        <PiCaretLeftFill className={icon()} />
        <span className={text()}>Prev</span>
      </Link>
    </li>
  )
}

function PaginationNext({ className, ...props }: ComponentProps<typeof Link>) {
  const { wrapper, icon, text } = paginationStyles({ size: "lg" })
  return (
    <li className={className}>
      <Link {...props} className={wrapper()} aria-label="Go to next page">
        <span className={text()}>Next</span>
        <PiCaretRightFill className={icon()} />
      </Link>
    </li>
  )
}

function PaginationNumber({
  pageNumber,
  isActive = false,
  className,
  ...props
}: ComponentProps<typeof Link> & {
  pageNumber: string | number
  isActive?: boolean
}) {
  const { wrapper, text } = paginationStyles({ size: "sm", isActive })
  return (
    <li className={className}>
      <Link {...props} className={wrapper()}>
        <span className={text()}>{pageNumber}</span>
      </Link>
    </li>
  )
}
function PaginationMore() {}

export {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationNumber,
  PaginationMore,
}
