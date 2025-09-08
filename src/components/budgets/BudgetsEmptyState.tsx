import { PiChartDonutFill } from "react-icons/pi"

import Heading from "@/components/ui/Heading"

export default function BudgetsEmptyState() {
  return (
    <div className="grid justify-items-center gap-3 py-12 text-center">
      <div className="bg-beige-100 flex h-16 w-16 items-center justify-center rounded-full">
        <PiChartDonutFill className="text-grey-500 size-8" />
      </div>
      <Heading as="h3" variant="secondary">
        No budgets created yet
      </Heading>
      <p className="text-grey-500 text-sm leading-normal font-normal">
        Set spending limits for different categories.
      </p>
    </div>
  )
}
