import Card from "@/components/ui/Card"

export default function SummaryCards() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-6">
      <Card padding="md" theme="dark" className="w-full shadow-none">
        <dl className="grid gap-3">
          <dt className="text-sm leading-normal font-normal">
            Current Balance
          </dt>
          <dd className="text-3xl leading-tight font-bold text-white">
            $4,836.00
          </dd>
        </dl>
      </Card>

      <Card padding="md" className="w-full shadow-none">
        <dl className="grid gap-3">
          <dt className="text-grey-500 text-sm leading-normal font-normal">
            Income
          </dt>
          <dd className="text-grey-900 text-3xl leading-tight font-bold">
            $3,814.25
          </dd>
        </dl>
      </Card>

      <Card padding="md" className="w-full shadow-none">
        <dl className="grid gap-3">
          <dt className="text-grey-500 text-sm leading-normal font-normal">
            Expenses
          </dt>
          <dd className="text-grey-900 text-3xl leading-tight font-bold">
            $1,700.50
          </dd>
        </dl>
      </Card>
    </div>
  )
}
