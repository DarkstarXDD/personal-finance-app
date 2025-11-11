import { PiReceiptFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import Card from "@/components/ui/Card"

export default function RecurringBillsEmptyState() {
  return (
    <Card>
      <EmptyState
        icon={PiReceiptFill}
        title="You don’t have any recurring bills yet"
        description="They’ll appear here once you have some."
      />
    </Card>
  )
}
