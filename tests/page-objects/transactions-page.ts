import { type Page, type Locator, expect } from "@playwright/test"

export class TransactionsPage {
  readonly page: Page
  readonly heading: Locator
  readonly emptyState: Locator

  readonly searchInput: Locator
  readonly sortFilterSelect: Locator
  readonly categoryFilterSelect: Locator

  readonly dialogTrigger: Locator
  readonly dialogHeading: Locator
  readonly incomeRadio: Locator
  readonly expenseRadio: Locator
  readonly counterpartyInput: Locator
  readonly amountInput: Locator
  readonly categorySelect: Locator
  readonly categoryItem: Locator
  readonly recurringCheckbox: Locator
  readonly addTransactionButton: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole("heading", { name: "Transactions", level: 1 })
    this.emptyState = page.getByRole("heading", {
      name: "No transactions",
      level: 3,
    })

    this.searchInput = page.getByRole("searchbox", {
      name: "Search Transactions",
    })
    this.sortFilterSelect = page.getByRole("button", { name: "Sort by" })
    this.categoryFilterSelect = page.getByRole("button", { name: "Category" })

    this.dialogTrigger = page.getByRole("button", { name: "Add Transaction" })
    this.dialogHeading = page.getByRole("heading", {
      name: "New Transaction",
      level: 2,
    })
    this.incomeRadio = page.getByTestId("income-radio")
    this.expenseRadio = page.getByTestId("expense-radio")
    this.counterpartyInput = page.getByRole("textbox", { name: "Counterparty" })
    this.amountInput = page.getByRole("textbox", { name: "Transaction Amount" })
    this.categorySelect = page.getByRole("button", { name: "Select a Categor" })
    this.categoryItem = page.getByRole("option", { name: "Education" })
    this.recurringCheckbox = page.locator('[name="isRecurring"]')
    this.addTransactionButton = page.getByRole("button", {
      name: "Add Transaction",
    })
  }

  async goto() {
    await this.page.goto("/transactions")
  }

  async expectErrorMessage(text: string) {
    await expect(this.page.getByText(text)).toBeVisible()
  }
}
