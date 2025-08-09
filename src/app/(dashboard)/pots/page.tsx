import NewPotDialog from "@/components/pots/NewPotDialog"
import PotCard from "@/components/pots/PotCard"
import Heading from "@/components/ui/Heading"
import { getColors } from "@/data-access/lookups"
import { getPots } from "@/data-access/pots"

export default async function PotsPage() {
  const colors = await getColors()
  const pots = await getPots()
  console.log(pots)

  return (
    <main className="grid gap-8">
      <div className="flex items-center justify-between">
        <Heading as="h1" variant="primary">
          Pots
        </Heading>
        <NewPotDialog colors={colors} />
      </div>
      <div>
        {pots.map(({ id, name, target, color }) => (
          <PotCard
            key={id}
            name={name}
            target={target.toString()}
            theme={color.value}
          />
        ))}
      </div>
    </main>
  )
}
