import { format } from "date-fns"

import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import { getTransactions } from "@/data-access/transactions"
import { currencyFormatter } from "@/lib/utils"

export default async function TransactionsOverview() {
  const { transactions } = await getTransactions({ take: 5 })

  return (
    <Card padding="lg" className="grid gap-8 shadow-none">
      <div className="flex justify-between">
        <Heading as="h2" variant="secondary">
          Transactions
        </Heading>
        <Link withIcon href="/transactions">
          View All
        </Link>
      </div>

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
    </Card>
  )
}
