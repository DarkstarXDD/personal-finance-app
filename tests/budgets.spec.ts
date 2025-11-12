import { test, expect } from "./fixtures/auth"
import { BudgetsPage } from "./page-objects/budgets-page"

test.describe("Budgets Page", () => {
  test("renders empty state", async ({ page, userSession }) => {
    const budgetsPage = new BudgetsPage(page)
    await budgetsPage.goto()
    await expect(budgetsPage.heading).toBeVisible()
    await expect(budgetsPage.emptyState).toBeVisible()
  })

  test("shows form errors on empty submit", async ({ page, userSession }) => {
    const budgetsPage = new BudgetsPage(page)
    await budgetsPage.goto()
    await budgetsPage.dialogTrigger.click()
    await expect(budgetsPage.dialogHeading).toBeVisible()
    await budgetsPage.addBudgetButton.click()
    await budgetsPage.expectErrorMessage("Please select a category.")
    await budgetsPage.expectErrorMessage("Please select a color.")
  })

  test("can create a budget", async ({ page, userSession }) => {
    const budgetsPage = new BudgetsPage(page)
    await budgetsPage.goto()

    await budgetsPage.dialogTrigger.click()
    await expect(budgetsPage.dialogHeading).toBeVisible()
    await budgetsPage.categorySelect.click()
    await budgetsPage.categoryItem.click()
    await budgetsPage.amountInput.fill("100")
    await budgetsPage.themeSelect.click()
    await budgetsPage.themeItem.click()
    await budgetsPage.addBudgetButton.click()

    await expect(budgetsPage.budgetCardHeading).toBeVisible()
  })
})
