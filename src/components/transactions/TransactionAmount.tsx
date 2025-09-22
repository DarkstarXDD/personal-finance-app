import { currencyFormatter, cn } from "@/lib/utils"

export default function TransactionAmount({
  transactionAmount,
  transactionType,
  className,
}: {
  transactionAmount: string | number
  transactionType?: "INCOME" | "EXPENSE"
  className?: string
}) {
  const amount = currencyFormatter.format(Number(transactionAmount))

  if (transactionType === "INCOME") {
    return (
      <p
        className={cn("text-green text-sm leading-normal font-bold", className)}
      >
        {`+${amount}`}
      </p>
    )
  }

  if (transactionType === "EXPENSE") {
    return (
      <p className={cn("text-red text-sm leading-normal font-bold", className)}>
        {`-${amount}`}
      </p>
    )
  } else {
    return (
      <p
        className={cn(
          "text-grey-900 text-sm leading-normal font-bold",
          className
        )}
      >
        {`${amount}`}
      </p>
    )
  }
}
