import { test, expect } from "./fixtures/login-fixture"

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
    await loginPage.login({ email: "no@example.com", password: "Test1234" })
    await loginPage.expectErrorMessage(
      "No account found with this email address. Please check the email entered or sign up for a new account."
    )
  })

  test("shows error for incorrect password", async ({
    dummyUser: { email },
    loginPage,
  }) => {
    await loginPage.login({ email, password: "wrong_password" })
    await loginPage.expectErrorMessage("Incorrect password. Please try again.")
  })

  test("can log in with correct credentials", async ({
    dummyUser: { email, password },
    loginPage,
    page,
  }) => {
    await loginPage.login({ email, password })
    await expect(
      page.getByRole("heading", { name: "Overview", level: 1 })
    ).toBeVisible()
  })
})

// ============================================
// ================= Redirects ================
// ============================================

test.describe("Redirects", () => {
  test("redirects unauthorized users to login", async ({ page, loginPage }) => {
    await page.goto("/")
    await expect(loginPage.heading).toBeVisible()

    await page.goto("/transactions")
    await expect(loginPage.heading).toBeVisible()
  })

  test("visiting auth pages while logged in redirects to home", async ({
    page,
    dummyUser: { email, password },
    loginPage,
  }) => {
    await loginPage.login({ email, password: password })
    await expect(
      page.getByRole("heading", { name: "Overview", level: 1 })
    ).toBeVisible()

    // after logged in, try to visit /login, but should be redirected back to home
    await page.goto("/login")
    await expect(
      page.getByRole("heading", { name: "Overview", level: 1 })
    ).toBeVisible()

    // same for /signup as well
    await page.goto("/signup")
    await expect(
      page.getByRole("heading", { name: "Overview", level: 1 })
    ).toBeVisible()
  })
})
