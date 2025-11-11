import FilteredEmptyState from "@/components/empty-states/FilteredEmptyState"
import Pagination from "@/components/ui/Pagination"
import TableDesktop from "@/features/transactions/components/TableDesktop"
import TableMobile from "@/features/transactions/components/TableMobile"
import TransactionsEmptyState from "@/features/transactions/components/TransactionsEmptyState"
import { GetTransactionsReturn } from "@/features/transactions/data-access"

type TransactionsTableProps = {
  transactionsPromise: GetTransactionsReturn
}

export default async function TransactionTables({
  transactionsPromise,
}: TransactionsTableProps) {
  const {
    transactions,
    pagination: { totalPages },
    totalItemsWithoutFiltering,
  } = await transactionsPromise

  if (totalItemsWithoutFiltering === 0) return <TransactionsEmptyState />

  return (
    <>
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
    </>
  )
}
