import { type Page, type Locator, expect } from "@playwright/test"

export class BudgetsPage {
  readonly page: Page
  readonly heading: Locator
  readonly emptyState: Locator

  readonly addBudgetButton: Locator
  readonly dialogHeading: Locator
  readonly categorySelect: Locator
  readonly maxSpendInput: Locator
  readonly themeSelect: Locator
  readonly addBudgetSubmit: Locator

  readonly editMenuItem: Locator
  readonly deleteMenuItem: Locator
  readonly editDialogHeading: Locator
  readonly editDialogSaveButton: Locator
  readonly deleteConfirmButton: Locator

  constructor(page: Page) {
    this.page = page

    this.heading = page.getByRole("heading", { name: "Budgets", level: 1 })
    this.emptyState = page.getByRole("heading", {
      name: "No budgets created yet",
      level: 2,
    })

    this.addBudgetButton = page.getByRole("button", {
      name: "Add Budget...",
      exact: true,
    })
    this.dialogHeading = page.getByRole("heading", {
      name: "New Budget",
      level: 2,
    })
    this.categorySelect = page.getByRole("button", {
      name: "Budget Category",
    })
    this.maxSpendInput = page.getByRole("textbox", { name: "Maximum Spend" })
    this.themeSelect = page.getByRole("button", { name: "Theme" })
    this.addBudgetSubmit = page.getByRole("button", {
      name: "Add Budget",
      exact: true,
    })

    this.editMenuItem = page.getByRole("menuitem", { name: "Edit Budget..." })
    this.deleteMenuItem = page.getByRole("menuitem", {
      name: "Delete Budget...",
    })
    this.editDialogHeading = page.getByRole("heading", {
      name: "Edit Budget",
      level: 2,
    })
    this.editDialogSaveButton = page.getByRole("button", {
      name: "Save Changes",
    })

    this.deleteConfirmButton = page.getByRole("button", { name: "Delete" })
  }

  async goto() {
    await this.page.goto("/budgets")
  }

  async selectCategory(categoryLabel: string) {
    await this.categorySelect.click()
    await this.page.getByRole("option", { name: categoryLabel }).click()
  }

  async selectTheme(label: string) {
    await this.themeSelect.click()
    await this.page.getByRole("option", { name: label }).click()
  }

  budgetCard(budgetName: string) {
    return this.page.locator("[data-testid='budget-card']", {
      has: this.page.getByRole("heading", { name: budgetName, level: 2 }),
    })
  }

  budgetHeading(budgetName: string) {
    return this.page.getByRole("heading", { name: budgetName, level: 2 })
  }

  budgetCurrentAmount(budgetName: string) {
    return this.budgetCard(budgetName).getByTestId("budget-current-amount")
  }

  budgetMaxAmount(budgetName: string) {
    return this.budgetCard(budgetName).getByTestId("budget-max-amount")
  }

  budgetOptionsButton(budgetName: string) {
    return this.budgetCard(budgetName).getByRole("button", { name: "Options" })
  }

  async expectErrorMessage(text: string) {
    await expect(this.page.getByText(text)).toBeVisible()
  }
}
