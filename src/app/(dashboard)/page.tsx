import { type Metadata } from "next"
import { Suspense } from "react"

import PageHeader from "@/components/common/PageHeader"
// import PotsOverviewLoading from "@/components/overview/loading-states/PotsOverviewLoading"
// import TransactionsOverviewLoading from "@/components/overview/loading-states/TransactionsOverviewLoading"
import BudgetsOverview from "@/features/overview/components/BudgetsOverview"
// import PotsOverview from "@/features/overview/components/PotsOverview"
import RecurringBillsOverview from "@/features/overview/components/RecurringBillsOverview"
import SummaryCards from "@/features/overview/components/SummaryCards"
import SummaryCardsLoading from "@/features/overview/components/SummaryCardsLoading"
import TransactionsOverview from "@/features/overview/components/TransactionsOverview"

export const metadata: Metadata = {
  title: "Overview - Personal Finance",
}

export default function OverviewPage() {
  return (
    <main className="grid gap-8">
      <PageHeader
        title="Overview"
        description="summary of your financial activity across all sections."
      />

      <Suspense fallback={<SummaryCardsLoading />}>
        <SummaryCards />
      </Suspense>

      <div className="grid gap-6 2xl:grid-cols-2">
        <TransactionsOverview />

        <BudgetsOverview />

        {/* <Suspense fallback={<PotsOverviewLoading />}>
          <PotsOverview />
        </Suspense> */}

        <RecurringBillsOverview />
      </div>
    </main>
  )
}
