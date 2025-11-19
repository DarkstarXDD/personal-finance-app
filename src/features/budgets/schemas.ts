import * as z from "zod"

export const budgetCreateSchema = z.object({
  categoryId: z.cuid("Please select a category."),
  maximumSpend: z
    .number("Maximum spend cannot be empty.")
    .nonnegative("Maximum spend cannot be negative."),
  colorId: z.cuid("Please select a color."),
})
export type BudgetCreate = z.infer<typeof budgetCreateSchema>

export const budgetUpdateSchema = budgetCreateSchema.extend({
  id: z.cuid(),
})
export type BudgetUpdate = z.infer<typeof budgetUpdateSchema>
