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
    await expect(transactionPage.nameCell).toBeVisible()
    await expect(transactionPage.categoryCell).toBeVisible()
    await expect(transactionPage.amountCell).toBeVisible()
  })
})
