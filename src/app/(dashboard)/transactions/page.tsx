import AddTransactionDialog from "@/components/transactions/AddTransactionDialog"
import TableDesktop from "@/components/transactions/TableDesktop"
import TableMobile from "@/components/transactions/TableMobile"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import { getCategories } from "@/data-access/lookups"
import { getTransactions } from "@/data-access/transactions"

export default async function TransactionsPage() {
  const categories = await getCategories()
  const transactions = await getTransactions()

  console.log(transactions)

  return (
    <main className="grid gap-8">
      <div className="flex items-center justify-between gap-2">
        <Heading as="h1" variant="primary">
          Transactions
        </Heading>
        <AddTransactionDialog categories={categories} />
      </div>
      <Card>
        <TableMobile transactions={transactions} />
        <TableDesktop transactions={transactions} />
      </Card>
    </main>
  )
}
