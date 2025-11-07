import Card from "@/components/ui/Card"
import { getTransactionTotals } from "@/features/transactions/data-access"
import { currencyFormatter } from "@/lib/utils"

export default async function SummaryCards() {
  const { currentBalance, income, expense } = await getTransactionTotals()

  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-6">
      <Card size="sm" className="grid w-full gap-1">
        <h2 className="text-sm font-medium">Current Balance</h2>
        <p className="text-primary text-2xl font-semibold">
          {currencyFormatter.format(currentBalance)}
        </p>
      </Card>

      <Card size="sm" className="grid w-full gap-1">
        <h2 className="text-sm font-medium">Income</h2>
        <p className="text-primary text-2xl font-semibold">
          {currencyFormatter.format(income)}
        </p>
      </Card>

      <Card size="sm" className="grid w-full gap-1">
        <h2 className="text-sm font-medium">Expenses</h2>
        <p className="text-primary text-2xl font-semibold">
          {currencyFormatter.format(expense)}
        </p>
      </Card>
    </div>
  )
}
