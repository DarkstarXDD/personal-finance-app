import { PiTipJarFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import Card from "@/components/ui/Card"

export default async function PotsEmptyState() {
  return (
    <Card>
      <EmptyState
        icon={PiTipJarFill}
        title="No pots created yet"
        description="Start saving for your goals by creating your first pot."
      />
    </Card>
  )
}
