"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { type Key } from "react-aria-components"
import { useDebouncedCallback } from "use-debounce"

import SearchField from "@/components/ui/SearchField"
import { Select, SelectItem } from "@/components/ui/Select"
import { Category } from "@/data-access/lookups"

type TableFiltersProps = { categories: Category[] }

export default function TableFilters({ categories }: TableFiltersProps) {
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
    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-6 md:px-6">
      <SearchField
        label="Search Transactions"
        name="query"
        placeholder="Echo Games Store..."
        defaultValue={readOnlySearchParams.get("query") ?? ""}
        onChange={onSearchChange}
        className="md:max-w-70"
      />
      <div className="flex w-full gap-4 md:flex-row md:justify-end lg:gap-6">
        <Select
          label="Sort by"
          aria-label="Sort by"
          name="sort"
          value={readOnlySearchParams.get("sortby") ?? "latest"}
          onChange={onSortByChange}
          className="w-full md:max-w-40"
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
          value={readOnlySearchParams.get("category") ?? "all"}
          onChange={onCategoryChange}
          items={categoriesWithAll}
          className="w-full md:max-w-60"
        >
          {(category) => (
            <SelectItem id={category.name}>{category.label}</SelectItem>
          )}
        </Select>
      </div>
    </div>
  )
}
