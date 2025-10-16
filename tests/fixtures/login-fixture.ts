import { test as base } from "@playwright/test"

import { LoginPage } from "../page-objects/login-page"

export const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(loginPage)
  },
})

export const expect = base.expect
