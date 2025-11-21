import { prisma } from "@/lib/prisma"

import { test, expect } from "./fixtures/fixtures"

test.describe("Transactions Page", () => {
  test("renders empty state", async ({ transactionsPage }) => {
    await expect(transactionsPage.heading).toBeVisible()
    await expect(transactionsPage.emptyState).toBeVisible()
  })

  test("shows form errors on empty submit", async ({ transactionsPage }) => {
    await transactionsPage.dialogTrigger.click()
    await expect(transactionsPage.dialogHeading).toBeVisible()
    await transactionsPage.addTransactionButton.click()
    await transactionsPage.expectErrorMessage("Please pick a transaction type.")
    await transactionsPage.expectErrorMessage(
      "Counterparty name cannot be empty."
    )
    await transactionsPage.expectErrorMessage("Please select a category.")
  })

  test("recurring option disbaled when income type selected", async ({
    transactionsPage,
  }) => {
    await transactionsPage.dialogTrigger.click()
    await expect(transactionsPage.dialogHeading).toBeVisible()
    await transactionsPage.incomeRadio.click()
    await expect(transactionsPage.recurringCheckbox).toBeDisabled()
  })

  test("recurring option enabled when expense type selected", async ({
    transactionsPage,
  }) => {
    await transactionsPage.dialogTrigger.click()
    await expect(transactionsPage.dialogHeading).toBeVisible()
    await transactionsPage.expenseRadio.click()
    await expect(transactionsPage.recurringCheckbox).toBeEnabled()
  })

  test("can create a transaction", async ({ page, transactionsPage }) => {
    await transactionsPage.dialogTrigger.click()
    await expect(transactionsPage.dialogHeading).toBeVisible()
    await transactionsPage.incomeRadio.click()
    await transactionsPage.counterpartyInput.fill("Random name")
    await transactionsPage.amountInput.fill("10")
    await transactionsPage.categorySelect.click()
    await transactionsPage.categoryItem.click()
    await transactionsPage.addTransactionButton.click()
    await expect(page.getByRole("cell", { name: "Random name" })).toBeVisible()
    await expect(
      page.getByRole("cell", { name: "+$10.00", exact: true })
    ).toBeVisible()
    await expect(page.getByRole("cell", { name: "Education" })).toBeVisible()
  })

  test("can search a transaction", async ({
    page,
    userSession,
    transactionsPage,
  }) => {
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

    await transactionsPage.searchInput.fill("Game")
    await expect(page.getByRole("cell", { name: "Game store" })).toBeVisible()

    await transactionsPage.searchInput.fill("random string")
    await transactionsPage.searchInput.press("Enter")
    await expect(page.getByText("No results match your filters.")).toBeVisible()
  })

  test("can sort transactions", async ({
    page,
    userSession,
    transactionsPage,
  }) => {
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

    const rows = page.getByRole("row")

    await transactionsPage.sortFilterSelect.click()
    await page.getByRole("option", { name: "A to Z" }).click()
    await expect(rows.nth(1)).toHaveText(/Alpha/)
    await expect(rows.nth(2)).toHaveText(/Bravo/)
    await expect(rows.nth(3)).toHaveText(/Charlie/)

    await transactionsPage.sortFilterSelect.click()
    await page.getByRole("option", { name: "Highest" }).click()
    await expect(rows.nth(1)).toHaveText(/Bravo/)
    await expect(rows.nth(2)).toHaveText(/Charlie/)
    await expect(rows.nth(3)).toHaveText(/Alpha/)
  })

  test("can filter by category", async ({
    page,
    userSession,
    transactionsPage,
  }) => {
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

    const rows = page.getByRole("row")

    await transactionsPage.categoryFilterSelect.click()
    await page.getByRole("option", { name: "Bills" }).click()
    await expect(rows.nth(1)).toHaveText(/Alpha/)

    await transactionsPage.categoryFilterSelect.click()
    await page.getByRole("option", { name: "Education" }).click()
    await expect(rows.nth(1)).toHaveText(/Bravo/)

    await transactionsPage.categoryFilterSelect.click()
    await page.getByRole("option", { name: "Travel" }).click()
    await expect(page.getByText("No results match your filters.")).toBeVisible()
  })
})
