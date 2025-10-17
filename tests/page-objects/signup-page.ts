import { expect, type Page, type Locator } from "@playwright/test"

export class SignUpPage {
  readonly page: Page
  readonly heading: Locator
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly signUpButton: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole("heading", { name: "Sign Up", level: 1 })
    this.nameInput = page.getByRole("textbox", { name: "Name" })
    this.emailInput = page.getByRole("textbox", { name: "Email" })
    this.passwordInput = page.getByRole("textbox", { name: "Create Password" })
    this.signUpButton = page.getByRole("button", { name: "Create Account" })
  }

  async goto() {
    await this.page.goto("/signup")
  }

  async signUp({
    name = "",
    email = "",
    password = "",
  }: {
    name?: string
    email?: string
    password?: string
  }) {
    await this.nameInput.fill(name)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.signUpButton.click()
  }

  async expectErrorMessage(text: string) {
    await expect(this.page.getByText(text)).toBeVisible()
  }
}
