"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { FiMail } from "react-icons/fi"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import TextField from "@/components/ui/TextField"
import { updateEmail } from "@/features/account-settings/actions"
import { emailSchema } from "@/features/auth/schemas"
import { setErrorsFromServer } from "@/lib/utils"

export default function Email({ email }: { email: string }) {
  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email },
  })

  return (
    <Card size="md">
      <form
        className="grid gap-6"
        onSubmit={form.handleSubmit(async (data) => {
          const response = await updateEmail(data)
          if (response) {
            setErrorsFromServer(response, form)
            return
          }
        })}
      >
        <div className="grid gap-1">
          <div className="flex items-center gap-2">
            <FiMail className="text-fg-quaternary size-5" />
            <h3 className="text-primary font-semibold">Email</h3>
          </div>

          <p className="text-sm">Update your email.</p>
        </div>

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
          <Button
            type="submit"
            variant="primary"
            size="lg"
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
