import PotsOverview from "@/components/overview/PotsOverview"
import SummaryCards from "@/components/overview/SummaryCards"
import TransactionsOverview from "@/components/overview/TransactionsOverview"
import Heading from "@/components/ui/Heading"

export default function OverviewPage() {
  return (
    <main className="grid gap-8">
      <Heading as="h1" variant="primary">
        Overview
      </Heading>

      <SummaryCards />

      <PotsOverview />

      <TransactionsOverview />
    </main>
  )
}
