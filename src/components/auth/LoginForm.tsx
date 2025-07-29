"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { startTransition, useActionState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"

import { loginUser } from "@/actions/auth"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import TextField from "@/components/ui/TextField"
import { loginSchema } from "@/lib/schemas"

export default function LoginForm() {
  const [loginError, loginAction, isPending] = useActionState(loginUser, null)

  const { handleSubmit, control, setError } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (loginError) {
      setError("email", {
        type: "server",
        message: loginError,
      })
    }
  }, [loginError, setError])

  return (
    <Card className="mx-auto max-w-[35rem]">
      <div className="grid justify-items-center gap-8">
        <form
          className="grid w-full gap-8"
          onSubmit={(e) => {
            e.preventDefault()
            const handleFormSubmit = handleSubmit((data) => {
              const formData = new FormData()
              Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value)
              })
              startTransition(() => loginAction(formData))
            })
            handleFormSubmit()
          }}
        >
          <Heading as="h1">Login</Heading>
          <div className="grid gap-4">
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
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="Password"
                  autoComplete="current-password"
                  type="password"
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
          <Button type="submit" className="w-full" isPending={isPending}>
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
