import { test, expect } from "./fixtures/signup-fixture"
import { createDummyUserData } from "./utils"

test.describe("Sign Up Page", () => {
  test("renders all required elements", async ({ signUpPage }) => {
    await expect(signUpPage.heading).toBeVisible()
    await expect(signUpPage.nameInput).toBeVisible()
    await expect(signUpPage.emailInput).toBeVisible()
    await expect(signUpPage.passwordInput).toBeVisible()
    await expect(signUpPage.signUpButton).toBeVisible()
  })

  test("shows error for empty submit", async ({ signUpPage }) => {
    await signUpPage.signUp({})
    await expect(signUpPage.nameInput).toBeFocused()
    await signUpPage.expectErrorMessage("Name cannot be empty.")
    await signUpPage.expectErrorMessage("Invalid email format.")
    await signUpPage.expectErrorMessage(
      "Password must be at least 8 characters."
    )
  })

  test("rejects whitespace only name", async ({ signUpPage }) => {
    await signUpPage.signUp({ name: "  " })
    await signUpPage.expectErrorMessage("Name cannot be empty.")
  })

  test("rejects invalid email", async ({ signUpPage }) => {
    await signUpPage.signUp({ email: "test@" })
    await signUpPage.expectErrorMessage("Invalid email format.")
  })

  test("rejects weak password", async ({ signUpPage }) => {
    await signUpPage.signUp({ password: "Test123" })
    await signUpPage.expectErrorMessage(
      "Password must be at least 8 characters."
    )
  })

  test("cannot signup with an existing email", async ({
    dummyUser,
    signUpPage,
  }) => {
    await signUpPage.signUp(dummyUser)
    await signUpPage.expectErrorMessage(
      "An account with this email already exists. Please sign in instead or use a different email address."
    )
  })

  test("accepts valid inputs and creates account", async ({
    page,
    signUpPage,
  }) => {
    const { name, email, password } = createDummyUserData()
    await signUpPage.signUp({ name, email, password })
    await expect(
      page.getByRole("heading", { name: "Overview", level: 1 })
    ).toBeVisible()
  })
})
