import { PiTipJarFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import Card from "@/components/ui/Card"
import { getColors } from "@/data-access/lookups"
import { getPots } from "@/data-access/pots"
import AddPotDialog from "@/features/pots/components/AddPotDialog"
import PotCard from "@/features/pots/components/PotCard"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pots - Personal Finance",
}

export default async function PotsPage() {
  const colors = await getColors()
  const pots = await getPots()

  return (
    <main className="@container grid gap-8">
      <div className="grid w-full grid-cols-1 items-start justify-items-start gap-4 md:grid-cols-[1fr_auto]">
        <div className="grid gap-1">
          <h1 className="text-primary text-3xl leading-tight font-semibold tracking-tight">
            Pots
          </h1>
          <p>Save toward specific goals and manage your pot balances here.</p>
        </div>
        <AddPotDialog colors={colors} />
      </div>

      {pots.length > 0 ? (
        <div className="grid gap-6 @3xl:grid-cols-2">
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
