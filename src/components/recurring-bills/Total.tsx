import { PiReceipt } from "react-icons/pi"

import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"

export default function Total() {
  return (
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
  )
}
