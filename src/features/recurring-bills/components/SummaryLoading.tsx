import Card from "@/components/ui/Card"
import Skeleton from "@/components/ui/Skeleton"

export default function SummaryLoading() {
  const today = new Date()
  const currentMonth = today.toLocaleDateString(undefined, { month: "long" })

  return (
    <div className="@container">
      <div className="grid gap-6 @lg:grid-cols-2">
        <Card size="sm" className="grid gap-1">
          <h2 className="text-sm font-medium">Total Bills</h2>
          <Skeleton className="h-9 w-10" />
        </Card>

        <Card size="sm" className="grid gap-1">
          <h2 className="text-sm font-medium">Total Amount</h2>
          <Skeleton className="h-9 w-30" />
        </Card>

        <Card size="sm" className="grid gap-6 @lg:col-span-2">
          <h2 className="text-lg leading-tight font-semibold">
            Summary for <span className="text-primary">{currentMonth}</span>
          </h2>

          <div className="grid gap-4 @xl:grid-cols-3">
            <div className="grid gap-1">
              <p className="text-sm font-medium">Paid Bills</p>
              <Skeleton className="h-9 w-30" />
            </div>

            <div className="grid gap-1">
              <p className="text-sm font-medium">Total Upcoming</p>
              <Skeleton className="h-9 w-30" />
            </div>

            <div className="grid gap-1">
              <p className="text-sm font-medium">Due Soon</p>
              <Skeleton className="h-9 w-30" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
