import { test, expect } from "@playwright/test"

test("login", async ({ page }) => {
  await page.goto("http://localhost:3000/")

  await expect(
    page.getByRole("heading", { name: "Login", level: 1 })
  ).toBeVisible()

  await page.getByRole("textbox", { name: "Email" }).fill("peter@email.com")

  await page.getByRole("textbox", { name: "Password" }).fill("Peter1234")

  await page.getByRole("button", { name: "Login" }).click()

  // await expect(
  //   page.getByText("Something went wrong. Please try again.")
  // ).toBeVisible()

  await expect(
    page.getByText(
      "No account found with this email address. Please check the email entered or sign up for a new account."
    )
  ).toBeVisible()

  // await expect(
  //   page.getByRole("heading", { name: "Overview", level: 1 })
  // ).toBeVisible()
})
