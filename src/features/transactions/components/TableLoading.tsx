import Skeleton from "@/components/ui/Skeleton"

type TableLoadingProps = { rowCount: number }

export default function TableLoading({ rowCount }: TableLoadingProps) {
  return (
    <>
      <TableMobileLoading rowCount={rowCount} className="md:hidden" />
      <TableDesktopLoading rowCount={rowCount} className="hidden md:block" />
    </>
  )
}

type TableMobileLoadingProps = { className?: string; rowCount: number }

export function TableMobileLoading({
  className,
  rowCount,
}: TableMobileLoadingProps) {
  return (
    <div className={className}>
      {Array.from({ length: rowCount }).map((_, i) => (
        <TableMobileLoadingItem key={i} />
      ))}
    </div>
  )
}

type TableDesktopLoadingProps = { className?: string; rowCount: number }

export function TableDesktopLoading({
  className,
  rowCount,
}: TableDesktopLoadingProps) {
  return (
    <div className={className}>
      {Array.from({ length: rowCount }).map((_, i) => (
        <TableDesktopLoadingItem key={i} />
      ))}
    </div>
  )
}

function TableMobileLoadingItem() {
  return (
    <div className="border-secondary grid grid-cols-2 gap-x-2 gap-y-1 border-b py-4 last:border-none">
      <Skeleton className="h-5.25 w-25" />
      <Skeleton className="h-5.25 w-22 justify-self-end" />
      <Skeleton className="h-5.25 w-22" />
      <Skeleton className="h-5.25 w-22 justify-self-end" />
    </div>
  )
}

function TableDesktopLoadingItem() {
  return (
    <div className="border-secondary flex justify-between border-b last:border-none">
      <div className="px-6 py-4">
        <Skeleton className="h-5.25 w-25" />
      </div>
      <div className="px-6 py-4">
        <Skeleton className="h-5.25 w-22" />
      </div>
      <div className="px-6 py-4">
        <Skeleton className="h-5.25 w-22" />
      </div>
      <div className="px-6 py-4">
        <Skeleton className="h-5.25 w-22" />
      </div>
    </div>
  )
}
