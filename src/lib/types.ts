import { type PotSchema } from "@/lib/schemas"

export type DALReturn<T extends Record<string, string[]>> =
  | { success: true }
  | { success: false; fieldErrors: T }

export type CreateNewPotErrors = {
  [Key in keyof PotSchema]?: string[]
}
