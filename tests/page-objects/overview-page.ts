import { type Page, type Locator } from "@playwright/test"

export class OverviewPage {
  readonly page: Page
  readonly heading: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole("heading", { name: "Overview", level: 1 })
  }

  async goto() {
    await this.page.goto("/overview")
  }
}
