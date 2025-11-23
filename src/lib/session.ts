// Had to remove `import "server-only"` because playwright also uses the `createToken` function.

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { cache } from "react"

import { UserRole } from "@/generated/prisma"

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function createToken(payload: { userId: string; role: UserRole }) {
  const token = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
  return token
}

export async function verifyToken(token: string) {
  try {
    const result = await jwtVerify<{ userId: string; role: UserRole }>(
      token,
      encodedKey,
      {
        algorithms: ["HS256"],
      }
    )
    return result.payload
  } catch {
    return null
  }
}

export async function createSession(payload: {
  userId: string
  role: UserRole
}) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  const sessionToken = await createToken(payload)
  const cookieStore = await cookies()
  cookieStore.set({
    name: "session",
    value: sessionToken,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: expiresAt,
  })
}

export const verifySession = cache(async () => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) return null

  const session = await verifyToken(sessionCookie.value)
  if (!session) return null

  // This makes sure user's who had JWT's created before the addition of the role field, gets a role
  return { ...session, role: session.role ?? "USER" }
})
