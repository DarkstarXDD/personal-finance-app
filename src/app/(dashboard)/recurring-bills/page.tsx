import TableMobile from "@/components/recurring-bills/TableMobile"
import Total from "@/components/recurring-bills/Total"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"

export default function RecurringBillsPage() {
  return (
    <main className="grid gap-8">
      <Heading as="h1">Recurring Bills</Heading>
      <div className="grid gap-6 xl:grid-cols-[20rem_1fr]">
        <Total />
        <Card>
          <TableMobile />
        </Card>
      </div>
    </main>
  )
}
