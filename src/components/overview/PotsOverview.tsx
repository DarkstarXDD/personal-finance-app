import { PiTipJar, PiTipJarFill } from "react-icons/pi"

import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import { Metrics, MetricItem } from "@/components/ui/Metrics"
import { getPots } from "@/data-access/pots"
import { currencyFormatter } from "@/lib/utils"

export default async function PotsOverview() {
  const pots = await getPots(4)

  return (
    <Card className="grid gap-5 shadow-none">
      <div className="flex items-center justify-between">
        <Heading as="h2" variant="secondary">
          Pots
        </Heading>
        <Link withIcon href="/pots">
          See Details
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-[2fr_3fr]">
        <Card
          padding="sm"
          className="bg-beige-100 flex items-center justify-start gap-4"
        >
          <PiTipJar className="text-green size-10" />
          <dl className="grid gap-3">
            <dt className="text-grey-500 text-sm leading-normal font-normal">
              Total Saved
            </dt>
            <dd className="text-grey-900 text-3xl leading-tight font-bold">
              $850
            </dd>
          </dl>
        </Card>

        <div>
          {pots.length > 0 ? (
            <Metrics className="grid grid-cols-2 gap-4 md:grid-rows-2">
              {pots.map((pot) => (
                <MetricItem
                  key={pot.id}
                  label={pot.name}
                  value={currencyFormatter.format(Number(pot.currentAmount))}
                  color={pot.color.value}
                />
              ))}
            </Metrics>
          ) : (
            <PotsEmptyState />
          )}
        </div>
      </div>
    </Card>
  )
}

function PotsEmptyState() {
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
