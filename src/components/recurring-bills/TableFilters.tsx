"use client"

import SearchField from "@/components/ui/SearchField"
import { Select, SelectItem } from "@/components/ui/Select"

export default function TableFilters() {
  return (
    <div className="flex items-center justify-between gap-6 sm:items-start">
      <SearchField
        placeholder="Search Bills"
        label="Search Recurring Bills"
        className="max-w-80"
        // defaultValue={readOnlySearchParams.get("query") ?? ""}
        // onChange={onSearchChange}
      />
      <div className="flex items-start justify-end gap-6 sm:w-full">
        <Select
          label="Sort by"
          aria-label="Sort by"
          // selectedKey={readOnlySearchParams.get("sortby") ?? "latest"}
          // onSelectionChange={onSortByChange}
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
      </div>
    </div>
  )
}
