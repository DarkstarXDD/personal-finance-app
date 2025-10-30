"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"

import Logo from "@/components/icons/Logo"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"
import { registerUser } from "@/features/auth/actions"
import { signupSchema } from "@/features/auth/schemas"
import { setErrorsFromServer } from "@/lib/utils"

export default function SignupForm() {
  const form = useForm({
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(signupSchema),
  })

  return (
    <div className="mx-auto grid max-w-90 justify-items-center gap-8">
      <div className="grid w-full justify-items-center gap-6">
        <Logo />
        <form
          noValidate
          className="grid w-full gap-8"
          onSubmit={form.handleSubmit(async (data) => {
            const response = await registerUser(data)
            if (response) {
              setErrorsFromServer(response, form)
              return
            }
          })}
        >
          <div className="grid justify-items-center gap-3">
            <h1 className="text-primary text-3xl leading-tight font-semibold">
              Sign Up
            </h1>
            <p className="text-center">Welcome! Please enter your details.</p>
          </div>

          <div className="grid gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="Name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  isDisabled={form.formState.isSubmitting}
                />
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="Email"
                  type="email"
                  placeholder="johndoe@example.com"
                  autoComplete="email"
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
                  autoComplete="new-password"
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  isDisabled={form.formState.isSubmitting}
                  description="Password must be at least 8 characters."
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
            Create Account
          </Button>
        </form>
      </div>

      <p className="flex items-center gap-2 text-sm">
        <span>Already have an account?</span>
        <Link
          href="/login"
          className="text-brand-secondary hover:text-brand-secondary_hover font-semibold underline"
        >
          Log in
        </Link>
      </p>
    </div>
  )
}
