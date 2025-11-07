import { type Metadata } from "next"
import { PiTipJarFill } from "react-icons/pi"

import PageHeader from "@/components/common/PageHeader"
import EmptyState from "@/components/empty-states/EmptyState"
import Card from "@/components/ui/Card"
import { getColors } from "@/data-access/lookups"
import AddPotDialog from "@/features/pots/components/AddPotDialog"
import PotCard from "@/features/pots/components/PotCard"
import PotsSummary from "@/features/pots/components/PotsSummary"
import { getPots } from "@/features/pots/data-access"

export const metadata: Metadata = {
  title: "Pots - Personal Finance",
}

export default async function PotsPage() {
  const colors = await getColors()
  const { pots, potsSummary } = await getPots()

  return (
    <main className="@container grid gap-8">
      <PageHeader
        title="Pots"
        description="Save toward specific goals and manage your pot balances here."
        action={<AddPotDialog colors={colors} />}
      />

      {pots.length > 0 ? (
        <div className="grid items-start gap-6 @6xl:grid-cols-[2fr_5fr]">
          <Card size="lg" className="@container grid content-start gap-8">
            <h2 className="text-primary text-lg leading-tight font-semibold">
              Pots Summary
            </h2>
            <PotsSummary {...{ pots, potsSummary }} />
          </Card>

          <div className="grid gap-6 @3xl:grid-cols-2">
            {pots.map((pot) => (
              <PotCard key={pot.id} pot={pot} colors={colors} />
            ))}
          </div>
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={PiTipJarFill}
            title="No pots created yet"
            description="Start saving for your goals by creating your first pot."
          />
        </Card>
      )}
    </main>
  )
}
