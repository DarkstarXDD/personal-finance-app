import { type Metadata } from "next"
import { Suspense } from "react"

import PageHeader from "@/components/common/PageHeader"
import RecurringBillsTables from "@/features/recurring-bills/components/RecurringBillsTables"
import Summary from "@/features/recurring-bills/components/Summary"
import SummaryLoading from "@/features/recurring-bills/components/SummaryLoading"
import TableFilters from "@/features/recurring-bills/components/TableFilters"
import { getRecurringBills } from "@/features/recurring-bills/data-access"
import TableLoading from "@/features/transactions/components/TableLoading"

export const metadata: Metadata = {
  title: "Recurring Bills - Personal Finance",
}

export default async function RecurringBillsPage({
  searchParams,
}: {
  searchParams: Promise<{
    query: string | undefined
    sortby: string | undefined
  }>
}) {
  const { query, sortby } = await searchParams

  const recurringBillsPromise = getRecurringBills({ query, sortby })

  return (
    <main className="grid gap-8">
      <PageHeader
        title="Recurring Bills"
        description="Keep track of your active bills and see what’s coming up next."
      />

      <div className="grid gap-6 xl:grid-cols-[16.5rem_1fr] xl:items-start">
        <Suspense fallback={<SummaryLoading />}>
          <Summary {...{ recurringBillsPromise }} />
        </Suspense>

        <div className="md:border-secondary @container grid gap-6 md:rounded-xl md:border md:py-6 md:shadow-xs">
          <TableFilters />

          <Suspense fallback={<TableLoading rowCount={5} />}>
            <RecurringBillsTables {...{ recurringBillsPromise }} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
