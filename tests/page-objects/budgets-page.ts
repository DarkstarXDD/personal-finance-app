import { type Page, type Locator, expect } from "@playwright/test"

export class BudgetsPage {
  readonly page: Page
  readonly heading: Locator
  readonly emptyState: Locator

  readonly dialogTrigger: Locator
  readonly dialogHeading: Locator

  readonly categorySelect: Locator
  readonly categoryItem: Locator
  readonly amountInput: Locator
  readonly themeSelect: Locator
  readonly themeItem: Locator
  readonly addBudgetButton: Locator

  readonly budgetCardHeading: Locator
  readonly budgetCardMaximumAmount: Locator
  readonly optionsButton: Locator
  readonly editMenuItem: Locator
  readonly saveChangesButton: Locator
  readonly deleteMenuItem: Locator
  readonly confirmDeleteButton: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole("heading", { name: "Budgets", level: 1 })
    this.emptyState = page.getByRole("heading", {
      name: "No budgets created yet",
      level: 2,
    })

    this.dialogTrigger = page.getByRole("button", {
      name: "Add Budget...",
      exact: true,
    })
    this.dialogHeading = page.getByRole("heading", {
      name: "New Budget",
      level: 2,
    })

    this.categorySelect = page.getByRole("button", {
      name: "Select a Category...",
    })
    this.categoryItem = page.getByRole("option", { name: "Bills" })

    this.amountInput = page.getByRole("textbox", { name: "Maximum Spend" })

    this.themeSelect = page.getByRole("button", { name: "Select a Color..." })
    this.themeItem = page.getByRole("option", { name: "Brown" })

    this.addBudgetButton = page.getByRole("button", {
      name: "Add Budget",
      exact: true,
    })

    this.budgetCardHeading = page.getByRole("heading", {
      name: "Bills",
      level: 2,
    })
    this.budgetCardMaximumAmount = page.getByTestId("maximum-amount")

    this.optionsButton = page.getByRole("button", {
      name: "Options",
      exact: true,
    })
    this.editMenuItem = page.getByRole("menuitem", { name: "Edit Budget..." })
    this.saveChangesButton = page.getByRole("button", { name: "Save Changes" })

    this.deleteMenuItem = page.getByRole("menuitem", {
      name: "Delete Budget...",
    })
    this.confirmDeleteButton = page.getByRole("button", { name: "Delete" })
  }

  async goto() {
    await this.page.goto("/budgets")
  }

  async expectErrorMessage(text: string) {
    await expect(this.page.getByText(text)).toBeVisible()
  }
}
