import { cn, currencyFormatter } from "@/lib/utils"

type TransactionAmountProps = {
  transactionAmount: string | number
  transactionType?: "INCOME" | "EXPENSE"
  className?: string
}

export default function TransactionAmount({
  transactionAmount,
  transactionType,
  className,
}: TransactionAmountProps) {
  const amount = currencyFormatter.format(Number(transactionAmount))

  if (transactionType === "INCOME") {
    return (
      <p
        className={cn("text-success-primary text-sm font-semibold", className)}
      >
        {`+${amount}`}
      </p>
    )
  }

  if (transactionType === "EXPENSE") {
    return (
      <p className={cn("text-error-primary text-sm font-semibold", className)}>
        {`-${amount}`}
      </p>
    )
  } else {
    return (
      <p className={cn("text-primary text-sm font-semibold", className)}>
        {`${amount}`}
      </p>
    )
  }
}
