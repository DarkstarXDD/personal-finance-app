import { PiArrowsDownUpFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import Card from "@/components/ui/Card"

export default function TransactionsEmptyState() {
  return (
    <Card>
      <EmptyState
        icon={PiArrowsDownUpFill}
        title="No transactions yet"
        description="Your transaction history will appear here once you start making
          purchases."
      />
    </Card>
  )
}
