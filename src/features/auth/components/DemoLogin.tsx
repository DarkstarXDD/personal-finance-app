"use client"

import { useForm } from "react-hook-form"

import Button from "@/components/ui/Button"
import { loginUser } from "@/features/auth/actions"

export default function DemoLogin() {
  const form = useForm({
    defaultValues: { email: "johndoe@example.com", password: "John1234" },
  })
  return (
    <form
      className="w-full"
      onSubmit={form.handleSubmit((data) => loginUser(data))}
    >
      <input type="hidden" {...form.register("email")} />
      <input type="hidden" {...form.register("password")} />
      <Button
        className="w-full"
        variant="secondary"
        size="xl"
        type="submit"
        isPending={form.formState.isSubmitting}
      >
        Try Demo Account
      </Button>
    </form>
  )
}
