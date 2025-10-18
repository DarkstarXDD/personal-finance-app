import "dotenv/config"

import { test as base } from "@playwright/test"

import { createToken } from "@/lib/session"

import { createDummyUser } from "../utils"

type Fixtures = {
  userSession: null
}

export const test = base.extend<Fixtures>({
  userSession: async ({ context }, use) => {
    const user = await createDummyUser()
    const sessionToken = await createToken({ userId: user.id })

    await context.addCookies([
      {
        name: "session",
        value: sessionToken,
        httpOnly: true,
        domain: "localhost",
        path: "/",
      },
    ])

    await use(null)
  },
})

export const expect = base.expect
