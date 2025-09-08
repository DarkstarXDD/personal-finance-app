import { PiTipJarFill } from "react-icons/pi"

import Heading from "@/components/ui/Heading"

export default function PotsEmptyState() {
  return (
    <div className="grid justify-items-center gap-3 py-12 text-center">
      <div className="bg-beige-100 flex h-16 w-16 items-center justify-center rounded-full">
        <PiTipJarFill className="text-grey-500 size-8" />
      </div>
      <Heading as="h3" variant="secondary">
        No pots created yet
      </Heading>
      <p className="text-grey-500 text-sm leading-normal font-normal">
        Start saving for your goals by creating your first pot.
      </p>
    </div>
  )
}
