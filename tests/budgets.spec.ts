import { prisma } from "@/lib/prisma"
import { currencyFormatter } from "@/lib/utils"

import { test, expect } from "./fixtures/fixtures"

test.describe("Budgets Page", () => {
  test("renders empty state", async ({ budgetsPage }) => {
    await expect(budgetsPage.heading).toBeVisible()
    await expect(budgetsPage.emptyState).toBeVisible()
    await expect(budgetsPage.addBudgetButton).toBeVisible()
  })

  test("shows form errors on empty submit", async ({ budgetsPage }) => {
    await budgetsPage.addBudgetButton.click()
    await expect(budgetsPage.dialogHeading).toBeVisible()
    await budgetsPage.maxSpendInput.fill("")
    await budgetsPage.addBudgetSubmit.click()

    await budgetsPage.expectErrorMessage("Please select a category.")
    await budgetsPage.expectErrorMessage("Maximum spend cannot be empty.")
    await budgetsPage.expectErrorMessage("Please select a color.")
  })

  test("can create a budget", async ({ budgetsPage }) => {
    const categories = await prisma.category.findMany()
    const colors = await prisma.color.findMany()
    const categoryLabel = categories[0].label
    const colorLabel = colors[0].label
    const budgetAmount = 100

    await budgetsPage.addBudgetButton.click()
    await expect(budgetsPage.dialogHeading).toBeVisible()
    await budgetsPage.selectCategory(categoryLabel)
    await budgetsPage.maxSpendInput.fill(budgetAmount.toString())
    await budgetsPage.selectTheme(colorLabel)
    await budgetsPage.addBudgetSubmit.click()

    await expect(budgetsPage.budgetHeading(categoryLabel)).toBeVisible()
    await expect(budgetsPage.budgetMaxAmount(categoryLabel)).toContainText(
      currencyFormatter.format(budgetAmount)
    )
  })

  test("can edit a budget", async ({ userSession, budgetsPage }) => {
    const categories = await prisma.category.findMany()
    const colors = await prisma.color.findMany()
    const [primaryColor, secondaryColor] = colors
    const [primaryCategory, secondaryCategory] = categories
    const updatedMaxSpend = 200

    await prisma.budget.create({
      data: {
        userId: userSession.userId,
        categoryId: primaryCategory.id,
        maximumSpend: 100,
        colorId: primaryColor.id,
      },
    })

    await budgetsPage.page.reload()
    await budgetsPage.budgetOptionsButton(primaryCategory.label).click()
    await budgetsPage.editMenuItem.click()
    await budgetsPage.selectCategory(secondaryCategory.label)
    await budgetsPage.maxSpendInput.fill(updatedMaxSpend.toString())
    await budgetsPage.selectTheme(secondaryColor.label)
    await budgetsPage.editDialogSaveButton.click()

    await expect(
      budgetsPage.budgetHeading(secondaryCategory.label)
    ).toBeVisible()
    await expect(
      budgetsPage.budgetMaxAmount(secondaryCategory.label)
    ).toContainText(currencyFormatter.format(updatedMaxSpend))
  })

  test("can delete a budget", async ({ userSession, budgetsPage }) => {
    const categories = await prisma.category.findMany()
    const colors = await prisma.color.findMany()
    const category = categories[0]
    const color = colors[0]

    await prisma.budget.create({
      data: {
        userId: userSession.userId,
        categoryId: category.id,
        maximumSpend: 100,
        colorId: color.id,
      },
    })

    await budgetsPage.page.reload()
    await budgetsPage.budgetOptionsButton(category.label).click()
    await budgetsPage.deleteMenuItem.click()
    await budgetsPage.deleteConfirmButton.click()

    await expect(budgetsPage.emptyState).toBeVisible()
  })
})
