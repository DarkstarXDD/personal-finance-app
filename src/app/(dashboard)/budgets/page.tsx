import AddBudgetDialog from "@/components/budgets/AddBudgetDialog"
import BudgetCard from "@/components/budgets/BudgetCard"
import Heading from "@/components/ui/Heading"
import { getCategories, getColors } from "@/data-access/lookups"

export default async function RecurringBillsPage() {
  const categories = await getCategories()
  const colors = await getColors()

  return (
    <main className="grid gap-8">
      <div className="flex items-center justify-between">
        <Heading as="h1" variant="primary">
          Budgets
        </Heading>
        <AddBudgetDialog categories={categories} colors={colors} />
      </div>
      <BudgetCard />
    </main>
  )
}
