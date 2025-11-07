import Skeleton from "@/components/ui/Skeleton"

export default function PotsOverviewLoading() {
  return (
    <div className="grid items-start gap-8 2xl:grid-cols-1 @xl:grid-cols-[2fr_3fr]">
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2">
        <Skeleton className="row-span-2 size-10" />
        <Skeleton className="col-start-2 h-5.25 w-25" />
        <Skeleton className="col-start-2 h-7 w-30" />
      </div>

      <div className="@container">
        <SummaryItemLoading />
        <SummaryItemLoading />
        <SummaryItemLoading />
        <SummaryItemLoading />
      </div>
    </div>
  )
}

function SummaryItemLoading() {
  return (
    <div className="border-secondary flex items-start gap-4 border-b py-4 first:pt-0 last:border-none last:pb-0 @sm:items-center">
      <Skeleton className="h-5 w-1 shrink-0" />

      <div className="flex w-full flex-col gap-1 @sm:flex-row @sm:items-center @sm:justify-between">
        <Skeleton className="h-3.5 w-25" />
        <Skeleton className="h-6 w-35" />
      </div>
    </div>
  )
}
