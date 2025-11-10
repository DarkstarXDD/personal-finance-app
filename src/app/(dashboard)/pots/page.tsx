import { type Metadata } from "next"
import { Suspense } from "react"

import PageHeader from "@/components/common/PageHeader"
import { getColors } from "@/data-access/lookups"
import AddPotDialog from "@/features/pots/components/AddPotDialog"
import Pots from "@/features/pots/components/Pots"
import PotsLoading from "@/features/pots/components/PotsLoading"

export const metadata: Metadata = {
  title: "Pots - Personal Finance",
}

export default async function PotsPage() {
  const colors = await getColors()

  return (
    <main className="@container grid gap-8">
      <PageHeader
        title="Pots"
        description="Save toward specific goals and manage your pot balances here."
        action={<AddPotDialog colors={colors} />}
      />

      <Suspense fallback={<PotsLoading />}>
        <Pots />
      </Suspense>
    </main>
  )
}
