import AddTransactionDialog from "@/components/transactions/AddTransactionDialog"
import TableWrapper from "@/components/transactions/TableWrapper"
import Heading from "@/components/ui/Heading"
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
  const currentPage = Number(page) || 1

  const categories = await getCategories()
  const { transactions, total } = await getTransactions({
    query,
    sortby,
    category,
    currentPage,
  })

  const totalPages = Math.ceil(total / 5)
  // console.log(total)
  // console.log(totalPages)

  return (
    <main className="grid gap-8">
      <div className="flex items-center justify-between gap-2">
        <Heading as="h1" variant="primary">
          Transactions
        </Heading>
        <AddTransactionDialog categories={categories} />
      </div>
      <TableWrapper
        categories={categories}
        transactions={transactions}
        totalPages={totalPages}
      />
    </main>
  )
}
