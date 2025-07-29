"use server"

export async function loginUser(prevState: string | null, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  console.log(formData)
  return "Something went wrong"
}
