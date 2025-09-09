import { PiTipJarFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import AddPotDialog from "@/components/pots/AddPotDialog"
import PotCard from "@/components/pots/PotCard"
import Card from "@/components/ui/Card"
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
        <AddPotDialog colors={colors} />
      </div>

      {pots.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {pots.map((pot) => (
            <PotCard key={pot.id} pot={pot} colors={colors} />
          ))}
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
