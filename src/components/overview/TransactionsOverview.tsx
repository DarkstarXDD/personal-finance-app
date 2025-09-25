import { format } from "date-fns"
import { PiArrowsDownUpFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import TransactionAmount from "@/components/transactions/TransactionAmount"
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

      <div>
        {transactions.length > 0 ? (
          <div>
            {transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="border-b-grey-100 grid gap-1 border-b py-4 first:pt-0 last:border-none last:pb-0"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-grey-900 text-sm leading-normal font-bold">
                    {transaction.counterparty}
                  </p>
                  <TransactionAmount
                    transactionAmount={transaction.amount}
                    transactionType={transaction.transactionType}
                  />
                </div>
                <div className="text-grey-500 flex items-center justify-between gap-2 text-xs leading-normal font-normal">
                  <p>{transaction.category.label}</p>
                  <p>{format(transaction.createdAt, "dd MMM yyyy")}</p>
                </div>
              </li>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={PiArrowsDownUpFill}
            title="No transactions yet"
            description="Your transaction history will appear here once you start making purchases."
          />
        )}
      </div>
    </Card>
  )
}
