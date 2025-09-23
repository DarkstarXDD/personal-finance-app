"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { PiSortAscendingFill } from "react-icons/pi"
import { useDebouncedCallback } from "use-debounce"

import SearchField from "@/components/ui/SearchField"
import { Select, SelectItem } from "@/components/ui/Select"

import type { Key } from "react-aria-components"

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
    <div className="flex items-center justify-between gap-6 md:items-start">
      <SearchField
        placeholder="Search Bills"
        label="Search Recurring Bills"
        className="max-w-80"
        defaultValue={readOnlySearchParams.get("query") ?? ""}
        onChange={onSearchChange}
      />

      <Select
        label="Sort by"
        aria-label="Sort by"
        selectedKey={readOnlySearchParams.get("sortby") ?? "daysAsc"}
        onSelectionChange={onSortByChange}
        shouldHideOnMobile
        className="max-w-62 md:h-full md:w-full md:min-w-50"
        mobileIcon={PiSortAscendingFill}
      >
        <SelectItem id="daysAsc">Soonest Due</SelectItem>
        <SelectItem id="daysDesc">Latest Due</SelectItem>
        <SelectItem id="latest">Latest</SelectItem>
        <SelectItem id="oldest">Oldest</SelectItem>
        <SelectItem id="asc">A to Z</SelectItem>
        <SelectItem id="desc">Z to A</SelectItem>
        <SelectItem id="highest">Highest</SelectItem>
        <SelectItem id="lowest">Lowest</SelectItem>
      </Select>
    </div>
  )
}
