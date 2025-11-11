import type { Signup, Login, Name, Email } from "@/features/auth/schemas"
import type {
  PotAmountUpdate,
  PotCreate,
  TransactionCreate,
  BudgetCreate,
  PasswordUpdate,
} from "@/lib/schemas"

export type DALReturn<T extends Record<string, string[]>> =
  | { success: true }
  | { success: false; fieldErrors: T }

export type RegisterUserErrors = {
  [Key in keyof Signup]?: string[]
}

export type LoginUserErrors = {
  [Key in keyof Login]?: string[]
}

export type TransactionCreateErrors = {
  [Key in keyof TransactionCreate]?: string[]
}

export type BudgetCreateErrors = {
  [key in keyof BudgetCreate]?: string[]
}

export type PotCreateErrors = {
  [Key in keyof PotCreate]?: string[]
}

export type PotAmountUpdateErrors = {
  [Key in keyof PotAmountUpdate]?: string[]
}

export type NameUpdateErrors = {
  [Key in keyof Name]?: string[]
}

export type EmailUpdateErrors = {
  [Key in keyof Email]?: string[]
}

export type PasswordUpdateErrors = {
  [Key in keyof PasswordUpdate]?: string[]
}
