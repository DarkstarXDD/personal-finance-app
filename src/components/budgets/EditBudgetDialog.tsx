"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"

import { updateBudget } from "@/actions/budgets"
import Button from "@/components/ui/Button"
import { Dialog } from "@/components/ui/Dialog"
import NumberField from "@/components/ui/NumberField"
import { Select, SelectItem } from "@/components/ui/Select"
import { budgetUpdateSchema } from "@/lib/schemas"

import type { Budget } from "@/data-access/budgets"
import type { Category, Color } from "@/data-access/lookups"
import type { BudgetCreateErrors } from "@/lib/types"

export default function EditBudgetDialog({
  isOpen,
  onOpenChange,
  categories,
  colors,
  budget,
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  categories: Category[]
  colors: Color[]
  budget: Budget
}) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(budgetUpdateSchema),
    defaultValues: {
      id: budget.id,
      categoryId: budget.category.id,
      maximumSpend: budget.maximumSpend,
      colorId: budget.color.id,
    },
  })

  useEffect(() => {
    reset({
      id: budget.id,
      categoryId: budget.category.id,
      maximumSpend: budget.maximumSpend,
      colorId: budget.color.id,
    })
  }, [budget, reset])

  return (
    <Dialog title="Edit Budget" isOpen={isOpen} onOpenChange={onOpenChange}>
      {({ close }) => (
        <form
          className="grid gap-5"
          onSubmit={handleSubmit(async (data) => {
            const response = await updateBudget(data)
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
            close()
          })}
        >
          <p className="text-grey-500 text-sm leading-normal font-normal">
            As your budgets change, feel free to update your spending limits.
          </p>
          <div className="grid gap-4">
            <input {...register("id")} type="hidden" />
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
            Save Changes
          </Button>
        </form>
      )}
    </Dialog>
  )
}
