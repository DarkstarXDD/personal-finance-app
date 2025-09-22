import { currencyFormatter } from "@/lib/utils"

export default function TransactionAmount({
  transactionAmount,
  transactionType,
}: {
  transactionAmount: string | number
  transactionType?: "INCOME" | "EXPENSE"
}) {
  const amount = currencyFormatter.format(Number(transactionAmount))

  if (transactionType === "INCOME") {
    return (
      <p className="text-green text-sm leading-normal font-bold">
        {`+${amount}`}
      </p>
    )
  }

  if (transactionType === "EXPENSE") {
    return (
      <p className="text-red text-sm leading-normal font-bold">
        {`-${amount}`}
      </p>
    )
  } else {
    return (
      <p className="text-grey-900 text-sm leading-normal font-bold">
        {`${amount}`}
      </p>
    )
  }
}
