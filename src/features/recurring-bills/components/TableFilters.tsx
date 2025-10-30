"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { type Key } from "react-aria-components"
import { useDebouncedCallback } from "use-debounce"

import SearchField from "@/components/ui/SearchField"
import { Select, SelectItem } from "@/components/ui/Select"

export default function TableFilters() {
  const path = usePathname()
  const router = useRouter()
  const readOnlySearchParams = useSearchParams()

  function updateSearchParams(name: string, value: string) {
    const searchParams = new URLSearchParams(readOnlySearchParams)

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

  return (
    <div className="flex flex-col gap-4 md:px-6 @xl:flex-row @xl:justify-between @xl:gap-6">
      <SearchField
        label="Search Recurring Bills"
        name="query"
        placeholder="Spotify..."
        defaultValue={readOnlySearchParams.get("query") ?? ""}
        onChange={onSearchChange}
        className="md:max-w-70"
      />

      <Select
        label="Sort by"
        name="sort"
        value={readOnlySearchParams.get("sortby") ?? "daysAsc"}
        onChange={onSortByChange}
        className="w-full md:max-w-50"
      >
        <SelectItem id="daysAsc">Soonest Due</SelectItem>
        <SelectItem id="daysDesc">Latest Due</SelectItem>
        <SelectItem id="highest">Highest</SelectItem>
        <SelectItem id="lowest">Lowest</SelectItem>
        <SelectItem id="asc">A to Z</SelectItem>
        <SelectItem id="desc">Z to A</SelectItem>
        <SelectItem id="latest">Latest</SelectItem>
        <SelectItem id="oldest">Oldest</SelectItem>
      </Select>
    </div>
  )
}
