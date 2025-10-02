import Skeleton from "@/components/ui/Skeleton"
import { cn } from "@/lib/utils"

export default function TableLoading({
  className,
  columnCount = 4,
  rowCount = 3,
}: {
  className?: string
  columnCount?: number
  rowCount?: number
}) {
  return (
    <div className={cn(className)}>
      <TableHeaderLoading columnCount={columnCount} />

      {Array.from({ length: rowCount }).map((_, i) => (
        <TableRowLoading key={i} columnCount={columnCount} />
      ))}
    </div>
  )
}

function TableRowLoading({ columnCount }: { columnCount: number }) {
  return (
    <div className="border-b-grey-100 flex justify-between border-b p-4 first:pt-0 last:border-none last:pb-0">
      {Array.from({ length: columnCount }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-20" />
      ))}
    </div>
  )
}

function TableHeaderLoading({ columnCount }: { columnCount: number }) {
  return (
    <div className="border-b-grey-100 flex justify-between border-b p-4 first:pt-0 last:border-none last:pb-0">
      {Array.from({ length: columnCount }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-24" />
      ))}
    </div>
  )
}
