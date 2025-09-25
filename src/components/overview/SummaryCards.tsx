import Card from "@/components/ui/Card"
import { getTransactionTotals } from "@/data-access/transactions"
import { currencyFormatter } from "@/lib/utils"

export default async function SummaryCards() {
  const { currentBalance, income, expense } = await getTransactionTotals()

  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-6">
      <Card padding="md" theme="dark" className="w-full shadow-none">
        <dl className="grid gap-3">
          <dt className="text-sm leading-normal font-normal">
            Current Balance
          </dt>
          <dd className="text-3xl leading-tight font-bold text-white">
            {currencyFormatter.format(currentBalance)}
          </dd>
        </dl>
      </Card>

      <Card padding="md" className="w-full shadow-none">
        <dl className="grid gap-3">
          <dt className="text-grey-500 text-sm leading-normal font-normal">
            Income
          </dt>
          <dd className="text-grey-900 text-3xl leading-tight font-bold">
            {currencyFormatter.format(income)}
          </dd>
        </dl>
      </Card>

      <Card padding="md" className="w-full shadow-none">
        <dl className="grid gap-3">
          <dt className="text-grey-500 text-sm leading-normal font-normal">
            Expenses
          </dt>
          <dd className="text-grey-900 text-3xl leading-tight font-bold">
            {currencyFormatter.format(expense)}
          </dd>
        </dl>
      </Card>
    </div>
  )
}
