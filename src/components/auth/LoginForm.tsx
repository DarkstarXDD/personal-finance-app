"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import { loginUser } from "@/actions/auth"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import TextField from "@/components/ui/TextField"
import { loginSchema } from "@/lib/schemas"
import { setErrorsFromServer } from "@/lib/utils"

export default function LoginForm() {
  const form = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  })

  return (
    <Card className="mx-auto max-w-[35rem]">
      <div className="grid justify-items-center gap-8">
        <form
          className="grid w-full gap-8"
          onSubmit={form.handleSubmit(async (data) => {
            const response = await loginUser(data)
            if (response) {
              setErrorsFromServer(response, form)
              return
            }
          })}
        >
          <Heading as="h1">Login</Heading>
          <div className="grid gap-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="Email"
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
                  autoComplete="current-password"
                  type="password"
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
            type="submit"
            isPending={form.formState.isSubmitting}
          >
            Login
          </Button>
        </form>
        <p className="flex items-center gap-2">
          <span className="text-grey-500 text-sm leading-normal font-normal">
            Need to create an account?
          </span>
          <Link href="/signup" className="font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </Card>
  )
}
