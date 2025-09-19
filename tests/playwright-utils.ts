import { expect, type Page } from "@playwright/test"

export function getOverviewHeading(page: Page) {
  return page.getByRole("heading", { name: "Overview", level: 1 })
}

export function getLoginHeading(page: Page) {
  return page.getByRole("heading", { name: "Login", level: 1 })
}

export function getSignupHeading(page: Page) {
  return page.getByRole("heading", { name: "Sign Up", level: 1 })
}

export async function login(page: Page) {
  await page.goto("/login")

  await page.getByRole("textbox", { name: "Email" }).fill("test@email.com")
  await page.getByRole("textbox", { name: "Password" }).fill("Test1234")

  await page.getByRole("button", { name: "Login" }).click()
  await expect(getOverviewHeading(page)).toBeVisible()
}
