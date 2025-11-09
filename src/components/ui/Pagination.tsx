"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ComponentProps } from "react"
import { PiCaretLeftFill, PiCaretRightFill } from "react-icons/pi"
import { tv } from "tailwind-variants"

import {
  generatePaginationMobile,
  generatePaginationDesktop,
} from "@/lib/helpers/pagination"
import { cn } from "@/lib/utils"

const paginationStyles = tv({
  slots: {
    linkStyles:
      "ring-brand active:bg-primary_hover hover:bg-primary_hover bg-primary border-primary focus-visible:border-brand flex shrink-0 items-center justify-center gap-1.5 rounded-lg border outline-none focus-visible:ring active:scale-97",
  },

  variants: {
    isDisabled: { true: { linkStyles: "pointer-events-none" } },
    size: {
      sm: { linkStyles: "size-8 sm:size-10" },
      lg: { linkStyles: "size-8 sm:h-10 sm:w-12 md:w-24.5" },
    },
    isActive: {
      true: {
        linkStyles: "bg-brand-solid hover:bg-brand-solid active:bg-brand-solid",
      },
    },
  },
})

export default function Pagination({
  totalPages,
  className,
}: {
  totalPages: number
  className?: string
}) {
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

  return (
    <nav aria-label="Pagination" className={className}>
      {/* Mobile Pagination */}
      <ul className="flex w-full flex-wrap items-center justify-center gap-2 sm:hidden">
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
      <ul className="hidden w-full flex-wrap items-center justify-center gap-2 sm:flex">
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

type PaginationPreviousProps = ComponentProps<typeof Link> & {
  isDisabled?: boolean
}

function PaginationPrevious({ isDisabled, ...props }: PaginationPreviousProps) {
  const { linkStyles } = paginationStyles({
    size: "lg",
    isDisabled,
  })

  if (isDisabled) {
    return (
      <li className="mr-auto">
        <div className={linkStyles()}>
          <PiCaretLeftFill className="text-fg-disabled_subtle size-4" />
          <span className="text-fg-disabled hidden text-sm font-semibold md:block">
            Prev
          </span>
        </div>
      </li>
    )
  }
  return (
    <li className="mr-auto">
      <Link {...props} className={linkStyles()} aria-label="Previous Page">
        <PiCaretLeftFill className="text-fg-quaternary size-4" />
        <span className="text-secondary hidden text-sm font-semibold md:block">
          Prev
        </span>
      </Link>
    </li>
  )
}

// ============================================
// =============== Pagination Next ============
// ============================================

type PaginationNextProps = ComponentProps<typeof Link> & {
  isDisabled?: boolean
}

function PaginationNext({ isDisabled, ...props }: PaginationNextProps) {
  const { linkStyles } = paginationStyles({
    size: "lg",
    isDisabled,
  })

  if (isDisabled) {
    return (
      <li className="ml-auto">
        <div className={linkStyles()}>
          <span className="text-fg-disabled hidden text-sm font-semibold md:block">
            Next
          </span>
          <PiCaretRightFill className="text-fg-disabled_subtle size-4" />
        </div>
      </li>
    )
  }
  return (
    <li className="ml-auto">
      <Link {...props} className={linkStyles()} aria-label="Next Page">
        <span className="text-secondary hidden text-sm font-semibold md:block">
          Next
        </span>
        <PiCaretRightFill className="text-fg-quaternary size-4" />
      </Link>
    </li>
  )
}

// ============================================
// ============== Pagination Number ===========
// ============================================

type PaginationNumberProps = ComponentProps<typeof Link> & {
  pageNumber: string | number
  isActive?: boolean
}

function PaginationNumber({
  pageNumber,
  isActive = false,
  ...props
}: PaginationNumberProps) {
  const { linkStyles } = paginationStyles({
    size: "sm",
    isActive,
  })
  return (
    <li>
      <Link {...props} className={linkStyles()}>
        <span
          className={cn(
            "text-quaternary text-sm font-medium",
            isActive && "text-white"
          )}
        >
          {pageNumber}
        </span>
      </Link>
    </li>
  )
}

// ============================================
// ============= Pagination Ellipsis ==========
// ============================================

function PaginationEllipsis() {
  return (
    <li>
      <span className="text-quaternary">...</span>
    </li>
  )
}
