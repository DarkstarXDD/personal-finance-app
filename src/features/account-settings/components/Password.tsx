"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
// import { PiLockFill } from "react-icons/pi"
import { FiLock } from "react-icons/fi"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import TextField from "@/components/ui/TextField"
import { updatePassword } from "@/features/account-settings/actions"
import { passwordUpdateSchema } from "@/features/account-settings/schemas"
import { setErrorsFromServer } from "@/lib/utils"

type PasswordProps = { className?: string }

export default function Password({ className }: PasswordProps) {
  const form = useForm({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  return (
    <Card size="md" className={className}>
      <form
        className="grid gap-6"
        onSubmit={form.handleSubmit(async (data) => {
          const response = await updatePassword(data)
          if (response) {
            setErrorsFromServer(response, form)
            return
          }
          form.reset()
        })}
      >
        <div className="grid gap-1">
          <div className="flex items-center gap-2">
            <FiLock className="text-fg-quaternary size-5" />
            <h3 className="text-primary font-semibold">Password</h3>
          </div>

          <p className="text-sm">
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
            size="lg"
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
