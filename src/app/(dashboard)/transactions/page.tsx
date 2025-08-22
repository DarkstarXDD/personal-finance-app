import AddTransactionDialog from "@/components/transactions/AddTransactionDialog"
import TableWrapper from "@/components/transactions/TableWrapper"
import Heading from "@/components/ui/Heading"
import { getCategories } from "@/data-access/lookups"
import { getTransactions } from "@/data-access/transactions"

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ sortby: string | undefined }>
}) {
  const { sortby } = await searchParams

  const categories = await getCategories()
  const transactions = await getTransactions(sortby)

  return (
    <main className="grid gap-8">
      <div className="flex items-center justify-between gap-2">
        <Heading as="h1" variant="primary">
          Transactions
        </Heading>
        <AddTransactionDialog categories={categories} />
      </div>
      <TableWrapper transactions={transactions} />
    </main>
  )
}
