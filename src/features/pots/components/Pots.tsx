import Card from "@/components/ui/Card"
import { getColors } from "@/data-access/lookups"
import PotCard from "@/features/pots/components/PotCard"
import PotsEmptyState from "@/features/pots/components/PotsEmptyState"
import PotsSummary from "@/features/pots/components/PotsSummary"
import { getPots } from "@/features/pots/data-access"

export default async function Pots() {
  const { pots, potsSummary } = await getPots()
  const colors = await getColors()

  if (pots.length === 0) return <PotsEmptyState />

  return (
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
  )
}
