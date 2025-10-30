import Card from "@/components/ui/Card"
import Skeleton from "@/components/ui/Skeleton"

export default function SummaryCardsLoading() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-6">
      <Card size="md" className="w-full shadow-none">
        <dl className="grid gap-3">
          <dt className="text-sm leading-normal font-normal">
            Current Balance
          </dt>
          <dd className="text-3xl leading-tight font-bold text-white">
            <Skeleton theme="dark" className="h-8 w-32" />
          </dd>
        </dl>
      </Card>

      <Card size="md" className="w-full shadow-none">
        <dl className="grid gap-3">
          <dt className="text-grey-500 text-sm leading-normal font-normal">
            Income
          </dt>
          <dd className="text-grey-900 text-3xl leading-tight font-bold">
            <Skeleton className="h-8 w-32" />
          </dd>
        </dl>
      </Card>

      <Card size="md" className="w-full shadow-none">
        <dl className="grid gap-3">
          <dt className="text-grey-500 text-sm leading-normal font-normal">
            Expenses
          </dt>
          <dd className="text-grey-900 text-3xl leading-tight font-bold">
            <Skeleton className="h-8 w-32" />
          </dd>
        </dl>
      </Card>
    </div>
  )
}
