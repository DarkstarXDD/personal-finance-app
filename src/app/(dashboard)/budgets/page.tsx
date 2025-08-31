import AddBudgetDialog from "@/components/budgets/AddBudgetDialog"
import BudgetCard from "@/components/budgets/BudgetCard"
import Heading from "@/components/ui/Heading"
import { getBudgets } from "@/data-access/budgets"
import { getCategories, getColors } from "@/data-access/lookups"

export default async function RecurringBillsPage() {
  const categories = await getCategories()
  const colors = await getColors()
  const budgets = await getBudgets()

  return (
    <main className="grid gap-8">
      <div className="flex items-center justify-between">
        <Heading as="h1" variant="primary">
          Budgets
        </Heading>
        <AddBudgetDialog categories={categories} colors={colors} />
      </div>

      {budgets.map((budget) => (
        <BudgetCard
          key={budget.id}
          budget={budget}
          categories={categories}
          colors={colors}
        />
      ))}
    </main>
  )
}
