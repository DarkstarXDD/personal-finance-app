import { expect, type Page, type Locator } from "@playwright/test"

export class LoginPage {
  readonly page: Page
  readonly heading: Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole("heading", { name: "Log In", level: 1 })
    this.emailInput = page.getByRole("textbox", { name: "Email" })
    this.passwordInput = page.getByRole("textbox", { name: "Password" })
    this.loginButton = page.getByRole("button", { name: "Log In" })
  }

  async goto() {
    await this.page.goto("/login")
  }

  async login({ email, password }: { email: string; password: string }) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  async expectErrorMessage(text: string) {
    await expect(this.page.getByText(text)).toBeVisible()
  }
}
