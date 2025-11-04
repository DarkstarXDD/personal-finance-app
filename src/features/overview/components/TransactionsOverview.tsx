import { Suspense } from "react"
import { PiArrowsDownUpFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import Card from "@/components/ui/Card"
import Link from "@/components/ui/Link"
import TableDesktop from "@/features/transactions/components/TableDesktop"
import TableLoading from "@/features/transactions/components/TableLoading"
import TableMobile from "@/features/transactions/components/TableMobile"
import { getTransactions } from "@/features/transactions/data-access"

export default function TransactionsOverview() {
  return (
    <Card size="md" className="grid content-start gap-6 md:px-0">
      <div className="flex justify-between md:px-6">
        <h2 className="text-primary text-xl leading-tight font-semibold">
          Transactions
        </h2>

        <Link withIcon href="/transactions">
          View All
        </Link>
      </div>

      <Suspense fallback={<TableLoading rowCount={5} />}>
        <Transactions />
      </Suspense>
    </Card>
  )
}

async function Transactions() {
  const { transactions } = await getTransactions({ take: 5 })

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
        <EmptyState
          icon={PiArrowsDownUpFill}
          title="No transactions yet"
          description="Your transaction history will appear here once you start making purchases."
        />
      )}
    </>
  )
}
