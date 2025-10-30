import * as z from "zod"

// ============================================
// ========== Signup Schema and Type ==========
// ============================================

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty."),
  email: z.email("Invalid email format.").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters.").trim(),
})
export type Signup = z.infer<typeof signupSchema>

// ============================================
// =========== Login Schema and Type ==========
// ============================================

export const loginSchema = z.object({
  email: z.email("Invalid email format.").toLowerCase(),
  password: z.string().trim().min(1, "Password cannot be empty."),
})
export type Login = z.infer<typeof loginSchema>

// ============================================
// =========== Name Schema and Type ===========
// ============================================

export const nameSchema = signupSchema.pick({ name: true })
export type Name = z.infer<typeof nameSchema>

// ============================================
// ========== Email Schema and Type ===========
// ============================================

export const emailSchema = signupSchema.pick({ email: true })
export type Email = z.infer<typeof emailSchema>
