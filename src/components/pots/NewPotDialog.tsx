"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import { createNewPot } from "@/actions/pots"
import Button from "@/components/ui/Button"
import { DialogTrigger, Dialog } from "@/components/ui/Dialog"
import { Select, SelectItem } from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { potSchema } from "@/lib/schemas"

import type { Color } from "@/data-access/lookups"
import type { CreateNewPotErrors } from "@/lib/types"

export default function NewPotDialog({ colors }: { colors: Color[] }) {
  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(
      potSchema.pick({ name: true, target: true, colorId: true })
    ),
    defaultValues: { name: "", target: "", colorId: "" },
  })

  return (
    <DialogTrigger>
      <Button variant="primary">+ Add New Pot</Button>
      <Dialog title="Add New Pot">
        {({ close }) => (
          <form
            className="grid gap-5"
            onSubmit={handleSubmit(async (data) => {
              const response = await createNewPot(data)
              if (response) {
                const errorKeys = Object.keys(
                  response
                ) as (keyof CreateNewPotErrors)[]
                errorKeys.forEach((key) =>
                  setError(
                    key,
                    { message: response[key]?.[0] },
                    { shouldFocus: true }
                  )
                )
                return
              }
              reset()
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
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    label="Pot Name"
                    placeholder="e.g. Rainy Days"
                    description="Max 30 characters"
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                    isDisabled={isSubmitting}
                  />
                )}
              />
              <Controller
                name="target"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    label="Target"
                    placeholder="e.g. 2000"
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                    isDisabled={isSubmitting}
                  />
                )}
              />
              <Controller
                name="colorId"
                control={control}
                render={({
                  field: { name, value, onChange, ref },
                  fieldState: { invalid, error },
                }) => (
                  <Select
                    label="Theme"
                    placeholder="Select a color"
                    name={name}
                    selectedKey={value}
                    onSelectionChange={(selected) => onChange(selected)}
                    ref={ref}
                    isInvalid={invalid}
                    isDisabled={isSubmitting}
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
            <Button variant="primary" type="submit" isPending={isSubmitting}>
              Add Pot
            </Button>
          </form>
        )}
      </Dialog>
    </DialogTrigger>
  )
}
