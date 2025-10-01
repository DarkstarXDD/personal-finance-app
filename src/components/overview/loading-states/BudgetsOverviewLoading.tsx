import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import Skeleton from "@/components/ui/Skeleton"

export default function BudgetsOverviewLoading() {
  return (
    <Card className="grid content-start gap-8 shadow-none">
      <div className="flex items-center justify-between">
        <Heading as="h2" variant="secondary">
          Budgets
        </Heading>
        <Link
          withIcon
          href="/budgets"
          className="flex items-center justify-between"
        >
          See Details
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:items-center 2xl:grid-cols-1">
        <div className="flex justify-center">
          <Skeleton className="size-60 rounded-full" />
        </div>

        <div className="grid">
          <BudgetItemLoading />
          <BudgetItemLoading />
          <BudgetItemLoading />
          <BudgetItemLoading />
          <BudgetItemLoading />
        </div>
      </div>
    </Card>
  )
}

function BudgetItemLoading() {
  return (
    <div className="border-grey-100 flex justify-between border-b pt-4 pb-4 first:pt-0 last:border-none last:pb-0">
      <div className="flex gap-4">
        <Skeleton className="h-5 w-2" />
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-14" />
        <Skeleton className="h-6 w-12" />
      </div>
    </div>
  )
}
