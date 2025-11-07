import { Suspense } from "react"
import { PiTipJar } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import Card from "@/components/ui/Card"
import Link from "@/components/ui/Link"
import PotsOverviewLoading from "@/features/overview/components/PotsOverviewLoading"
import PotsSummary from "@/features/pots/components/PotsSummary"
import { getPots } from "@/features/pots/data-access"

export default function PotsOverview() {
  return (
    <Card size="md" className="grid content-start gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-primary text-xl leading-tight font-semibold">
          Pots
        </h2>

        <Link withIcon href="/pots">
          See Details
        </Link>
      </div>

      <div className="@container">
        <Suspense fallback={<PotsOverviewLoading />}>
          <Pots />
        </Suspense>
      </div>
    </Card>
  )
}

async function Pots() {
  const { pots, potsSummary } = await getPots(4)

  return (
    <>
      {pots.length > 0 ? (
        <PotsSummary {...{ pots, potsSummary }} />
      ) : (
        <EmptyState
          icon={PiTipJar}
          title="No pots created yet"
          description="Start saving for your goals by creating your first pot."
        />
      )}
    </>
  )
}
