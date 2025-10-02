import { Suspense } from "react"

import BudgetsOverview from "@/components/overview/BudgetsOverview"
import BudgetsOverviewLoading from "@/components/overview/loading-states/BudgetsOverviewLoading"
import RecurringBillsOverviewLoading from "@/components/overview/loading-states/RecurringBillsOverviewLoading"
import SummaryCardsLoading from "@/components/overview/loading-states/SummaryCardsLoading"
import TransactionsOverviewLoading from "@/components/overview/loading-states/TransactionsOverviewLoading"
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
      <Suspense fallback={<SummaryCardsLoading />}>
        <SummaryCards />
      </Suspense>

      <div className="grid gap-6 2xl:grid-cols-2">
        <PotsOverview />

        <Suspense fallback={<BudgetsOverviewLoading />}>
          <BudgetsOverview />
        </Suspense>

        <Suspense fallback={<TransactionsOverviewLoading />}>
          <TransactionsOverview />
        </Suspense>

        <Suspense fallback={<RecurringBillsOverviewLoading />}>
          <RecurringBillsOverview />
        </Suspense>
      </div>
    </main>
  )
}
