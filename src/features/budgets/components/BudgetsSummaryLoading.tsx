import Skeleton from "@/components/ui/Skeleton"

export default function BudgetsOverviewLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center 2xl:grid-cols-1">
      <div className="flex justify-center">
        <Skeleton className="size-60 rounded-full" />
      </div>

      <div className="@container">
        <BudgetItemLoading />
        <BudgetItemLoading />
        <BudgetItemLoading />
        <BudgetItemLoading />
      </div>
    </div>
  )
}

function BudgetItemLoading() {
  return (
    <div className="border-secondary flex items-start gap-4 border-b py-4 first:pt-0 last:border-none last:pb-0 @xs:items-center">
      <Skeleton className="h-5 w-1" />

      <div className="flex w-full flex-col gap-1 @xs:flex-row @xs:items-center @xs:justify-between">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-6 w-30" />
      </div>
    </div>
  )
}
