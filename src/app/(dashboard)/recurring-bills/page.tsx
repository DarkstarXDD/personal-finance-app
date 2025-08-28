import TableMobile from "@/components/recurring-bills/TableMobile"
import Total from "@/components/recurring-bills/Total"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import { getRecurringBills } from "@/data-access/recurring-bills"

export default async function RecurringBillsPage() {
  const recurringBills = await getRecurringBills({})
  console.log(recurringBills)

  return (
    <main className="grid gap-8">
      <Heading as="h1">Recurring Bills</Heading>
      <div className="grid gap-6 xl:grid-cols-[20rem_1fr]">
        <Total />
        <Card>
          <TableMobile recurringBills={recurringBills} />
        </Card>
      </div>
    </main>
  )
}
