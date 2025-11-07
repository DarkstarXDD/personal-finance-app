import { PiTipJar } from "react-icons/pi"

import { type Pot, type PotsSummary } from "@/features/pots/data-access"
import { currencyFormatter } from "@/lib/utils"

type PotsSummaryProps = {
  pots: Pot[]
  potsSummary: PotsSummary
}

export default function PotsSummary({ pots, potsSummary }: PotsSummaryProps) {
  return (
    <div className="grid items-start gap-8 2xl:grid-cols-1 @xl:grid-cols-[2fr_3fr]">
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2">
        <PiTipJar className="text-fg-quaternary row-span-2 size-10" />
        <p className="col-start-2 text-sm font-medium">Total Saved</p>
        <p className="text-primary col-start-2 text-2xl leading-tight font-semibold">
          {currencyFormatter.format(potsSummary.totalSavedAmount)}
        </p>
      </div>

      <ul className="@container">
        {pots.map((pot) => (
          <SummaryItem key={pot.id} pot={pot} />
        ))}
      </ul>
    </div>
  )
}

type SummaryItemProps = { pot: Pot }

function SummaryItem({ pot }: SummaryItemProps) {
  return (
    <li className="border-secondary flex items-start gap-4 border-b py-4 first:pt-0 last:border-none last:pb-0 @sm:items-center">
      <span
        className="h-5 w-1 shrink-0 rounded-lg"
        style={{ backgroundColor: pot.color.value }}
      />

      <div className="flex w-full flex-col gap-1 @sm:flex-row @sm:items-center @sm:justify-between">
        <span className="text-sm leading-none font-medium">{pot.name}</span>

        <span className="text-primary font-semibold">
          {currencyFormatter.format(Number(pot.currentAmount))}{" "}
          <span className="text-tertiary text-sm font-medium">
            of {currencyFormatter.format(pot.target)}
          </span>
        </span>
      </div>
    </li>
  )
}
