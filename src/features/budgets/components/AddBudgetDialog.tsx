"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import Button from "@/components/ui/Button"
import { DialogTrigger, Dialog } from "@/components/ui/Dialog"
import NumberField from "@/components/ui/NumberField"
import { Select, SelectItem } from "@/components/ui/Select"
import { type Category, Color } from "@/data-access/lookups"
import { createBudget } from "@/features/budgets/actions"
import { budgetCreateSchema } from "@/features/budgets/schemas"
import { setErrorsFromServer } from "@/lib/utils"

type AddBudgetDialogProps = {
  categories: Category[]
  colors: Color[]
}

export default function AddBudgetDialog({
  categories,
  colors,
}: AddBudgetDialogProps) {
  const form = useForm({
    resolver: zodResolver(budgetCreateSchema),
    defaultValues: {
      categoryId: "",
      maximumSpend: 0,
      colorId: "",
    },
  })

  return (
    <DialogTrigger>
      <Button variant="primary" size="xl">
        Add Budget...
      </Button>

      <Dialog
        title="New Budget"
        description="Choose a category to set a spending budget. These categories can help you monitor spending."
      >
        {({ close }) => (
          <form
            className="grid gap-6"
            onSubmit={form.handleSubmit(async (data) => {
              const response = await createBudget(data)
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
                name="categoryId"
                control={form.control}
                render={({
                  field: { name, value, onChange, ref },
                  fieldState: { invalid, error },
                }) => (
                  <Select
                    ref={ref}
                    label="Budget Category"
                    placeholder="Select a Category..."
                    name={name}
                    value={value}
                    onChange={(selected) => onChange(selected)}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                    isDisabled={form.formState.isSubmitting}
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
                control={form.control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <NumberField
                    label="Maximum Spend"
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
              Add Budget
            </Button>
          </form>
        )}
      </Dialog>
    </DialogTrigger>
  )
}
