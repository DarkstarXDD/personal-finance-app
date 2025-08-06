import "server-only"

import { cookies } from "next/headers"

import { verifyToken } from "@/lib/session"

export async function verifySession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) return null

  const session = await verifyToken(sessionCookie.value)
  if (!session) return null

  return session.userId
}
