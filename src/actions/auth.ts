"use server"

import { LoginSchema } from "@/lib/schemas"

export async function loginUser(formData: LoginSchema): Promise<string | null> {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  console.log(formData)
  return "Something went wrong"
}
