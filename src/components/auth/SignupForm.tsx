"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import { registerUser } from "@/actions/auth"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import TextField from "@/components/ui/TextField"
import { signupSchema } from "@/lib/schemas"

import type { RegisterUserErrors } from "@/lib/types"

export default function SignupForm() {
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(signupSchema),
  })

  return (
    <Card padding="lg" className="mx-auto max-w-[35rem]">
      <div className="grid justify-items-center gap-8">
        <form
          className="grid w-full gap-8"
          onSubmit={handleSubmit(async (data) => {
            const response = await registerUser(data)
            if (response) {
              const errorKeys = Object.keys(
                response
              ) as (keyof RegisterUserErrors)[]
              errorKeys.forEach((key) =>
                setError(
                  key,
                  { message: response[key]?.[0] },
                  { shouldFocus: true }
                )
              )
            }
          })}
        >
          <Heading as="h1">Sign Up</Heading>
          <div className="grid gap-4">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="Name"
                  autoComplete="name"
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  isDisabled={isSubmitting}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="Email"
                  autoComplete="email"
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  isDisabled={isSubmitting}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="Create Password"
                  autoComplete="new-password"
                  type="password"
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  description="Password must be at least 8 characters"
                  isDisabled={isSubmitting}
                />
              )}
            />
          </div>
          <Button variant="primary" type="submit" isPending={isSubmitting}>
            Create Account
          </Button>
        </form>
        <p className="flex items-center gap-2">
          <span className="text-grey-500 text-sm leading-normal font-normal">
            Already have an account?
          </span>
          <Link href="/login" className="font-bold">
            Login
          </Link>
        </p>
      </div>
    </Card>
  )
}
