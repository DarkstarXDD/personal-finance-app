"use server"

import z from "zod"

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
