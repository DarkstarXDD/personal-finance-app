import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import { updateBudget } from "@/actions/budgets"
import Button from "@/components/ui/Button"
import { Dialog } from "@/components/ui/Dialog"
import NumberField from "@/components/ui/NumberField"
import { Select, SelectItem } from "@/components/ui/Select"
import { budgetUpdateSchema } from "@/lib/schemas"
import { setErrorsFromServer } from "@/lib/utils"

import type { Budget } from "@/data-access/budgets"
import type { Category, Color } from "@/data-access/lookups"

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
  const defaultValues = {
    id: budget.id,
    categoryId: budget.category.id,
    maximumSpend: budget.maximumSpend,
    colorId: budget.color.id,
  }

  const form = useForm({
    resolver: zodResolver(budgetUpdateSchema),
    defaultValues: defaultValues,
  })

  return (
    <Dialog
      title="Edit Budget"
      isOpen={isOpen}
      onOpenChange={(isOpen) => {
        form.reset(defaultValues)
        onOpenChange(isOpen)
      }}
    >
      {({ close }) => (
        <form
          className="grid gap-5"
          onSubmit={form.handleSubmit(async (data) => {
            const response = await updateBudget(data)
            if (response) {
              setErrorsFromServer(response, form)
              return
            }
            close()
          })}
        >
          <p className="text-grey-500 text-sm leading-normal font-normal">
            As your budgets change, feel free to update your spending limits.
          </p>
          <div className="grid gap-4">
            <input {...form.register("id")} type="hidden" />
            <Controller
              name="categoryId"
              control={form.control}
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
                  isDisabled={form.formState.isSubmitting}
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
                  label="Theme"
                  placeholder="Select a color"
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
            Save Changes
          </Button>
        </form>
      )}
    </Dialog>
  )
}
