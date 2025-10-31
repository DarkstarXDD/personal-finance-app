import { type Metadata } from "next"
import { PiReceiptFill } from "react-icons/pi"

import PageHeader from "@/components/common/PageHeader"
import EmptyState from "@/components/empty-states/EmptyState"
import FilteredEmptyState from "@/components/empty-states/FilteredEmptyState"
import Card from "@/components/ui/Card"
import Summary from "@/features/recurring-bills/components/Summary"
import TableDesktop from "@/features/recurring-bills/components/TableDesktop"
import TableFilters from "@/features/recurring-bills/components/TableFilters"
import TableMobile from "@/features/recurring-bills/components/TableMobile"
import { getRecurringBills } from "@/features/recurring-bills/data-access"

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

  const { recurringBills, summary } = await getRecurringBills({ query, sortby })

  if (summary.billCount === 0) {
    return (
      <main className="grid gap-8">
        <PageHeader
          title="Recurring Bills"
          description="Keep track of your active bills and see what’s coming up next."
        />

        <div className="grid gap-6 xl:grid-cols-[20rem_1fr] xl:items-start">
          <Summary summary={summary} />
          <Card>
            <EmptyState
              icon={PiReceiptFill}
              title="You don’t have any recurring bills yet"
              description="They’ll appear here once you have some."
            />
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="grid gap-8">
      <PageHeader
        title="Recurring Bills"
        description="Keep track of your active bills and see what’s coming up next."
      />

      <div className="grid gap-6 xl:grid-cols-[16.5rem_1fr] xl:items-start">
        <Summary summary={summary} />

        <div className="md:border-secondary @container grid gap-6 shadow-xs md:rounded-xl md:border md:py-6">
          <TableFilters />

          {recurringBills.length > 0 ? (
            <>
              <TableMobile
                recurringBills={recurringBills}
                className="md:hidden"
              />
              <TableDesktop
                recurringBills={recurringBills}
                className="hidden md:block"
              />
            </>
          ) : (
            <FilteredEmptyState />
          )}
        </div>
      </div>
    </main>
  )
}
