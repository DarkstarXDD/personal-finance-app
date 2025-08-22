"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import TableDesktop from "@/components/transactions/TableDesktop"
import TableMobile from "@/components/transactions/TableMobile"
import Card from "@/components/ui/Card"
import { Select, SelectItem } from "@/components/ui/Select"

import type { Category } from "@/data-access/lookups"
import type { Transaction } from "@/data-access/transactions"
import type { Key } from "react-aria-components"

export default function TableWrapper({
  categories,
  transactions,
}: {
  categories: Category[]
  transactions: Transaction[]
}) {
  const path = usePathname()
  const router = useRouter()
  const readOnlySearchParams = useSearchParams()
  const searchParams = new URLSearchParams(readOnlySearchParams)
  const categoriesWithAll = [
    { id: "12345", name: "all", label: "All Transactions" },
    ...categories,
  ]

  function onSortByChange(sortOption: Key | null) {
    if (typeof sortOption === "string") {
      searchParams.set("sortby", sortOption)
      router.push(`${path}?${searchParams.toString()}`)
    }
  }

  function onCategoryChange(categoryOption: Key | null) {
    if (typeof categoryOption === "string") {
      searchParams.set("category", categoryOption)
      router.push(`${path}?${searchParams.toString()}`)
    }
  }

  return (
    <Card className="grid gap-6">
      <div className="flex items-center justify-end gap-6">
        <Select
          label="Sort by"
          layout="horizontal"
          aria-label="Sort by"
          selectedKey={searchParams.get("sortby") ?? "latest"}
          onSelectionChange={onSortByChange}
          shouldHideOnMobile
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
          layout="horizontal"
          aria-label="Category"
          selectedKey={searchParams.get("category") ?? "all"}
          onSelectionChange={onCategoryChange}
          shouldHideOnMobile
          items={categoriesWithAll}
        >
          {(category) => (
            <SelectItem id={category.name}>{category.label}</SelectItem>
          )}
        </Select>
      </div>
      <TableMobile transactions={transactions} />
      <TableDesktop transactions={transactions} />
    </Card>
  )
}
