import * as z from "zod"

export const transactionCreateSchema = z.object({
  counterparty: z
    .string()
    .trim()
    .min(1, "Counterparty name cannot be empty.")
    .max(30, "Counterparty name should be max 30 characters."),
  amount: z
    .number("Amount cannot be empty.")
    .nonnegative("Amount cannot be negative."),
  categoryId: z.cuid("Please select a category."),
  transactionType: z.enum(
    ["INCOME", "EXPENSE"],
    "Please pick a transaction type."
  ),
  isRecurring: z.boolean(),
})
export type TransactionCreate = z.infer<typeof transactionCreateSchema>
