import TableLoading from "@/components/overview/loading-states/TableLoading"
import { TransactionItemLoading } from "@/components/overview/loading-states/TransactionsOverviewLoading"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Skeleton from "@/components/ui/Skeleton"

export default function Loading() {
  return (
    <main className="grid gap-8">
      <div className="flex items-center justify-between gap-2">
        <Heading as="h1" variant="primary">
          Transactions
        </Heading>
        <Skeleton theme="dark" className="h-13 w-38" />
      </div>

      <Card className="grid gap-6">
        <div className="flex w-full items-center justify-between gap-6 md:items-start">
          <div className="grid w-full max-w-80 gap-1">
            <Skeleton className="h-4.5 w-30" />
            <Skeleton className="h-12 w-full" />
          </div>

          <div className="flex w-full items-start justify-end gap-6">
            <Skeleton className="h-8 w-8 md:hidden" />
            <div className="hidden w-full max-w-62 gap-1 md:grid">
              <Skeleton className="h-4.5 w-30" />
              <Skeleton className="h-12 w-full" />
            </div>

            <Skeleton className="h-8 w-8 md:hidden" />
            <div className="hidden w-full max-w-70 gap-1 md:grid">
              <Skeleton className="h-4.5 w-30" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>

        <ul className="md:hidden">
          <TransactionItemLoading />
          <TransactionItemLoading />
          <TransactionItemLoading />
          <TransactionItemLoading />
          <TransactionItemLoading />
          <TransactionItemLoading />
          <TransactionItemLoading />
          <TransactionItemLoading />
        </ul>
        <TableLoading
          rowCount={8}
          columnCount={4}
          className="hidden md:block"
        />

        <div className="flex justify-between">
          <Skeleton className="h-8 w-8 sm:h-10 sm:w-16 md:h-10 md:w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 sm:h-10 sm:w-10" />
            <Skeleton className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>
          <Skeleton className="h-8 w-8 sm:h-10 sm:w-16 md:h-10 md:w-24" />
        </div>
      </Card>
    </main>
  )
}
