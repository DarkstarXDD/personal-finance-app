import { PiArrowsDownUpFill } from "react-icons/pi"

import Heading from "@/components/ui/Heading"

export default function TransactionsEmptyState() {
  return (
    <div className="grid justify-items-center gap-3 py-12 text-center">
      <div className="bg-beige-100 flex h-16 w-16 items-center justify-center rounded-full">
        <PiArrowsDownUpFill className="text-grey-500 size-8" />
      </div>
      <Heading as="h3" variant="secondary">
        No transactions yet
      </Heading>
      <p className="text-grey-500 text-sm leading-normal font-normal">
        Your transaction history will appear here once you start making
        purchases.
      </p>
    </div>
  )
}
