import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type { FieldValues, Path, UseFormReturn } from "react-hook-form"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================
// ============ Currency Formatter ============
// ============================================

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

// ============================================
// ====== Forms - Set Errors from Server ======
// ============================================

export function setErrorsFromServer<
  T extends Record<string, string[] | undefined>,
  F extends FieldValues,
>(response: T, form: UseFormReturn<F>) {
  ;(Object.keys(response) as (keyof T)[]).forEach((key) => {
    form.setError(
      key as Path<F>,
      { message: response[key]?.[0] },
      { shouldFocus: true }
    )
  })
}
