"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import { createPot } from "@/actions/pots"
import Button from "@/components/ui/Button"
import { DialogTrigger, Dialog } from "@/components/ui/Dialog"
import NumberField from "@/components/ui/NumberField"
import { Select, SelectItem } from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { potCreateSchema } from "@/lib/schemas"
import { setErrorsFromServer } from "@/lib/utils"

import type { Color } from "@/data-access/lookups"

export default function AddPotDialog({ colors }: { colors: Color[] }) {
  const form = useForm({
    resolver: zodResolver(potCreateSchema),
    defaultValues: { name: "", target: 0, colorId: "" },
  })

  return (
    <DialogTrigger>
      <Button variant="primary">Add Pot...</Button>
      <Dialog title="New Pot">
        {({ close }) => (
          <form
            className="grid gap-5"
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
            <p className="text-grey-500 text-sm leading-normal font-normal">
              Create a pot to set savings targets. These can help keep you on
              track as you save for special purchases.
            </p>
            <div className="grid gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    label="Pot Name"
                    placeholder="Rainy Days..."
                    description="Max 30 characters"
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
                    label="Theme"
                    placeholder="Select a Color..."
                    name={name}
                    selectedKey={value}
                    onSelectionChange={(selected) => onChange(selected)}
                    ref={ref}
                    isInvalid={invalid}
                    isDisabled={form.formState.isSubmitting}
                    errorMessage={error?.message}
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
