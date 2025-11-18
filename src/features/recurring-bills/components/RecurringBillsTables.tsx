import FilteredEmptyState from "@/components/empty-states/FilteredEmptyState"
import RecurringBillsEmptyState from "@/features/recurring-bills/components/RecurringBillsEmptyState"
import TableDesktop from "@/features/recurring-bills/components/TableDesktop"
import TableMobile from "@/features/recurring-bills/components/TableMobile"
import { type GetRecurringBillsReturn } from "@/features/recurring-bills/data-access"

type RecurringBillsTablesProps = {
  recurringBillsPromise: GetRecurringBillsReturn
}

export default async function RecurringBillsTables({
  recurringBillsPromise,
}: RecurringBillsTablesProps) {
  const { recurringBills, summary } = await recurringBillsPromise

  if (summary.billCount === 0)
    return (
      <div className="md:px-6">
        <RecurringBillsEmptyState />
      </div>
    )

  return (
    <>
      {recurringBills.length > 0 ? (
        <>
          <TableMobile recurringBills={recurringBills} className="md:hidden" />
          <TableDesktop
            recurringBills={recurringBills}
            className="hidden md:block"
          />
        </>
      ) : (
        <FilteredEmptyState />
      )}
    </>
  )
}
