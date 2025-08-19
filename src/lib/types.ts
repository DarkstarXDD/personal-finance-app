import type {
  PotUpdateSchema,
  PotSchema,
  TransactionCreate,
} from "@/lib/schemas"

export type DALReturn<T extends Record<string, string[]>> =
  | { success: true }
  | { success: false; fieldErrors: T }

export type CreateNewPotErrors = {
  [Key in keyof Pick<PotSchema, "name" | "target" | "colorId">]?: string[]
}

export type PotUpdateErrors = {
  [Key in keyof PotUpdateSchema]?: string[]
}

export type CreateTransactionErrors = {
  [Key in keyof TransactionCreate]?: string[]
}
