import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import Skeleton from "@/components/ui/Skeleton"

export default function TransactionsOverviewLoading() {
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

      <ul>
        <TransactionItemLoading />
        <TransactionItemLoading />
        <TransactionItemLoading />
        <TransactionItemLoading />
        <TransactionItemLoading />
      </ul>
    </Card>
  )
}

function TransactionItemLoading() {
  return (
    <li className="border-b-grey-100 grid gap-1 border-b py-4 first:pt-0 last:border-none last:pb-0">
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-5 w-30" />
        <Skeleton className="h-5 w-14" />
      </div>
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-4.5 w-20" />
        <Skeleton className="h-4.5 w-17" />
      </div>
    </li>
  )
}
