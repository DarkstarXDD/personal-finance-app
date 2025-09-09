import { PiReceiptFill } from "react-icons/pi"

import Heading from "@/components/ui/Heading"

export default function RecurringBillsEmptyState() {
  return (
    <div className="grid justify-items-center gap-3 py-12 text-center">
      <div className="bg-beige-100 flex h-16 w-16 items-center justify-center rounded-full">
        <PiReceiptFill className="text-grey-500 size-8" />
      </div>
      <Heading as="h3" variant="secondary">
        You don’t have any recurring bills yet
      </Heading>
      <p className="text-grey-500 text-sm leading-normal font-normal">
        They’ll appear here once you have some.
      </p>
    </div>
  )
}
