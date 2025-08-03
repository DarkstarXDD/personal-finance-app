"use server"

import bcrypt from "bcryptjs"
import z from "zod"

import { prisma, Prisma } from "@/lib/prisma"
import {
  signupSchema,
  loginSchema,
  type SignupSchema,
  type LoginSchema,
} from "@/lib/schemas"

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
    console.log(user) // For development
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return {
        email: [
          "An account with this email already exists. Please sign in instead or use a different email address.",
        ],
      }
    return { email: ["Something went wrong. Please try again."] }
  }
  return null
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
  return null
}

// const password = await bcrypt.compare("jane1234", passwordHash)
// console.log(password)
