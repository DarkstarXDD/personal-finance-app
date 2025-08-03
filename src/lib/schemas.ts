import z from "zod"

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty"),
  email: z.email("Invalid email format").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters").trim(),
})

export type SignupSchema = z.infer<typeof signupSchema>

export const loginSchema = z.object({
  email: z.email("Invalid email format").toLowerCase(),
  password: z.string().trim().min(1, "Password cannot be empty"),
})

export type LoginSchema = z.infer<typeof loginSchema>
