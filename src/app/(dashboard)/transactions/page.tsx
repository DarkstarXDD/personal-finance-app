import AddTransactionDialog from "@/components/transactions/AddTransactionDialog"
import TableWrapper from "@/components/transactions/TableWrapper"
import Heading from "@/components/ui/Heading"
import { getCategories } from "@/data-access/lookups"
import { getTransactions } from "@/data-access/transactions"

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    sortby: string | undefined
    category: string | undefined
  }>
}) {
  const { sortby, category } = await searchParams

  const categories = await getCategories()
  const transactions = await getTransactions(sortby, category)

  return (
    <main className="grid gap-8">
      <div className="flex items-center justify-between gap-2">
        <Heading as="h1" variant="primary">
          Transactions
        </Heading>
        <AddTransactionDialog categories={categories} />
      </div>
      <TableWrapper categories={categories} transactions={transactions} />
    </main>
  )
}
