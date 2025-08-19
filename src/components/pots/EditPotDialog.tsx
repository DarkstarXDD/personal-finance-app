import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"

import { editPot } from "@/actions/pots"
import Button from "@/components/ui/Button"
import { Dialog } from "@/components/ui/Dialog"
import { Select, SelectItem } from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { Color } from "@/data-access/lookups"
import { potSchema, type PotSchema } from "@/lib/schemas"

import type { CreateNewPotErrors } from "@/lib/types"

export default function EditPotDialog({
  potData: { potId, name, target, colorId },
  colors,
  isOpen,
  onOpenChange,
}: {
  potData: Omit<PotSchema, "currentAmount" | "colorValue">
  colors: Color[]
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}) {
  const {
    handleSubmit,
    register,
    control,
    setError,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(
      potSchema.pick({ potId: true, name: true, target: true, colorId: true })
    ),
    defaultValues: { potId, name, target, colorId: colorId },
  })

  useEffect(() => {
    reset({ potId, name, target, colorId: colorId })
  }, [potId, name, target, colorId, reset])

  return (
    <Dialog title="Edit Pot" isOpen={isOpen} onOpenChange={onOpenChange}>
      {({ close }) => (
        <form
          className="grid gap-5"
          onSubmit={handleSubmit(async (data) => {
            const response = await editPot(data)
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
            close()
          })}
        >
          <p className="text-grey-500 text-sm leading-normal font-normal">
            Update your pot details or adjust your savings target to stay
            aligned with your goals.
          </p>
          <div className="grid gap-4">
            <input {...register("potId")} type="hidden" />
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
            Save Changes
          </Button>
        </form>
      )}
    </Dialog>
  )
}
