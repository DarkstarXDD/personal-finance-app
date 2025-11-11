import TableLoading from "@/components/common/TableLoading"
import Skeleton from "@/components/ui/Skeleton"

export default function RecurringBillsOverviewLoading() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:px-6">
        <div className="grid gap-3">
          <RecurringBillItemLoading />
          <RecurringBillItemLoading />
        </div>

        <div className="grid gap-4">
          <Skeleton className="h-5.5 w-50" />
          <div className="grid gap-3">
            <RecurringBillItemLoading />
            <RecurringBillItemLoading />
            <RecurringBillItemLoading />
          </div>
        </div>
      </div>

      <TableLoading rowCount={3} />
    </div>
  )
}

function RecurringBillItemLoading() {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-5.25 w-35" />
      <Skeleton className="h-7.5 w-15" />
    </div>
  )
}
