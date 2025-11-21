import { type Locator, type Page, expect } from "@playwright/test"

export class PotsPage {
  readonly page: Page
  readonly heading: Locator
  readonly emptyState: Locator

  readonly addPotButton: Locator
  readonly dialogHeading: Locator
  readonly nameInput: Locator
  readonly targetInput: Locator
  readonly themeSelect: Locator
  readonly addPotSubmit: Locator

  readonly addAmountInput: Locator
  readonly withdrawAmountInput: Locator
  readonly addAmountConfirmButton: Locator
  readonly withdrawAmountConfirmButton: Locator

  readonly editMenuItem: Locator
  readonly deleteMenuItem: Locator
  readonly editDialogHeading: Locator
  readonly editDialogSaveButton: Locator
  readonly deleteConfirmButton: Locator

  constructor(page: Page) {
    this.page = page

    this.heading = page.getByRole("heading", { name: "Pots", level: 1 })
    this.emptyState = page.getByRole("heading", {
      name: "No pots created yet",
      level: 2,
    })

    this.addPotButton = page.getByRole("button", {
      name: "Add Pot...",
      exact: true,
    })
    this.dialogHeading = page.getByRole("heading", {
      name: "New Pot",
      level: 2,
    })
    this.nameInput = page.getByRole("textbox", { name: "Pot Name" })
    this.targetInput = page.getByRole("textbox", { name: "Target" })
    this.themeSelect = page.getByRole("button", { name: "Theme" })
    this.addPotSubmit = page.getByRole("button", {
      name: "Add Pot",
      exact: true,
    })

    this.addAmountInput = page.getByRole("textbox", { name: "Amount to Add" })
    this.withdrawAmountInput = page.getByRole("textbox", {
      name: "Amount to Withdraw",
    })
    this.addAmountConfirmButton = page.getByRole("button", {
      name: "Confirm Addition",
    })
    this.withdrawAmountConfirmButton = page.getByRole("button", {
      name: "Confirm Withdrawal",
    })

    this.editMenuItem = page.getByRole("menuitem", { name: "Edit Pot..." })
    this.deleteMenuItem = page.getByRole("menuitem", {
      name: "Delete Pot...",
    })
    this.editDialogHeading = page.getByRole("heading", {
      name: "Edit Pot",
      level: 2,
    })
    this.editDialogSaveButton = page.getByRole("button", {
      name: "Save Changes",
    })
    this.deleteConfirmButton = page.getByRole("button", { name: "Delete" })
  }

  async goto() {
    await this.page.goto("/pots")
  }

  async selectTheme(label: string) {
    await this.themeSelect.click()
    await this.page.getByRole("option", { name: label }).click()
  }

  potCard(potName: string) {
    return this.page.locator("[data-testid='pot-card']", {
      has: this.page.getByRole("heading", { name: potName, level: 2 }),
    })
  }

  potHeading(potName: string) {
    return this.page.getByRole("heading", { name: potName, level: 2 })
  }

  potSavedAmount(potName: string) {
    return this.potCard(potName).getByTestId("pot-saved-amount")
  }

  potTargetAmount(potName: string) {
    return this.potCard(potName).getByTestId("pot-target-amount")
  }

  potOptionsButton(potName: string) {
    return this.potCard(potName).getByRole("button", { name: "Options" })
  }

  addMoneyButton(potName: string) {
    return this.potCard(potName).getByRole("button", { name: "+ Add" })
  }

  withdrawButton(potName: string) {
    return this.potCard(potName).getByRole("button", { name: "- Withdraw" })
  }

  async expectErrorMessage(text: string) {
    await expect(this.page.getByText(text)).toBeVisible()
  }
}
