"use client"

import Link from "next/link"
import { ComponentProps } from "react"
import { PiCaretLeftFill, PiCaretRightFill } from "react-icons/pi"
import { tv } from "tailwind-variants"

const paginationStyles = tv({
  slots: {
    iconStyles: "text-grey-500 size-4 shrink-0",
    textStyles: "text-grey-900 text-sm leading-normal font-normal",
    linkStyles:
      "ring-beige-500 active:bg-beige-100 hover:bg-beige-100 border-beige-500 flex shrink-0 items-center justify-center gap-4 rounded-lg border outline-none focus-visible:ring-2 active:scale-97",
  },
  variants: {
    size: {
      sm: { linkStyles: "size-8 sm:size-10" },
      lg: { linkStyles: "size-8 sm:h-10 sm:w-12 md:w-24.5" },
    },
    isActive: {
      true: {
        textStyles: "text-white",
        linkStyles:
          "bg-grey-900 border-grey-900 hover:bg-grey-900/85 active:bg-grey-900/85",
      },
    },
    isDisabled: { true: { linkStyles: "pointer-events-none opacity-40" } },
  },
  compoundSlots: [
    { slots: ["textStyles"], size: "lg", className: "hidden md:block" },
  ],
})

function Pagination({ ...props }: ComponentProps<"ul">) {
  return (
    <nav aria-label="Pagination">
      <ul
        {...props}
        className="grid w-full items-center justify-center gap-2 sm:flex sm:flex-wrap"
      />
    </nav>
  )
}

function PaginationPrevious({
  isDisabled,
  ...props
}: ComponentProps<typeof Link> & { isDisabled?: boolean }) {
  const { linkStyles, textStyles, iconStyles } = paginationStyles({
    size: "lg",
    isDisabled,
  })

  if (isDisabled) {
    return (
      <li className="col-start-1 row-start-1 mr-auto">
        <div className={linkStyles()}>
          <PiCaretLeftFill className={iconStyles()} />
          <span className={textStyles()}>Prev</span>
        </div>
      </li>
    )
  }
  return (
    <li className="col-start-1 row-start-1 mr-auto">
      <Link {...props} className={linkStyles()}>
        <PiCaretLeftFill className={iconStyles()} />
        <span className={textStyles()}>Prev</span>
      </Link>
    </li>
  )
}

function PaginationNext({
  isDisabled,
  ...props
}: ComponentProps<typeof Link> & { isDisabled?: boolean }) {
  const { linkStyles, textStyles, iconStyles } = paginationStyles({
    size: "lg",
    isDisabled,
  })

  if (isDisabled) {
    return (
      <li className="col-start-2 row-start-1 ml-auto">
        <div className={linkStyles()}>
          <span className={textStyles()}>Next</span>
          <PiCaretRightFill className={iconStyles()} />
        </div>
      </li>
    )
  }
  return (
    <li className="col-start-2 row-start-1 ml-auto">
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
    <li className="row-start-2">
      <Link {...props} className={linkStyles()}>
        <span className={textStyles()}>{pageNumber}</span>
      </Link>
    </li>
  )
}

function PaginationEllipsis() {
  const { textStyles } = paginationStyles({ size: "sm" })
  return (
    <li className="row-start-2">
      <span className={textStyles()}>...</span>
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
