import NewPotDialog from "@/components/pots/NewPotDialog"
import PotCard from "@/components/pots/PotCard"
import { getColors } from "@/data-access/lookups"

export default async function PotsPage() {
  const colors = await getColors()

  return (
    <>
      <NewPotDialog colors={colors} />
      <PotCard name="Savings" target="2000" theme="#277c78" />
    </>
  )
}
