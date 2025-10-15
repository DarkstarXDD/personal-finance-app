"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { PiLockFill } from "react-icons/pi"

import { updatePassword } from "@/actions/account"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import TextField from "@/components/ui/TextField"
import { passwordUpdateSchema } from "@/lib/schemas"
import { PasswordUpdateErrors } from "@/lib/types"

export default function Password() {
  const form = useForm({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  return (
    <Card className="@5xl:col-span-2">
      <form
        className="grid gap-6"
        onSubmit={form.handleSubmit(async (data) => {
          const response = await updatePassword(data)
          if (response) {
            const errorKeys = Object.keys(
              response
            ) as (keyof PasswordUpdateErrors)[]
            errorKeys.forEach((key) =>
              form.setError(
                key,
                { message: response[key]?.[0] },
                { shouldFocus: true }
              )
            )
            return
          }
          form.reset()
        })}
      >
        <div className="grid gap-2">
          <h3 className="text-grey-900 flex items-center gap-2 text-base leading-none font-semibold">
            <PiLockFill className="text-grey-500 size-5" />
            Password
          </h3>
          <p className="text-grey-500 text-sm">
            Change your password to keep your account secure.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="flex flex-col items-start gap-4 @5xl:flex-row">
            <Controller
              name="currentPassword"
              control={form.control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="Current Password"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  isDisabled={form.formState.isSubmitting}
                />
              )}
            />
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="New Password"
                  type="password"
                  autoComplete="password"
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  isDisabled={form.formState.isSubmitting}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="Confirm Password"
                  type="password"
                  autoComplete="password"
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  isDisabled={form.formState.isSubmitting}
                />
              )}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="justify-self-start"
            isPending={form.formState.isSubmitting}
          >
            Update Password
          </Button>
        </div>
      </form>
    </Card>
  )
}
