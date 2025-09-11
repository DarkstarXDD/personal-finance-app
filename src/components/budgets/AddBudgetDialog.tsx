"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import { createBudget } from "@/actions/budgets"
import Button from "@/components/ui/Button"
import { DialogTrigger, Dialog } from "@/components/ui/Dialog"
import NumberField from "@/components/ui/NumberField"
import { Select, SelectItem } from "@/components/ui/Select"
import { budgetCreateSchema } from "@/lib/schemas"

import type { Category, Color } from "@/data-access/lookups"
import type { BudgetCreateErrors } from "@/lib/types"

export default function AddBudgetDialog({
  categories,
  colors,
}: {
  categories: Category[]
  colors: Color[]
}) {
  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(budgetCreateSchema),
    defaultValues: {
      categoryId: "",
      maximumSpend: 0,
      colorId: "",
    },
  })

  return (
    <DialogTrigger>
      <Button variant="primary">+ Add Budget</Button>
      <Dialog title="Add New Budget">
        {({ close }) => (
          <form
            className="grid gap-5"
            onSubmit={handleSubmit(async (data) => {
              const response = await createBudget(data)
              if (response) {
                console.log(response)
                const errorKeys = Object.keys(
                  response
                ) as (keyof BudgetCreateErrors)[]
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
              Choose a category to set a spending budget. These categories can
              help you monitor spending.
            </p>
            <div className="grid gap-4">
              <Controller
                name="categoryId"
                control={control}
                render={({
                  field: { name, value, onChange, ref },
                  fieldState: { invalid, error },
                }) => (
                  <Select
                    label="Budget Category"
                    placeholder="Select a Category"
                    name={name}
                    selectedKey={value}
                    onSelectionChange={(selected) => onChange(selected)}
                    ref={ref}
                    isInvalid={invalid}
                    isDisabled={isSubmitting}
                    errorMessage={error?.message}
                    items={categories}
                  >
                    {(item) => (
                      <SelectItem textValue={item.label}>
                        <span>{item.label}</span>
                      </SelectItem>
                    )}
                  </Select>
                )}
              />

              <Controller
                name="maximumSpend"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <NumberField
                    label="Maximum Spend"
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                    isDisabled={isSubmitting}
                    formatOptions={{ style: "currency", currency: "USD" }}
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
              Add Budget
            </Button>
          </form>
        )}
      </Dialog>
    </DialogTrigger>
  )
}
