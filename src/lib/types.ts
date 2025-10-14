import type {
  SignupSchema,
  LoginSchema,
  PotAmountUpdate,
  PotCreate,
  TransactionCreate,
  BudgetCreate,
  NameSchema,
} from "@/lib/schemas"

export type DALReturn<T extends Record<string, string[]>> =
  | { success: true }
  | { success: false; fieldErrors: T }

export type RegisterUserErrors = {
  [Key in keyof SignupSchema]?: string[]
}

export type LoginUserErrors = {
  [Key in keyof LoginSchema]?: string[]
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
  [Key in keyof NameSchema]?: string[]
}
