import { PiReceiptFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import FilteredEmptyState from "@/components/empty-states/FilteredEmptyState"
import TableDesktop from "@/components/recurring-bills/TableDesktop"
import TableFilters from "@/components/recurring-bills/TableFilters"
import TableMobile from "@/components/recurring-bills/TableMobile"
import Total from "@/components/recurring-bills/Total"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import { getRecurringBills } from "@/data-access/recurring-bills"

export default async function RecurringBillsPage({
  searchParams,
}: {
  searchParams: Promise<{
    query: string | undefined
    sortby: string | undefined
  }>
}) {
  const { query, sortby } = await searchParams

  const { recurringBills, totalItemsWithoutFiltering } =
    await getRecurringBills({ query, sortby })

  if (totalItemsWithoutFiltering === 0) {
    return (
      <main className="grid gap-8">
        <Heading as="h1">Recurring Bills</Heading>
        <div className="grid gap-6 xl:grid-cols-[20rem_1fr] xl:items-start">
          <Total />
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
      <Heading as="h1">Recurring Bills</Heading>
      <div className="grid gap-6 xl:grid-cols-[20rem_1fr] xl:items-start">
        <Total />

        <Card className="grid gap-6 md:pb-4">
          <TableFilters />
          {recurringBills.length > 0 ? (
            <>
              <TableMobile recurringBills={recurringBills} />
              <TableDesktop recurringBills={recurringBills} />
            </>
          ) : (
            <FilteredEmptyState />
          )}
        </Card>
      </div>
    </main>
  )
}
