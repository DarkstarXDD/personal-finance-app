"use client"

import Link from "next/link"
import { ComponentProps } from "react"
import { PiCaretLeftFill, PiCaretRightFill } from "react-icons/pi"
import { tv } from "tailwind-variants"

import { cn } from "@/lib/utils"

const paginationStyles = tv({
  slots: {
    linkStyles:
      "ring-beige-500 active:bg-beige-100 text-grey-900 hover:bg-beige-100 border-beige-500 flex items-center justify-center gap-4 rounded-lg border outline-none focus-visible:ring-2 active:scale-97",
    iconStyles: "text-grey-500 size-4 shrink-0",
    textStyles: "text-sm leading-normal font-normal",
    ellipsisStyles:
      "text-grey-900 border-beige-500 flex items-center justify-center rounded-lg border text-sm leading-normal font-normal",
  },
  variants: {
    size: {
      sm: {
        linkStyles: "size-8 sm:size-10",
        ellipsisStyles: "size-8 shrink-0 sm:size-10",
      },
      lg: { linkStyles: "size-8 sm:h-10 sm:w-12 md:w-24.5" },
    },
    isActive: {
      true: {
        linkStyles:
          "bg-grey-900 border-grey-900 hover:bg-grey-900/85 active:bg-grey-900/85 text-white",
      },
    },
    isDisabled: { true: { linkStyles: "pointer-events-none opacity-40" } },
  },
  compoundSlots: [
    { slots: ["textStyles"], size: "lg", className: "hidden md:block" },
  ],
})

function Pagination({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      {...props}
      className={cn(
        "flex w-full flex-wrap items-center justify-center gap-2",
        className
      )}
    />
  )
}

function PaginationPrevious({
  className,
  isDisabled,
  ...props
}: ComponentProps<typeof Link> & { isDisabled?: boolean }) {
  const { linkStyles, textStyles, iconStyles } = paginationStyles({
    size: "lg",
    isDisabled,
  })

  if (isDisabled) {
    return (
      <li className={className}>
        <div className={linkStyles()}>
          <PiCaretLeftFill className={iconStyles()} />
          <span className={textStyles()}>Prev</span>
        </div>
      </li>
    )
  }
  return (
    <li className={className}>
      <Link {...props} className={linkStyles()}>
        <PiCaretLeftFill className={iconStyles()} />
        <span className={textStyles()}>Prev</span>
      </Link>
    </li>
  )
}

function PaginationNext({
  className,
  isDisabled,
  ...props
}: ComponentProps<typeof Link> & { isDisabled?: boolean }) {
  const { linkStyles, textStyles, iconStyles } = paginationStyles({
    size: "lg",
    isDisabled,
  })

  if (isDisabled) {
    return (
      <li className={className}>
        <div className={linkStyles()}>
          <span className={textStyles()}>Next</span>
          <PiCaretRightFill className={iconStyles()} />
        </div>
      </li>
    )
  }
  return (
    <li className={className}>
      <Link {...props} className={linkStyles()}>
        <span className={textStyles()}>Next</span>
        <PiCaretRightFill className={iconStyles()} />
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
  const { linkStyles, textStyles } = paginationStyles({
    size: "sm",
    isActive,
  })
  return (
    <li className={className}>
      <Link {...props} className={linkStyles()}>
        <span className={textStyles()}>{pageNumber}</span>
      </Link>
    </li>
  )
}

function PaginationEllipsis({ className, ...props }: ComponentProps<"li">) {
  const { ellipsisStyles } = paginationStyles({ size: "sm" })
  return (
    <li className={ellipsisStyles({ className })} {...props}>
      ...
    </li>
  )
}

export {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationNumber,
  PaginationEllipsis,
}
