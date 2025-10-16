import { test, expect } from "./fixtures/login-fixture"

import {} from // getLoginHeading,
// getOverviewHeading,
// getSignupHeading,
// login,
"./playwright-utils"

// ============================================
// ================= Signup Page ==============
// ============================================

// test.describe("Signup Page", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("/signup")
//   })

//   test("renders all required elements", async ({ page }) => {
//     await expect(getSignupHeading(page)).toBeVisible()
//     await expect(page.getByLabel("Name")).toBeVisible()
//     await expect(page.getByLabel("Email")).toBeVisible()
//     await expect(page.getByLabel("Create Password")).toBeVisible()
//     await expect(
//       page.getByRole("button", { name: "Create Account" })
//     ).toBeVisible()
//   })

//   test("shows required validation when empty submit", async ({ page }) => {
//     await page.getByRole("button", { name: "Create Account" }).click()

//     await expect(page.getByRole("textbox", { name: "Name" })).toBeFocused()

//     await expect(page.getByText("Name cannot be empty.")).toBeVisible()
//     await expect(page.getByText("Invalid email format.")).toBeVisible()
//     await expect(
//       page.getByText("Password must be at least 8 characters.")
//     ).toBeVisible()
//   })

//   test("rejects whitespace only name", async ({ page }) => {
//     await page.getByRole("textbox", { name: "Name" }).fill("   ")

//     await page.getByRole("button", { name: "Create Account" }).click()

//     await expect(page.getByText("Name cannot be empty.")).toBeVisible()
//   })

//   test("rejects invalid email", async ({ page }) => {
//     await page.getByRole("textbox", { name: "Email" }).fill("test@")

//     await page.getByRole("button", { name: "Create Account" }).click()

//     await expect(page.getByText("Invalid email format.")).toBeVisible()
//   })

//   test("rejects weak password", async ({ page }) => {
//     await page.getByRole("textbox", { name: "Create Password" }).fill("test123")

//     await page.getByRole("button", { name: "Create Account" }).click()

//     await expect(
//       page.getByText("Password must be at least 8 characters.")
//     ).toBeVisible()
//   })

//   test("cannot signup with an existing email", async ({ page }) => {
//     await page.getByRole("textbox", { name: "Name" }).fill("Test User")
//     await page.getByRole("textbox", { name: "Email" }).fill("test@email.com")
//     await page
//       .getByRole("textbox", { name: "Create Password" })
//       .fill("Test1234")

//     await page.getByRole("button", { name: "Create Account" }).click()

//     await expect(
//       page.getByText(
//         "An account with this email already exists. Please sign in instead or use a different email address."
//       )
//     ).toBeVisible()
//   })

//   test("accepts valid inputs and creates account", async ({ page }) => {
//     await page.getByRole("textbox", { name: "Name" }).fill("Test User")
//     await page.getByRole("textbox", { name: "Email" }).fill("test@example.com")
//     await page
//       .getByRole("textbox", { name: "Create Password" })
//       .fill("Test1234")

//     await page.getByRole("button", { name: "Create Account" }).click()

//     await expect(getOverviewHeading(page)).toBeVisible()
//   })
// })

// ============================================
// ================= Login Page ===============
// ============================================

test.describe("Login Page", () => {
  test("renders all required elements", async ({ loginPage }) => {
    await expect(loginPage.heading).toBeVisible()
    await expect(loginPage.emailInput).toBeVisible()
    await expect(loginPage.passwordInput).toBeVisible()
    await expect(loginPage.loginButton).toBeVisible()
  })

  test("shows error for empty submit", async ({ loginPage }) => {
    await loginPage.loginButton.click()
    await expect(loginPage.emailInput).toBeFocused()
    await loginPage.expectErrorMessage("Invalid email format.")
    await loginPage.expectErrorMessage("Password cannot be empty.")
  })

  test("shows error for unknown email", async ({ loginPage }) => {
    await loginPage.emailInput.fill("unknownemail@example.com")
    await loginPage.passwordInput.fill("Test1234")
    await loginPage.loginButton.click()
    await loginPage.expectErrorMessage(
      "No account found with this email address. Please check the email entered or sign up for a new account."
    )
  })

  test("shows error for incorrect password", async ({ loginPage }) => {
    await loginPage.emailInput.fill("test@email.com")
    await loginPage.passwordInput.fill("wrong_password")
    await loginPage.loginButton.click()
    await loginPage.expectErrorMessage("Incorrect password. Please try again.")
  })

  test("can log in with correct credentials", async ({ loginPage }) => {
    await loginPage.login({ email: "test@email.com", password: "Test1234" })
  })
})

// ============================================
// ================= Redirects ================
// ============================================

// test.describe("Redirects", () => {
//   test("visiting auth pages while logged in redirects to home", async ({
//     page,
//   }) => {
//     await login(page)

//     // after logged in, try to visit /login, but should be redirected back to home
//     await page.goto("/login")
//     await expect(getOverviewHeading(page)).toBeVisible()

//     // same for /signup as well
//     await page.goto("/signup")
//     await expect(getOverviewHeading(page)).toBeVisible()
//   })

//   test("redirects unauthorized users to login", async ({ page }) => {
//     await page.goto("/")
//     await expect(getLoginHeading(page)).toBeVisible()

//     await page.goto("/transactions")
//     await expect(getLoginHeading(page)).toBeVisible()
//   })
// })
