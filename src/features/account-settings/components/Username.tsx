"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { FiUser } from "react-icons/fi"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import TextField from "@/components/ui/TextField"
import { updateName } from "@/features/account-settings/actions"
import { nameSchema } from "@/features/auth/schemas"
import { setErrorsFromServer } from "@/lib/utils"

export default function Username({ name }: { name: string }) {
  const form = useForm({
    resolver: zodResolver(nameSchema),
    defaultValues: { name },
  })

  return (
    <Card size="md">
      <form
        className="grid gap-6"
        onSubmit={form.handleSubmit(async (data) => {
          const response = await updateName(data)
          if (response) {
            setErrorsFromServer(response, form)
            return
          }
        })}
      >
        <div className="grid gap-1">
          <div className="flex items-center gap-2">
            <FiUser className="text-fg-quaternary size-5" />
            <h3 className="text-primary font-semibold">Username</h3>
          </div>

          <p className="text-sm">Update your username.</p>
        </div>

        <div className="grid gap-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                label="Username"
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
            size="lg"
            className="justify-self-start"
            isPending={form.formState.isSubmitting}
          >
            Update Username
          </Button>
        </div>
      </form>
    </Card>
  )
}
