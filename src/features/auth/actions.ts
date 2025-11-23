"use server"

import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import * as z from "zod"

import {
  signupSchema,
  loginSchema,
  type Signup,
  type Login,
} from "@/features/auth/schemas"
import { prisma, Prisma } from "@/lib/prisma"
import { createSession } from "@/lib/session"

import type { RegisterUserErrors, LoginUserErrors } from "@/lib/types"

// ============================================
// =============== Register User ==============
// ============================================

export async function registerUser(
  formData: Signup
): Promise<RegisterUserErrors | null> {
  const parsed = signupSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  const passwordHash = await bcrypt.hash(parsed.data.password, 12)

  try {
    const user = await prisma.user.create({
      data: { ...parsed.data, password: passwordHash },
      select: { id: true },
    })
    await createSession({ userId: user.id, role: "USER" })
  } catch (e) {
    console.error("Server Error:", e)
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return {
        email: [
          "An account with this email already exists. Please sign in instead or use a different email address.",
        ],
      }
    return { email: ["Something went wrong. Please try again."] }
  }
  redirect("/")
}

// ============================================
// ================= Login User ===============
// ============================================

export async function loginUser(
  formData: Login
): Promise<LoginUserErrors | null> {
  const parsed = loginSchema.safeParse(formData)
  if (!parsed.success) return z.flattenError(parsed.error).fieldErrors

  try {
    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
      select: { id: true, password: true, role: true },
    })
    if (!user)
      return {
        email: [
          "No account found with this email address. Please check the email entered or sign up for a new account.",
        ],
      }
    const isPasswordValid = await bcrypt.compare(
      parsed.data.password,
      user.password
    )
    if (!isPasswordValid)
      return { password: ["Incorrect password. Please try again."] }
    await createSession({ userId: user.id, role: user.role })
  } catch (e) {
    console.error("Server Error:", e)
    return { email: ["Something went wrong. Please try again."] }
  }
  redirect("/")
}
