import { prisma } from "@/lib/prisma"

import { test, expect } from "./fixtures/auth"
import { TransactionsPage } from "./page-objects/transactions-page"

test.describe("Transactions Page", () => {
  test("renders empty state", async ({ page, userSession }) => {
    const transactionPage = new TransactionsPage(page)
    await transactionPage.goto()
    await expect(transactionPage.heading).toBeVisible()
    await expect(transactionPage.emptyState).toBeVisible()
  })

  test("shows form errors on empty submit", async ({ page, userSession }) => {
    const transactionPage = new TransactionsPage(page)
    await transactionPage.goto()
    await transactionPage.dialogTrigger.click()
    await expect(transactionPage.dialogHeading).toBeVisible()
    await transactionPage.addTransactionButton.click()
    await transactionPage.expectErrorMessage("Please pick a transaction type.")
    await transactionPage.expectErrorMessage(
      "Counterparty name cannot be empty."
    )
    await transactionPage.expectErrorMessage("Please select a category.")
  })

  test("recurring option disbaled when income type selected", async ({
    page,
    userSession,
  }) => {
    const transactionPage = new TransactionsPage(page)
    await transactionPage.goto()
    await transactionPage.dialogTrigger.click()
    await expect(transactionPage.dialogHeading).toBeVisible()
    await transactionPage.incomeRadio.click()
    await expect(transactionPage.recurringCheckbox).toBeDisabled()
  })

  test("recurring option enabled when expense type selected", async ({
    page,
    userSession,
  }) => {
    const transactionPage = new TransactionsPage(page)
    await transactionPage.goto()
    await transactionPage.dialogTrigger.click()
    await expect(transactionPage.dialogHeading).toBeVisible()
    await transactionPage.expenseRadio.click()
    await expect(transactionPage.recurringCheckbox).toBeEnabled()
  })

  test("can create a transaction", async ({ page, userSession }) => {
    const transactionPage = new TransactionsPage(page)
    await transactionPage.goto()
    await transactionPage.dialogTrigger.click()
    await expect(transactionPage.dialogHeading).toBeVisible()
    await transactionPage.incomeRadio.click()
    await transactionPage.counterpartyInput.fill("Random name")
    await transactionPage.amountInput.fill("10")
    await transactionPage.categorySelect.click()
    await transactionPage.categoryItem.click()
    await transactionPage.addTransactionButton.click()
    await expect(page.getByRole("cell", { name: "Random name" })).toBeVisible()
    await expect(
      page.getByRole("cell", { name: "+$10.00", exact: true })
    ).toBeVisible()
    await expect(page.getByRole("cell", { name: "Education" })).toBeVisible()
  })

  test("can search a transaction", async ({ page, userSession }) => {
    const categories = await prisma.category.findMany()
    await prisma.transaction.create({
      data: {
        userId: userSession.userId,
        counterparty: "Game store",
        categoryId: categories[0].id,
        amount: 10,
        transactionType: "EXPENSE",
      },
    })

    const transactionPage = new TransactionsPage(page)
    await transactionPage.goto()

    await transactionPage.searchInput.fill("Game")
    await expect(page.getByRole("cell", { name: "Game store" })).toBeVisible()

    await transactionPage.searchInput.fill("random string")
    await transactionPage.searchInput.press("Enter")
    await expect(page.getByText("No results match your filters.")).toBeVisible()
  })

  test("can sort transactions", async ({ page, userSession }) => {
    const categories = await prisma.category.findMany()
    const baseData = {
      userId: userSession.userId,
      transactionType: "EXPENSE" as "EXPENSE" | "INCOME",
      categoryId: categories[1].id,
    }

    await prisma.transaction.create({
      data: { ...baseData, counterparty: "Bravo", amount: 30 },
    })
    await prisma.transaction.create({
      data: { ...baseData, counterparty: "Alpha", amount: 5 },
    })
    await prisma.transaction.create({
      data: { ...baseData, counterparty: "Charlie", amount: 10 },
    })

    const transactionPage = new TransactionsPage(page)
    await transactionPage.goto()
    const rows = page.getByRole("row")

    await transactionPage.sortFilterSelect.click()
    await page.getByRole("option", { name: "A to Z" }).click()
    await expect(rows.nth(1)).toHaveText(/Alpha/)
    await expect(rows.nth(2)).toHaveText(/Bravo/)
    await expect(rows.nth(3)).toHaveText(/Charlie/)

    await transactionPage.sortFilterSelect.click()
    await page.getByRole("option", { name: "Highest" }).click()
    await expect(rows.nth(1)).toHaveText(/Bravo/)
    await expect(rows.nth(2)).toHaveText(/Charlie/)
    await expect(rows.nth(3)).toHaveText(/Alpha/)
  })

  test("can filter by category", async ({ page, userSession }) => {
    const categories = await prisma.category.findMany()
    const baseData = {
      userId: userSession.userId,
      transactionType: "EXPENSE" as "EXPENSE" | "INCOME",
      amount: 30,
    }

    await prisma.transaction.create({
      data: {
        ...baseData,
        counterparty: "Alpha",
        categoryId: categories.find((e) => e.label === "Bills")?.id as string,
      },
    })
    await prisma.transaction.create({
      data: {
        ...baseData,
        counterparty: "Bravo",
        categoryId: categories.find((e) => e.label === "Education")
          ?.id as string,
      },
    })

    const transactionPage = new TransactionsPage(page)
    await transactionPage.goto()
    const rows = page.getByRole("row")

    await transactionPage.categoryFilterSelect.click()
    await page.getByRole("option", { name: "Bills" }).click()
    await expect(rows.nth(1)).toHaveText(/Alpha/)

    await transactionPage.categoryFilterSelect.click()
    await page.getByRole("option", { name: "Education" }).click()
    await expect(rows.nth(1)).toHaveText(/Bravo/)

    await transactionPage.categoryFilterSelect.click()
    await page.getByRole("option", { name: "Travel" }).click()
    await expect(page.getByText("No results match your filters.")).toBeVisible()
  })
})
