"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"

import LogoBadge from "@/components/icons/LogoBadge"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"
import { loginUser } from "@/features/auth/actions"
import DemoLogin from "@/features/auth/components/DemoLogin"
import { loginSchema } from "@/features/auth/schemas"
import { setErrorsFromServer } from "@/lib/utils"

export default function LoginForm() {
  const form = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  })

  return (
    <div className="mx-auto grid max-w-90 justify-items-center gap-8">
      <div className="grid w-full justify-items-center gap-6">
        <LogoBadge />

        <form
          noValidate
          className="grid w-full gap-8"
          onSubmit={form.handleSubmit(async (data) => {
            const response = await loginUser(data)
            if (response) {
              setErrorsFromServer(response, form)
              return
            }
          })}
        >
          <div className="grid justify-items-center gap-3">
            <h1 className="text-primary text-3xl leading-tight font-semibold">
              Log In
            </h1>
            <p className="text-center">
              Welcome back! Please enter your details.
            </p>
          </div>

          <div className="grid gap-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="Email"
                  type="email"
                  autoComplete="email"
                  placeholder="johndoe@example.com"
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  isDisabled={form.formState.isSubmitting}
                />
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  isDisabled={form.formState.isSubmitting}
                />
              )}
            />
          </div>

          <Button
            variant="primary"
            size="xl"
            type="submit"
            isPending={form.formState.isSubmitting}
          >
            Log In
          </Button>
        </form>
      </div>

      <p className="flex items-center gap-2 text-sm">
        <span>Need to create an account?</span>
        <Link
          href="/signup"
          className="text-brand-secondary hover:text-brand-secondary_hover font-semibold underline"
        >
          Sign up
        </Link>
      </p>

      <div className="border-secondary w-full border-t" />

      <DemoLogin />
    </div>
  )
}
