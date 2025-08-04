import "server-only"

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function createToken(payload: { userId: string }) {
  const token = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
  return token
}

export async function verifyToken(token: string) {
  try {
    const result = await jwtVerify<{ userId: string }>(token, encodedKey, {
      algorithms: ["HS256"],
    })
    return result.payload
  } catch {
    return null
  }
}

export async function createSession(payload: { userId: string }) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
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
