"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { PiEnvelopeFill } from "react-icons/pi"

import { updateEmail } from "@/actions/account"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import TextField from "@/components/ui/TextField"
import { emailSchema } from "@/lib/schemas"

import type { EmailUpdateErrors } from "@/lib/types"

export default function Email({ email }: { email: string }) {
  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email },
  })

  return (
    <Card>
      <form
        className="grid gap-6"
        onSubmit={form.handleSubmit(async (data) => {
          const response = await updateEmail(data)
          if (response) {
            const errorKeys = Object.keys(
              response
            ) as (keyof EmailUpdateErrors)[]
            errorKeys.forEach((key) =>
              form.setError(
                key,
                { message: response[key]?.[0] },
                { shouldFocus: true }
              )
            )
          }
        })}
      >
        <div className="grid gap-2">
          <h3 className="text-grey-900 flex items-center gap-2 text-base leading-none font-semibold">
            <PiEnvelopeFill className="text-grey-500 size-5" />
            Email
          </h3>
          <p className="text-grey-500 text-sm">Update your email address.</p>
        </div>
        <div className="grid gap-4">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                label="Email"
                autoComplete="name"
                {...field}
                isInvalid={invalid}
                errorMessage={error?.message}
                isDisabled={form.formState.isSubmitting}
              />
            )}
          />
          <Button
            type="submit"
            variant="primary"
            className="justify-self-start"
            isPending={form.formState.isSubmitting}
          >
            Update Email
          </Button>
        </div>
      </form>
    </Card>
  )
}
