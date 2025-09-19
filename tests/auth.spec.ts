import { test, expect } from "@playwright/test"

test.describe("Signup Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signup")
  })

  test("renders all required elements", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Sign Up", level: 1 })
    ).toBeVisible()
    await expect(page.getByLabel("Name")).toBeVisible()
    await expect(page.getByLabel("Email")).toBeVisible()
    await expect(page.getByLabel("Create Password")).toBeVisible()
    await expect(
      page.getByRole("button", { name: "Create Account" })
    ).toBeVisible()
  })

  test("shows required validation when empty submit", async ({ page }) => {
    await page.getByRole("button", { name: "Create Account" }).click()

    await expect(page.getByRole("textbox", { name: "Name" })).toBeFocused()

    await expect(page.getByText("Name cannot be empty.")).toBeVisible()
    await expect(page.getByText("Invalid email format.")).toBeVisible()
    await expect(
      page.getByText("Password must be at least 8 characters.")
    ).toBeVisible()
  })

  test("rejects whitespace only name", async ({ page }) => {
    await page.getByRole("textbox", { name: "Name" }).fill("   ")

    await page.getByRole("button", { name: "Create Account" }).click()

    await expect(page.getByText("Name cannot be empty.")).toBeVisible()
  })

  test("rejects invalid email", async ({ page }) => {
    await page.getByRole("textbox", { name: "Email" }).fill("test@")

    await page.getByRole("button", { name: "Create Account" }).click()

    await expect(page.getByText("Invalid email format.")).toBeVisible()
  })

  test("rejects weak password", async ({ page }) => {
    await page.getByRole("textbox", { name: "Create Password" }).fill("test123")

    await page.getByRole("button", { name: "Create Account" }).click()

    await expect(
      page.getByText("Password must be at least 8 characters.")
    ).toBeVisible()
  })

  test("accepts valid inputs and submits", async ({ page }) => {
    await page.getByRole("textbox", { name: "Name" }).fill("Test User")
    await page.getByRole("textbox", { name: "Email" }).fill("test@email.com")
    await page
      .getByRole("textbox", { name: "Create Password" })
      .fill("Test1234")

    await page.getByRole("button", { name: "Create Account" }).click()

    await expect(
      page.getByRole("heading", { name: "Overview", level: 1 })
    ).toBeVisible()
  })
})
