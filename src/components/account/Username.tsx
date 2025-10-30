"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { PiUserFill } from "react-icons/pi"

import { updateName } from "@/actions/account"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import TextField from "@/components/ui/TextField"
import { nameSchema } from "@/features/auth/schemas"
import { setErrorsFromServer } from "@/lib/utils"

export default function Username({ name }: { name: string }) {
  const form = useForm({
    resolver: zodResolver(nameSchema),
    defaultValues: { name },
  })

  return (
    <Card>
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
        <div className="grid gap-2">
          <h3 className="text-grey-900 flex items-center gap-2 text-base leading-none font-semibold">
            <PiUserFill className="text-grey-500 size-5" />
            Username
          </h3>
          <p className="text-grey-500 text-sm">Update your username.</p>
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
