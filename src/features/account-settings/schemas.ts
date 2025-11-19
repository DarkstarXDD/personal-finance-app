import * as z from "zod"

export const passwordUpdateSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .trim(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: "Passowrds don't match.",
    path: ["confirmPassword"],
  })
export type PasswordUpdate = z.infer<typeof passwordUpdateSchema>
