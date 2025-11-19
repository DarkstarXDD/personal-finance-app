import * as z from "zod"

import { transactionCreateSchema } from "@/features/transactions/schemas"

export const recurringBillCreateSchema = transactionCreateSchema.pick({
  amount: true,
  counterparty: true,
})
export type RecurringBillCreate = z.infer<typeof recurringBillCreateSchema>
