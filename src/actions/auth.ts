"use server"

import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import * as z from "zod"

import { prisma, Prisma } from "@/lib/prisma"
import {
  signupSchema,
  loginSchema,
  type SignupSchema,
  type LoginSchema,
} from "@/lib/schemas"
import { createSession } from "@/lib/session"

export type RegisterUserErrors = {
  [Key in keyof SignupSchema]?: string[]
}

export async function registerUser(
  formData: SignupSchema
): Promise<RegisterUserErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // For development
  const parsed = signupSchema.safeParse(formData)
  if (!parsed.success) {
    const errors = z.flattenError(parsed.error).fieldErrors
    return errors
  }
  const passwordHash = await bcrypt.hash(parsed.data.password, 12)

  try {
    const user = await prisma.user.create({
      data: { ...parsed.data, password: passwordHash },
      select: { id: true },
    })
    await createSession({ userId: user.id })
  } catch (e) {
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

export type LoginUserErrors = {
  [Key in keyof LoginSchema]?: string[]
}

export async function loginUser(
  formData: LoginSchema
): Promise<LoginUserErrors | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // For development

  const parsed = loginSchema.safeParse(formData)
  if (!parsed.success) {
    const errors = z.flattenError(parsed.error).fieldErrors
    return errors
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
      select: { id: true, password: true },
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
    await createSession({ userId: user.id })
  } catch {
    return { email: ["Something went wrong. Please try again."] }
  }
  redirect("/")
}
