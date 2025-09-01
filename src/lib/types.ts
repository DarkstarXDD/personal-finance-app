import type {
  PotUpdateSchema,
  PotCreate,
  TransactionCreate,
  BudgetCreate,
} from "@/lib/schemas"

export type DALReturn<T extends Record<string, string[]>> =
  | { success: true }
  | { success: false; fieldErrors: T }

export type PotCreateErrors = {
  [Key in keyof PotCreate]?: string[]
}

export type PotUpdateErrors = {
  [Key in keyof PotUpdateSchema]?: string[]
}

export type CreateTransactionErrors = {
  [Key in keyof TransactionCreate]?: string[]
}

export type BudgetCreateErrors = {
  [key in keyof BudgetCreate]?: string[]
}
