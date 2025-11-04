import { PiTipJar, PiTipJarFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import MetricItem from "@/components/ui/MetricItem"
import { getPots } from "@/features/pots/data-access"
import { currencyFormatter } from "@/lib/utils"

export default async function PotsOverview() {
  const pots = await getPots(4)

  return (
    <Card className="grid content-start gap-8 shadow-none">
      <div className="flex items-center justify-between">
        <Heading as="h2" variant="secondary">
          Pots
        </Heading>
        <Link withIcon href="/pots">
          See Details
        </Link>
      </div>

      {pots.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-[2fr_3fr]">
          <Card
            size="sm"
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

          <div className="grid grid-cols-2 gap-4 md:grid-rows-2">
            {pots.map((pot) => (
              <MetricItem
                key={pot.id}
                label={pot.name}
                value={currencyFormatter.format(Number(pot.currentAmount))}
                color={pot.color.value}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={PiTipJarFill}
          title="No pots created yet"
          description="Start saving for your goals by creating your first pot."
        />
      )}
    </Card>
  )
}
