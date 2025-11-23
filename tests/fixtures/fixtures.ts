import { test as base } from "@playwright/test"

import { createToken } from "@/lib/session"
import { BudgetsPage } from "tests/page-objects/budgets-page"
import { LoginPage } from "tests/page-objects/login-page"
import { OverviewPage } from "tests/page-objects/overview-page"
import { PotsPage } from "tests/page-objects/pots-page"
import { SignUpPage } from "tests/page-objects/signup-page"
import { TransactionsPage } from "tests/page-objects/transactions-page"
import {
  createDummyUserData,
  createDummyUser,
  deleteDummyUser,
} from "tests/utils"

type TestFixtures = {
  dummyUserData: {
    name: string
    email: string
    password: string
  }
  dummyUser: {
    id: string
    name: string
    email: string
    password: string
  }
  userSession: { userId: string }
  loginPage: LoginPage
  signUpPage: SignUpPage
  overviewPage: OverviewPage
  transactionsPage: TransactionsPage
  budgetsPage: BudgetsPage
  potsPage: PotsPage
}

export const test = base.extend<TestFixtures>({
  dummyUserData: async ({}, use) => {
    const userData = createDummyUserData()
    use(userData)
  },

  dummyUser: async ({}, use) => {
    const user = await createDummyUser()
    await use(user)
    await deleteDummyUser(user.id)
  },

  userSession: async ({ context }, use) => {
    const user = await createDummyUser()
    const sessionToken = await createToken({ userId: user.id, role: "USER" })
    await context.addCookies([
      {
        name: "session",
        value: sessionToken,
        httpOnly: true,
        domain: "localhost",
        path: "/",
      },
    ])
    await use({ userId: user.id })
    await deleteDummyUser(user.id)
  },

  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page)
    await signUpPage.goto()
    await use(signUpPage)
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await use(loginPage)
  },

  overviewPage: async ({ page, userSession }, use) => {
    const overviewPage = new OverviewPage(page)
    await overviewPage.goto()
    await use(overviewPage)
  },

  transactionsPage: async ({ page, userSession }, use) => {
    const transactionsPage = new TransactionsPage(page)
    await transactionsPage.goto()
    await use(transactionsPage)
  },

  budgetsPage: async ({ page, userSession }, use) => {
    const budgetsPage = new BudgetsPage(page)
    await budgetsPage.goto()
    await use(budgetsPage)
  },

  potsPage: async ({ page, userSession }, use) => {
    const potsPage = new PotsPage(page)
    await potsPage.goto()
    await use(potsPage)
  },
})

export const expect = base.expect
