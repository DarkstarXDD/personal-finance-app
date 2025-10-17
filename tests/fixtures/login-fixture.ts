import { test as base } from "@playwright/test"

import { LoginPage } from "../page-objects/login-page"
import { createDummyUser } from "../utils"

type TestFixtures = {
  loginPage: LoginPage
  dummyUser: {
    id: string
    name: string
    email: string
    password: string
  }
}

export const test = base.extend<TestFixtures>({
  dummyUser: async ({}, use) => {
    const user = await createDummyUser()
    await use(user)
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await use(loginPage)
  },
})

export const expect = base.expect
