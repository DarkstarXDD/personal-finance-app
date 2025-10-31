import { type Transaction } from "@/features/transactions/data-access"
import { cn, currencyFormatter } from "@/lib/utils"

type TransactionAmountProps = {
  amount: Transaction["amount"]
  transactionType?: Transaction["transactionType"]
  className?: string
}

export default function TransactionAmount({
  amount,
  transactionType,
  className,
}: TransactionAmountProps) {
  const formattedAmount = currencyFormatter.format(Number(amount))

  if (transactionType === "INCOME") {
    return (
      <p
        className={cn("text-success-primary text-sm font-semibold", className)}
      >
        {`+${formattedAmount}`}
      </p>
    )
  }

  if (transactionType === "EXPENSE") {
    return (
      <p className={cn("text-error-primary text-sm font-semibold", className)}>
        {`-${formattedAmount}`}
      </p>
    )
  } else {
    return (
      <p className={cn("text-primary text-sm font-semibold", className)}>
        {`${formattedAmount}`}
      </p>
    )
  }
}
