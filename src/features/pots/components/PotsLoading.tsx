import Card from "@/components/ui/Card"
import Skeleton from "@/components/ui/Skeleton"
import PotsSummaryLoading from "@/features/pots/components/PotsSummaryLoading"

export default function PotsLoading() {
  return (
    <div className="grid items-start gap-6 @6xl:grid-cols-[2fr_5fr]">
      <Card size="lg" className="@container grid content-start gap-8">
        <Skeleton className="h-5.5 w-40" />
        <PotsSummaryLoading />
      </Card>

      <div className="grid gap-6 @3xl:grid-cols-2">
        <PotCardLoading />
        <PotCardLoading />
        <PotCardLoading />
        <PotCardLoading />
      </div>
    </div>
  )
}

function PotCardLoading() {
  return (
    <Card size="lg" className="grid gap-8">
      <div className="flex items-center justify-start gap-4">
        <Skeleton className="size-4 rounded-full" />
        <Skeleton className="h-5.5 w-24" />
        <Skeleton className="ml-auto size-5" />
      </div>

      <div className="flex items-start justify-between gap-2">
        <div className="grid gap-1">
          <Skeleton className="h-5.5 w-15" />
          <Skeleton className="h-8.5 w-30" />
        </div>
        <p className="grid justify-items-end gap-1">
          <Skeleton className="h-5.5 w-12" />
          <Skeleton className="h-5.5 w-20" />
        </p>
      </div>

      <div className="grid gap-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-4.5 w-30" />
      </div>

      <div className="xs:flex-row flex flex-col items-start justify-center gap-4 lg:gap-6">
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
      </div>
    </Card>
  )
}
