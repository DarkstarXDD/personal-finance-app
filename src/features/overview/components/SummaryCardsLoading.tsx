import Card from "@/components/ui/Card"
import Skeleton from "@/components/ui/Skeleton"

export default function SummaryCardsLoading() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-6">
      <Card size="sm" className="grid w-full gap-1">
        <h2 className="text-sm font-medium">Current Balance</h2>
        <Skeleton className="h-9 w-32" />
      </Card>

      <Card size="sm" className="grid w-full gap-1">
        <h2 className="text-sm font-medium">Income</h2>
        <Skeleton className="h-9 w-32" />
      </Card>

      <Card size="sm" className="grid w-full gap-1">
        <h2 className="text-sm font-medium">Expenses</h2>
        <Skeleton className="h-9 w-32" />
      </Card>
    </div>
  )
}
