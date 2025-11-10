import { type Metadata } from "next"
import { Suspense } from "react"

import PageHeader from "@/components/common/PageHeader"
import { getCategories } from "@/data-access/lookups"
import AddTransactionDialog from "@/features/transactions/components/AddTransactionDialog"
import TableFilters from "@/features/transactions/components/TableFilters"
import TableLoading from "@/features/transactions/components/TableLoading"
import TransactionTables from "@/features/transactions/components/TransactionTables"
import { getTransactions } from "@/features/transactions/data-access"

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

  const transactionsPromise = getTransactions({
    query,
    sortby,
    category,
    currentPage,
  })

  const categories = await getCategories()

  return (
    <main className="grid content-start items-start gap-8">
      <PageHeader
        title="Transactions"
        description="Review your past activity and add new income or expenses here."
        action={<AddTransactionDialog categories={categories} />}
      />

      <div className="md:border-secondary grid gap-6 md:rounded-xl md:border md:py-6 md:shadow-xs">
        <TableFilters categories={categories} />

        <Suspense fallback={<TableLoading rowCount={10} />}>
          <TransactionTables transactionsPromise={transactionsPromise} />
        </Suspense>
      </div>
    </main>
  )
}
