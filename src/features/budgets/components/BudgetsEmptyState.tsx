import { PiChartDonutFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import Card from "@/components/ui/Card"

export default function BudgetsEmptyState() {
  return (
    <Card>
      <EmptyState
        icon={PiChartDonutFill}
        title="No budgets created yet"
        description="Set spending limits for different categories."
      />
    </Card>
  )
}
