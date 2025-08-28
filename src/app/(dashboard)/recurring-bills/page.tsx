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

  const recurringBills = await getRecurringBills({ query, sortby })
  console.log(recurringBills)

  return (
    <main className="grid gap-8">
      <Heading as="h1">Recurring Bills</Heading>
      <div className="grid gap-6 xl:grid-cols-[20rem_1fr] xl:items-start">
        <Total />
        <Card className="grid gap-6">
          <TableFilters />
          <TableMobile recurringBills={recurringBills} />
          <TableDesktop recurringBills={recurringBills} />
        </Card>
      </div>
    </main>
  )
}
