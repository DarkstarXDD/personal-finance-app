import NewPotDialog from "@/components/pots/NewPotDialog"
import { getColors } from "@/data-access/lookups"

export default async function PotsPage() {
  const colors = await getColors()

  return <NewPotDialog colors={colors} />
}
