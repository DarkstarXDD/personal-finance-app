import { PiReceipt } from "react-icons/pi"

import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"

export default function Total() {
  return (
    <div className="grid gap-3 md:grid-cols-2 md:gap-6">
      <Card
        theme="dark"
        className="flex items-center gap-5 md:flex-col md:items-start md:gap-8"
      >
        <PiReceipt className="size-10 shrink-0 text-white" />
        <div className="grid gap-3">
          <Heading as="h2" variant="tertiary" className="text-white">
            Total biils
          </Heading>
          <p className="text-3xl leading-tight font-bold text-white">$384.98</p>
        </div>
      </Card>

      <Card theme="light" className="grid gap-5">
        <Heading as="h2" variant="secondary" className="text-base">
          Summary
        </Heading>
        <dl>
          <div className="border-grey-100 flex justify-between gap-2 border-b pb-4">
            <dt className="text-grey-500 text-xs leading-normal font-normal">
              Paid Bills
            </dt>
            <dd className="text-grey-900 text-xs leading-normal font-bold">
              2 ($320.00)
            </dd>
          </div>
          <div className="border-grey-100 flex justify-between gap-2 border-b py-4">
            <dt className="text-grey-500 text-xs leading-normal font-normal">
              Total Upcoming
            </dt>
            <dd className="text-grey-900 text-xs leading-normal font-bold">
              6 ($1,230.00)
            </dd>
          </div>
          <div className="flex justify-between gap-2 pt-4">
            <dt className="text-red text-xs leading-normal font-normal">
              Due Soon
            </dt>
            <dd className="text-red text-xs leading-normal font-bold">
              2 ($40.00)
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  )
}
