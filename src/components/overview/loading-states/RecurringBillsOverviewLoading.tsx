import React from "react"

import TableLoading from "@/components/overview/loading-states/TableLoading"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import Skeleton from "@/components/ui/Skeleton"

export default function RecurringBillsOverviewLoading() {
  return (
    <Card className="grid content-start gap-8 shadow-none">
      <div className="flex items-center justify-between">
        <Heading as="h2" variant="secondary">
          Recurring Bills
        </Heading>
        <Link withIcon href="/recurring-bills">
          See Details
        </Link>
      </div>

      <div className="grid gap-3">
        <Skeleton className="flex justify-between px-4 py-5">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-12" />
        </Skeleton>
        <Skeleton className="flex justify-between px-4 py-5">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-12" />
        </Skeleton>
        <Skeleton className="flex justify-between px-4 py-5">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-12" />
        </Skeleton>
      </div>

      <div className="md:hidden">
        <RecurringBillItemLoading />
        <RecurringBillItemLoading />
        <RecurringBillItemLoading />
      </div>

      <TableLoading className="hidden w-full md:block" columnCount={4} />
    </Card>
  )
}

function RecurringBillItemLoading() {
  return (
    <li className="border-b-grey-100 grid gap-2 border-b py-4 first:pt-0 last:border-none last:pb-0">
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-5 w-30" />
        <Skeleton className="h-5 w-14" />
      </div>
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-4.5 w-20" />
        <Skeleton className="h-4.5 w-17" />
      </div>
    </li>
  )
}
