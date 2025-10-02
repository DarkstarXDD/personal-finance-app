import React from "react"

import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import Skeleton from "@/components/ui/Skeleton"

export default function PotsOverviewLoading() {
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

      <Skeleton className="h-4 w-20" />
    </Card>
  )
}
