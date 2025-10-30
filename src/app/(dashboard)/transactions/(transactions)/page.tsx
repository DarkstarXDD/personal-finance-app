import { PiArrowsDownUpFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import FilteredEmptyState from "@/components/empty-states/FilteredEmptyState"
import AddTransactionDialog from "@/components/transactions/AddTransactionDialog"
import TableDesktop from "@/components/transactions/TableDesktop"
import TableFilters from "@/components/transactions/TableFilters"
import TableMobile from "@/components/transactions/TableMobile"
import Card from "@/components/ui/Card"
import Pagination from "@/components/ui/Pagination"
import { getCategories } from "@/data-access/lookups"
import { getTransactions } from "@/data-access/transactions"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Transactions - Personal Finance",
}

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    query: string | undefined
    sortby: string | undefined
    category: string | undefined
    page: string | undefined
  }>
}) {
  const { query, sortby, category, page } = await searchParams
  const currentPage = Math.abs(Number(page) || 1)

  const categories = await getCategories()
  const {
    transactions,
    pagination: { totalPages },
    totalItemsWithoutFiltering,
  } = await getTransactions({
    query,
    sortby,
    category,
    currentPage,
  })

  if (totalItemsWithoutFiltering === 0) {
    return (
      <main className="grid content-start items-start gap-8">
        <div className="grid w-full grid-cols-1 items-start justify-items-start gap-4 md:grid-cols-[1fr_auto]">
          <div className="grid gap-1">
            <h1 className="text-primary text-3xl leading-tight font-semibold tracking-tight">
              Transactions
            </h1>
            <p>
              Review your past activity and add new income or expenses here.
            </p>
          </div>
          <AddTransactionDialog categories={categories} />
        </div>

        <Card>
          <EmptyState
            icon={PiArrowsDownUpFill}
            title="No transactions yet"
            description="Your transaction history will appear here once you start making
        purchases."
          />
        </Card>
      </main>
    )
  }

  return (
    <main className="grid content-start items-start gap-8">
      <div className="grid w-full grid-cols-1 items-start justify-items-start gap-4 md:grid-cols-[1fr_auto]">
        <div className="grid gap-1">
          <h1 className="text-primary text-3xl leading-tight font-semibold tracking-tight">
            Transactions
          </h1>
          <p>Review your past activity and add new income or expenses here.</p>
        </div>
        <AddTransactionDialog categories={categories} />
      </div>

      <div className="md:border-secondary grid gap-6 md:rounded-xl md:border md:py-6">
        <TableFilters categories={categories} />

        {transactions.length > 0 ? (
          <>
            <TableMobile transactions={transactions} className="md:hidden" />
            <TableDesktop
              transactions={transactions}
              className="hidden md:block"
            />
          </>
        ) : (
          <FilteredEmptyState />
        )}

        <Pagination totalPages={totalPages} className="md:px-6" />
      </div>
    </main>
  )
}
