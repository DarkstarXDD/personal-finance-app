"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import TextField from "@/components/ui/TextField"
import { loginSchema } from "@/lib/schemas"

export default function LoginForm() {
  const { handleSubmit, control } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  })

  return (
    <Card className="mx-auto max-w-[35rem]">
      <div className="grid justify-items-center gap-8">
        <form
          className="grid w-full gap-8"
          onSubmit={handleSubmit(
            (data) => console.log(data),
            (errors) => console.log(errors)
          )}
        >
          <Heading as="h1">Login</Heading>
          <div className="grid gap-4">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="Email"
                  {...field}
                  autoComplete="email"
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
                  type="password"
                  {...field}
                  autoComplete="email"
                  isInvalid={invalid}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
          <Button type="submit" className="w-full">
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
