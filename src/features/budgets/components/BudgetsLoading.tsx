import Card from "@/components/ui/Card"
import Skeleton from "@/components/ui/Skeleton"
import BudgetsSummaryLoading from "@/features/budgets/components/BudgetsSummaryLoading"

export default function BudgetsLoading() {
  return (
    <div className="grid items-start gap-6 @6xl:grid-cols-[2fr_5fr]">
      <Card size="lg" className="@container grid content-start gap-8">
        <Skeleton className="h-5.5 w-40" />
        <BudgetsSummaryLoading />
      </Card>

      <div className="grid gap-6 @5xl:grid-cols-2">
        <BudgetCardLoading />
        <BudgetCardLoading />
        <BudgetCardLoading />
        <BudgetCardLoading />
      </div>
    </div>
  )
}

function BudgetCardLoading() {
  return (
    <Card size="lg">
      <div className="grid gap-8 self-start">
        <div className="flex items-center justify-start gap-4">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-5.5 w-24" />
          <Skeleton className="ml-auto size-5" />
        </div>

        <div className="grid gap-8">
          <div className="flex items-end gap-1">
            <Skeleton className="h-8.5 w-14" />
            <Skeleton className="h-5 w-18" />
          </div>

          <div className="grid gap-1.5">
            <Skeleton className="h-3 w-full" />

            <div className="flex justify-between gap-2 text-sm font-medium">
              <Skeleton className="h-5.5 w-15" />
              <Skeleton className="h-3 w-30" />
            </div>
          </div>

          <Card size="sm" className="bg-secondary grid gap-5 px-0">
            <div className="flex items-center justify-between px-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
          </Card>
        </div>
      </div>
    </Card>
  )
}
