import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"

import Button from "@/components/ui/Button"
import { Dialog } from "@/components/ui/Dialog"
import NumberField from "@/components/ui/NumberField"
import { Select, SelectItem } from "@/components/ui/Select"
import { type Category, Color } from "@/data-access/lookups"
import { updateBudget } from "@/features/budgets/actions"
import { type Budget } from "@/features/budgets/data-access"
import { budgetUpdateSchema } from "@/lib/schemas"
import { setErrorsFromServer } from "@/lib/utils"

type EditBudgetDialogProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  categories: Category[]
  colors: Color[]
  budget: Budget
}

export default function EditBudgetDialog({
  isOpen,
  onOpenChange,
  categories,
  colors,
  budget,
}: EditBudgetDialogProps) {
  const form = useForm({
    resolver: zodResolver(budgetUpdateSchema),
    defaultValues: {
      id: budget.id,
      categoryId: budget.category.id,
      maximumSpend: budget.maximumSpend,
      colorId: budget.color.id,
    },
  })

  useEffect(() => {
    form.reset({
      id: budget.id,
      categoryId: budget.category.id,
      maximumSpend: budget.maximumSpend,
      colorId: budget.color.id,
    })
  }, [budget, form])

  return (
    <Dialog
      title="Edit Budget"
      description="As your budgets change, feel free to update your spending limits."
      isOpen={isOpen}
      onOpenChange={(isOpen) => {
        form.reset()
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
                  ref={ref}
                  label="Budget Category"
                  placeholder="Select a Category"
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
