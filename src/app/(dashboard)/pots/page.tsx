import { PiTipJarFill } from "react-icons/pi"

import PageHeader from "@/components/common/PageHeader"
import EmptyState from "@/components/empty-states/EmptyState"
import Card from "@/components/ui/Card"
import { getColors } from "@/data-access/lookups"
import AddPotDialog from "@/features/pots/components/AddPotDialog"
import PotCard from "@/features/pots/components/PotCard"
import { getPots } from "@/features/pots/data-access"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pots - Personal Finance",
}

export default async function PotsPage() {
  const colors = await getColors()
  const pots = await getPots()

  return (
    <main className="@container grid gap-8">
      <PageHeader
        title="Pots"
        description="Save toward specific goals and manage your pot balances here."
        action={<AddPotDialog colors={colors} />}
      />

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
