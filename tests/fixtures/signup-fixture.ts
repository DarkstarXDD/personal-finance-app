import { test as base } from "@playwright/test"

import { SignUpPage } from "../page-objects/signup-page"
import { createDummyUser } from "../utils"

type Fixtures = {
  signUpPage: SignUpPage
  dummyUser: {
    id: string
    name: string
    email: string
    password: string
  }
}

export const test = base.extend<Fixtures>({
  dummyUser: async ({}, use) => {
    const user = await createDummyUser()
    await use(user)
  },

  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page)
    await signUpPage.goto()
    await use(signUpPage)
  },
})

export const expect = base.expect
