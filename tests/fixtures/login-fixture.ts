import { test as base } from "@playwright/test"

import { LoginPage } from "../page-objects/login-page"
import { createLoginUser } from "../utils"

type TestFixtures = {
  loginUser: { email: string; passwordInPlainText: string }
  loginPage: LoginPage
}

export const test = base.extend<TestFixtures>({
  loginUser: async ({}, use) => {
    const user = await createLoginUser()
    console.log("User created!")
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(user)
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    console.log("Login page created!")
    await loginPage.goto()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(loginPage)
  },
})

export const expect = base.expect
