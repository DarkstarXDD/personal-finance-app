import BudgetsOverview from "@/components/overview/BudgetsOverview"
import PotsOverview from "@/components/overview/PotsOverview"
import RecurringBillsOverview from "@/components/overview/RecurringBillsOverview"
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

      <div className="grid gap-6 2xl:grid-cols-[3fr_2fr] 2xl:items-start">
        <PotsOverview />
        <BudgetsOverview />
        <TransactionsOverview />
        <RecurringBillsOverview />
      </div>
    </main>
  )
}
