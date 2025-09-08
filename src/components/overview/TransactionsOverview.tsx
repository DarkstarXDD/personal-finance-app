import { format } from "date-fns"
import { PiArrowsDownUpFill } from "react-icons/pi"

import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import { getTransactions } from "@/data-access/transactions"
import { currencyFormatter } from "@/lib/utils"

export default async function TransactionsOverview() {
  const { transactions } = await getTransactions({ take: 5 })

  return (
    <Card className="grid gap-8 shadow-none 2xl:row-span-2 2xl:row-start-2">
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
                <div className="text-grey-900 flex items-center justify-between gap-2 text-sm leading-normal font-bold">
                  <p>{transaction.counterparty}</p>
                  <p>{currencyFormatter.format(Number(transaction.amount))}</p>
                </div>
                <div className="text-grey-500 flex items-center justify-between gap-2 text-xs leading-normal font-normal">
                  <p>{transaction.category.label}</p>
                  <p>{format(transaction.createdAt, "dd MMM yyyy")}</p>
                </div>
              </li>
            ))}
          </div>
        ) : (
          <TransactionsEmptyState />
        )}
      </div>
    </Card>
  )
}

function TransactionsEmptyState() {
  return (
    <div className="grid justify-items-center gap-3 py-12 text-center">
      <div className="bg-beige-100 flex h-16 w-16 items-center justify-center rounded-full">
        <PiArrowsDownUpFill className="text-grey-500 size-8" />
      </div>
      <Heading as="h3" variant="secondary">
        No transactions yet
      </Heading>
      <p className="text-grey-500 text-sm leading-normal font-normal">
        Your transaction history will appear here once you start making
        purchases.
      </p>
    </div>
  )
}
