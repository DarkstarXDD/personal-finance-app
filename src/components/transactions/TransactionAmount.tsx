import { tv } from "tailwind-variants"

import { currencyFormatter } from "@/lib/utils"

export default function TransactionAmount({
  transactionAmount,
  transactionType,
  className,
}: {
  transactionAmount: string | number
  transactionType?: "INCOME" | "EXPENSE"
  className?: string
}) {
  const transactionAmountStyles = tv({
    base: "text-grey-900 text-sm leading-normal font-bold",
    variants: {
      transactionType: {
        INCOME: "text-green",
        EXPENSE: "text-red",
      },
    },
  })

  const amount = currencyFormatter.format(Number(transactionAmount))

  if (transactionType === "INCOME") {
    return (
      <p className={transactionAmountStyles({ transactionType, className })}>
        {`+${amount}`}
      </p>
    )
  }

  if (transactionType === "EXPENSE") {
    return (
      <p className={transactionAmountStyles({ transactionType, className })}>
        {`-${amount}`}
      </p>
    )
  } else {
    return (
      <p className={transactionAmountStyles({ className })}>{`${amount}`}</p>
    )
  }
}
