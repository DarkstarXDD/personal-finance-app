import { PiArrowsDownUpFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import TableMobile from "@/components/transactions/TableMobile"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import { getTransactions } from "@/data-access/transactions"

export default async function TransactionsOverview() {
  const { transactions } = await getTransactions({ take: 5 })

  return (
    <Card className="grid content-start gap-8 shadow-none">
      <div className="flex justify-between">
        <Heading as="h2" variant="secondary">
          Transactions
        </Heading>
        <Link withIcon href="/transactions">
          View All
        </Link>
      </div>

      {transactions.length > 0 ? (
        <TableMobile transactions={transactions} />
      ) : (
        <EmptyState
          icon={PiArrowsDownUpFill}
          title="No transactions yet"
          description="Your transaction history will appear here once you start making purchases."
        />
      )}
    </Card>
  )
}
