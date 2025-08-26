import Total from "@/components/recurring-bills/Total"
import Heading from "@/components/ui/Heading"

export default function RecurringBillsPage() {
  return (
    <main className="grid gap-8">
      <Heading as="h1">Recurring Bills</Heading>
      <Total />
    </main>
  )
}
