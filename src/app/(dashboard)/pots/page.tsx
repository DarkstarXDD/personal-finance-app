import NewPotDialog from "@/components/pots/NewPotDialog"
import PotCard from "@/components/pots/PotCard"
import Heading from "@/components/ui/Heading"
import { getColors } from "@/data-access/lookups"
import { getPots } from "@/data-access/pots"

export default async function PotsPage() {
  const colors = await getColors()
  const pots = await getPots()

  return (
    <main className="grid gap-8">
      <div className="flex items-center justify-between">
        <Heading as="h1" variant="primary">
          Pots
        </Heading>
        <NewPotDialog colors={colors} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {pots.map(({ id, name, target, currentAmount, color }) => (
          <PotCard
            key={id}
            potData={{
              potId: id,
              name,
              target: target.toString(),
              colorId: color.id,
              colorValue: color.value,
              currentAmount: currentAmount.toString(),
            }}
            colors={colors}
          />
        ))}
      </div>
    </main>
  )
}
