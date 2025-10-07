"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { PiSortAscendingFill, PiFunnelFill } from "react-icons/pi"
import { useDebouncedCallback } from "use-debounce"

import SearchField from "@/components/ui/SearchField"
import { Select, SelectItem } from "@/components/ui/Select"
import { Category } from "@/data-access/lookups"

import type { Key } from "react-aria-components"

export default function TableFilters({
  categories,
}: {
  categories: Category[]
}) {
  const path = usePathname()
  const router = useRouter()
  const readOnlySearchParams = useSearchParams()
  const categoriesWithAll = [
    { id: "12345", name: "all", label: "All Transactions" },
    ...categories,
  ]

  function updateSearchParams(name: string, value: string) {
    const searchParams = new URLSearchParams(readOnlySearchParams)

    if (searchParams.get("page") !== null) {
      searchParams.set("page", "1")
    }

    if (value == "") {
      searchParams.delete(name)
    } else {
      searchParams.set(name, value)
    }

    router.push(`${path}?${searchParams.toString()}`)
  }

  const onSearchChange = useDebouncedCallback((query: string) => {
    updateSearchParams("query", query)
  }, 200)

  function onSortByChange(sortOption: Key | null) {
    if (typeof sortOption !== "string") return
    updateSearchParams("sortby", sortOption)
  }

  function onCategoryChange(categoryOption: Key | null) {
    if (typeof categoryOption !== "string") return
    updateSearchParams("category", categoryOption)
  }

  return (
    <div className="flex items-center justify-between gap-6 md:items-start">
      <SearchField
        placeholder="Pet Food..."
        label="Search Transactions"
        className="max-w-80"
        defaultValue={readOnlySearchParams.get("query") ?? ""}
        onChange={onSearchChange}
      />
      <div className="flex items-start justify-end gap-6 md:w-full">
        <Select
          label="Sort by"
          aria-label="Sort by"
          name="sort"
          selectedKey={readOnlySearchParams.get("sortby") ?? "latest"}
          onSelectionChange={onSortByChange}
          shouldHideOnMobile
          className="max-w-62 md:h-full md:w-full md:min-w-50"
          mobileIcon={PiSortAscendingFill}
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
          name="filter"
          selectedKey={readOnlySearchParams.get("category") ?? "all"}
          onSelectionChange={onCategoryChange}
          shouldHideOnMobile
          className="max-w-70 md:h-full md:w-full md:min-w-55"
          items={categoriesWithAll}
          mobileIcon={PiFunnelFill}
        >
          {(category) => (
            <SelectItem id={category.name}>{category.label}</SelectItem>
          )}
        </Select>
      </div>
    </div>
  )
}
