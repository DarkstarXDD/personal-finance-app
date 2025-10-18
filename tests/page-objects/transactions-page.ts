import { type Page, type Locator, expect } from "@playwright/test"

export class TransactionsPage {
  readonly page: Page
  readonly heading: Locator
  readonly emptyState: Locator

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
  readonly nameCell: Locator
  readonly categoryCell: Locator
  readonly amountCell: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole("heading", { name: "Transactions", level: 1 })
    this.emptyState = page.getByRole("heading", {
      name: "No transactions",
      level: 3,
    })

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
    this.categoryItem = page.getByRole("option", { name: "Transportation" })
    this.recurringCheckbox = page.locator('[name="isRecurring"]')
    this.addTransactionButton = page.getByRole("button", {
      name: "Add Transaction",
    })

    this.nameCell = page.getByRole("cell", { name: "Random name" })
    this.categoryCell = page.getByRole("cell", { name: "Transportation" })
    this.amountCell = page.getByRole("cell", { name: "10" })
  }

  async goto() {
    await this.page.goto("/transactions")
  }

  async expectErrorMessage(text: string) {
    await expect(this.page.getByText(text)).toBeVisible()
  }
}

// Seed and see whether transactions appear
// Check pagination
// Check Search, Sort and Filter
