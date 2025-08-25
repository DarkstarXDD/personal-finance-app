"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

import TableDesktop from "@/components/transactions/TableDesktop"
import TableMobile from "@/components/transactions/TableMobile"
import Card from "@/components/ui/Card"
import {
  PaginationPrevious,
  PaginationNext,
  PaginationNumber,
  Pagination,
} from "@/components/ui/Pagination"
import SearchField from "@/components/ui/SearchField"
import { Select, SelectItem } from "@/components/ui/Select"

import type { Category } from "@/data-access/lookups"
import type { Transaction } from "@/data-access/transactions"
import type { Key } from "react-aria-components"

export default function TableWrapper({
  categories,
  transactions,
  totalPages,
}: {
  categories: Category[]
  transactions: Transaction[]
  totalPages: number
}) {
  const path = usePathname()
  const router = useRouter()
  const readOnlySearchParams = useSearchParams()
  const searchParams = new URLSearchParams(readOnlySearchParams)
  const categoriesWithAll = [
    { id: "12345", name: "all", label: "All Transactions" },
    ...categories,
  ]

  const onSearchChange = useDebouncedCallback((query: string) => {
    if (searchParams.get("page") !== null) {
      searchParams.set("page", "1")
    }
    if (query !== "") {
      searchParams.set("query", query)
    } else {
      searchParams.delete("query")
    }
    router.push(`${path}?${searchParams.toString()}`)
  }, 200)

  function onSortByChange(sortOption: Key | null) {
    if (searchParams.get("page") !== null) {
      searchParams.set("page", "1")
    }
    if (typeof sortOption === "string") {
      searchParams.set("sortby", sortOption)
      router.push(`${path}?${searchParams.toString()}`)
    }
  }

  function onCategoryChange(categoryOption: Key | null) {
    if (searchParams.get("page") !== null) {
      searchParams.set("page", "1")
    }
    if (typeof categoryOption === "string") {
      searchParams.set("category", categoryOption)
      router.push(`${path}?${searchParams.toString()}`)
    }
  }

  const currentPage = Number(searchParams.get("page")) || 1

  function createPageURL(pageNumber: number | string) {
    const newSeachParams = new URLSearchParams(searchParams)
    newSeachParams.set("page", pageNumber.toString())
    return `${path}?${newSeachParams.toString()}`
  }

  return (
    <Card className="grid gap-6">
      <div className="flex items-center justify-between gap-6 sm:items-start">
        <SearchField
          placeholder="Search Transactions"
          label="Search Transactions"
          className="max-w-80"
          defaultValue={searchParams.get("query") ?? ""}
          onChange={onSearchChange}
        />
        <div className="flex items-start justify-end gap-6 sm:w-full">
          <Select
            label="Sort by"
            aria-label="Sort by"
            selectedKey={searchParams.get("sortby") ?? "latest"}
            onSelectionChange={onSortByChange}
            shouldHideOnMobile
            className="size-5 max-w-62 sm:w-full sm:min-w-50"
          >
            <SelectItem id="latest">Latest</SelectItem>
            <SelectItem id="oldest">Oldest</SelectItem>
            <SelectItem id="asc">A to Z</SelectItem>
            <SelectItem id="desc">Z to A</SelectItem>
            <SelectItem id="highest">Highest</SelectItem>
            <SelectItem id="lowest">Lowest</SelectItem>
          </Select>

          <Select
            label="Category"
            aria-label="Category"
            selectedKey={searchParams.get("category") ?? "all"}
            onSelectionChange={onCategoryChange}
            shouldHideOnMobile
            className="size-5 max-w-70 sm:w-full sm:min-w-55"
            items={categoriesWithAll}
          >
            {(category) => (
              <SelectItem id={category.name}>{category.label}</SelectItem>
            )}
          </Select>
        </div>
      </div>

      <TableMobile transactions={transactions} />
      <TableDesktop transactions={transactions} />

      <Pagination>
        <PaginationPrevious
          href={createPageURL(currentPage - 1)}
          className="mr-auto"
          isDisabled={currentPage <= 1}
        />
        <PaginationNumber href="/transactions?query=arpico" pageNumber={1} />
        <PaginationNumber href="/" pageNumber={2} isActive={true} />
        <PaginationNumber href="/" pageNumber={3} />
        <PaginationNext
          href={createPageURL(currentPage + 1)}
          className="ml-auto"
          isDisabled={currentPage >= totalPages}
        />
      </Pagination>
    </Card>
  )
}
