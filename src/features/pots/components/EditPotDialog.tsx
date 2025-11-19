import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"

import Button from "@/components/ui/Button"
import { Dialog } from "@/components/ui/Dialog"
import NumberField from "@/components/ui/NumberField"
import { Select, SelectItem } from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { Color } from "@/data-access/lookups"
import { updatePot } from "@/features/pots/actions"
import { type Pot } from "@/features/pots/data-access"
import { potUpdateSchema } from "@/features/pots/schemas"
import { setErrorsFromServer } from "@/lib/utils"

type EditPotDialog = {
  pot: Pot
  colors: Color[]
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export default function EditPotDialog({
  pot,
  colors,
  isOpen,
  onOpenChange,
}: EditPotDialog) {
  const form = useForm({
    resolver: zodResolver(potUpdateSchema),
    defaultValues: {
      id: pot.id,
      name: pot.name,
      target: pot.target,
      colorId: pot.color.id,
    },
  })

  useEffect(() => {
    form.reset({
      id: pot.id,
      name: pot.name,
      target: pot.target,
      colorId: pot.color.id,
    })
  }, [pot, form])

  return (
    <Dialog
      title="Edit Pot"
      description="Update your pot details or adjust your savings target to stay aligned with your goals."
      isOpen={isOpen}
      onOpenChange={(isOpen) => {
        form.reset()
        onOpenChange(isOpen)
      }}
    >
      {({ close }) => (
        <form
          className="grid gap-6"
          onSubmit={form.handleSubmit(async (data) => {
            const response = await updatePot(data)
            if (response) {
              setErrorsFromServer(response, form)
              return
            }
            close()
          })}
        >
          <div className="grid gap-4">
            <input {...form.register("id")} type="hidden" />

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="Pot Name"
                  description="Max 30 characters."
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  isDisabled={form.formState.isSubmitting}
                />
              )}
            />

            <Controller
              name="target"
              control={form.control}
              render={({ field, fieldState: { invalid, error } }) => (
                <NumberField
                  label="Target"
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  isDisabled={form.formState.isSubmitting}
                  formatOptions={{ style: "currency", currency: "USD" }}
                />
              )}
            />

            <Controller
              name="colorId"
              control={form.control}
              render={({
                field: { name, value, onChange, ref },
                fieldState: { invalid, error },
              }) => (
                <Select
                  ref={ref}
                  label="Theme"
                  placeholder="Select a color"
                  name={name}
                  value={value}
                  onChange={(selected) => onChange(selected)}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  isDisabled={form.formState.isSubmitting}
                  items={colors}
                >
                  {(item) => (
                    <SelectItem textValue={item.label}>
                      <div className="flex items-center justify-start gap-3">
                        <span
                          className="size-4 rounded-full"
                          style={{ backgroundColor: item.value }}
                        />
                        <span>{item.label}</span>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              )}
            />
          </div>

          <Button
            variant="primary"
            type="submit"
            size="lg"
            isPending={form.formState.isSubmitting}
          >
            Save Changes
          </Button>
        </form>
      )}
    </Dialog>
  )
}
