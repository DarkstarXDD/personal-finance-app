"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ComponentProps } from "react"
import { PiCaretLeftFill, PiCaretRightFill } from "react-icons/pi"
import { tv } from "tailwind-variants"

import {
  generatePaginationMobile,
  generatePaginationDesktop,
} from "@/lib/utils"

const paginationStyles = tv({
  slots: {
    iconStyles: "text-grey-500 size-4 shrink-0",
    textStyles: "text-grey-900 text-sm leading-normal font-normal",
    linkStyles:
      "ring-beige-500 active:bg-beige-100 hover:bg-beige-100 border-beige-500 flex shrink-0 items-center justify-center gap-4 rounded-lg border outline-none focus-visible:ring-2 active:scale-97",
    ulStyles: "flex w-full flex-wrap items-center justify-center gap-2",
  },
  variants: {
    isDisabled: { true: { linkStyles: "pointer-events-none opacity-40" } },
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
  },
  compoundSlots: [
    { slots: ["textStyles"], size: "lg", className: "hidden md:block" },
  ],
})

export default function Pagination({ totalPages }: { totalPages: number }) {
  const readOnlySearchParams = useSearchParams()
  const path = usePathname()

  function createPageURL(pageNumber: number | string) {
    const newSeachParams = new URLSearchParams(readOnlySearchParams)
    newSeachParams.set("page", pageNumber.toString())
    return `${path}?${newSeachParams.toString()}`
  }

  const currentPage = Math.abs(Number(readOnlySearchParams.get("page")) || 1)

  const desktopPages = generatePaginationDesktop(currentPage, totalPages)
  const mobilePages = generatePaginationMobile(currentPage, totalPages)

  const { ulStyles } = paginationStyles()

  return (
    <nav aria-label="Pagination">
      {/* Mobile Pagination */}
      <ul className={ulStyles({ className: "sm:hidden" })}>
        <PaginationPrevious
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1 || currentPage > totalPages + 1}
        />
        {mobilePages.map((page, id) =>
          page === "ellipsis" ? (
            <PaginationEllipsis key={`ellipsis-mobile-${id}`} />
          ) : (
            <PaginationNumber
              key={`page-mobile-${page}`}
              href={createPageURL(page)}
              pageNumber={page}
              isActive={page === currentPage}
              aria-current={page === currentPage ? "page" : false}
            />
          )
        )}
        <PaginationNext
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </ul>

      {/* Desktop Pagination */}
      <ul className={ulStyles({ className: "hidden sm:flex" })}>
        <PaginationPrevious
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1 || currentPage > totalPages + 1}
        />
        {desktopPages.map((page, id) =>
          page === "ellipsis" ? (
            <PaginationEllipsis key={`ellipsis-${id}`} />
          ) : (
            <PaginationNumber
              key={`page-${page}`}
              href={createPageURL(page)}
              pageNumber={page}
              isActive={page === currentPage}
              aria-current={page === currentPage ? "page" : false}
            />
          )
        )}
        <PaginationNext
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </ul>
    </nav>
  )
}

// ============================================
// ============= Pagination Previous ==========
// ============================================

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
      <li className="mr-auto">
        <div className={linkStyles()}>
          <PiCaretLeftFill className={iconStyles()} />
          <span className={textStyles()}>Prev</span>
        </div>
      </li>
    )
  }
  return (
    <li className="mr-auto">
      <Link {...props} className={linkStyles()} aria-label="Previous Page">
        <PiCaretLeftFill className={iconStyles()} />
        <span className={textStyles()}>Prev</span>
      </Link>
    </li>
  )
}

// ============================================
// =============== Pagination Next ============
// ============================================

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
      <li className="ml-auto">
        <div className={linkStyles()}>
          <span className={textStyles()}>Next</span>
          <PiCaretRightFill className={iconStyles()} />
        </div>
      </li>
    )
  }
  return (
    <li className="ml-auto">
      <Link {...props} className={linkStyles()} aria-label="Next Page">
        <span className={textStyles()}>Next</span>
        <PiCaretRightFill className={iconStyles()} />
      </Link>
    </li>
  )
}

// ============================================
// ============== Pagination Number ===========
// ============================================

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
    <li>
      <Link {...props} className={linkStyles()}>
        <span className={textStyles()}>{pageNumber}</span>
      </Link>
    </li>
  )
}

// ============================================
// ============= Pagination Ellipsis ==========
// ============================================

function PaginationEllipsis() {
  const { textStyles } = paginationStyles({ size: "sm" })
  return (
    <li>
      <span className={textStyles()}>...</span>
    </li>
  )
}
