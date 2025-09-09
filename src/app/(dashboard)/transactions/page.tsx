import { PiWarningCircleFill } from "react-icons/pi"

import AddTransactionDialog from "@/components/transactions/AddTransactionDialog"
import TableDesktop from "@/components/transactions/TableDesktop"
import TableFilters from "@/components/transactions/TableFilters"
import TableMobile from "@/components/transactions/TableMobile"
import TransactionsEmptyState from "@/components/transactions/TransactionsEmptyState"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Pagination from "@/components/ui/Pagination"
import { getCategories } from "@/data-access/lookups"
import { getTransactions } from "@/data-access/transactions"

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
      <main className="grid gap-8">
        <div className="flex items-center justify-between gap-2">
          <Heading as="h1" variant="primary">
            Transactions
          </Heading>
          <AddTransactionDialog categories={categories} />
        </div>
        <Card>
          <TransactionsEmptyState />
        </Card>
      </main>
    )
  }

  return (
    <main className="grid gap-8">
      <div className="flex items-center justify-between gap-2">
        <Heading as="h1" variant="primary">
          Transactions
        </Heading>
        <AddTransactionDialog categories={categories} />
      </div>

      <Card className="grid gap-6">
        <TableFilters categories={categories} />
        {transactions.length > 0 ? (
          <>
            <TableMobile transactions={transactions} />
            <TableDesktop transactions={transactions} />
          </>
        ) : (
          <div className="flex items-center justify-center gap-2 py-8">
            <PiWarningCircleFill className="text-grey-500 size-5" />
            <p className="text-grey-500 text-center text-sm leading-normal font-normal">
              No results match your filters.
            </p>
          </div>
        )}

        <Pagination totalPages={totalPages} />
      </Card>
    </main>
  )
}
