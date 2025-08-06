import "server-only"

import { cookies } from "next/headers"
import { cache } from "react"

import { verifyToken } from "@/lib/session"

export const verifySession = cache(async () => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) return null

  const session = await verifyToken(sessionCookie.value)
  if (!session) return null

  return session.userId
})
