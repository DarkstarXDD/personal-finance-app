"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import Button from "@/components/ui/Button"
import { DialogTrigger, Dialog } from "@/components/ui/Dialog"
import NumberField from "@/components/ui/NumberField"
import { Select, SelectItem } from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { type Color } from "@/data-access/lookups"
import { createPot } from "@/features/pots/actions"
import { potCreateSchema } from "@/lib/schemas"
import { setErrorsFromServer } from "@/lib/utils"

type AddPotDialogProps = { colors: Color[] }

export default function AddPotDialog({ colors }: AddPotDialogProps) {
  const form = useForm({
    resolver: zodResolver(potCreateSchema),
    defaultValues: { name: "", target: 0, colorId: "" },
  })

  return (
    <DialogTrigger>
      <Button variant="primary" size="xl">
        Add Pot...
      </Button>

      <Dialog
        title="New Pot"
        description="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
      >
        {({ close }) => (
          <form
            className="grid gap-6"
            onSubmit={form.handleSubmit(async (data) => {
              const response = await createPot(data)
              if (response) {
                setErrorsFromServer(response, form)
                return
              }
              form.reset()
              close()
            })}
          >
            <div className="grid gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    label="Pot Name"
                    type="text"
                    placeholder="New Computer..."
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
                    placeholder="Select a Color..."
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
              Add Pot
            </Button>
          </form>
        )}
      </Dialog>
    </DialogTrigger>
  )
}
