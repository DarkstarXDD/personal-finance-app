import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import { getTransactionTotals } from "@/data-access/transactions"
import { currencyFormatter } from "@/lib/utils"

export default async function SummaryCards() {
  const { currentBalance, income, expense } = await getTransactionTotals()

  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-6">
      <Card padding="md" theme="dark" className="grid w-full gap-3 shadow-none">
        <Heading as="h2" variant="tertiary" className="text-white">
          Current Balance
        </Heading>
        <p className="text-3xl leading-tight font-bold text-white">
          {currencyFormatter.format(currentBalance)}
        </p>
      </Card>

      <Card padding="md" className="grid w-full gap-3 shadow-none">
        <Heading as="h2" variant="tertiary">
          Income
        </Heading>
        <p className="text-grey-900 text-3xl leading-tight font-bold">
          {currencyFormatter.format(income)}
        </p>
      </Card>

      <Card padding="md" className="grid w-full gap-3 shadow-none">
        <Heading as="h2" variant="tertiary">
          Expenses
        </Heading>
        <p className="text-grey-900 text-3xl leading-tight font-bold">
          {currencyFormatter.format(expense)}
        </p>
      </Card>
    </div>
  )
}
