"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller, useWatch } from "react-hook-form"
import { PiArrowsInSimpleFill, PiArrowsOutSimpleFill } from "react-icons/pi"

import Button from "@/components/ui/Button"
import Checkbox from "@/components/ui/Checkbox"
import { DialogTrigger, Dialog } from "@/components/ui/Dialog"
import NumberField from "@/components/ui/NumberField"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import { Select, SelectItem } from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { type Category } from "@/data-access/lookups"
import { createTransaction } from "@/features/transactions/actions"
import {
  transactionCreateSchema,
  type TransactionCreate,
} from "@/features/transactions/schemas"
import { setErrorsFromServer } from "@/lib/utils"

export default function AddTransactionDialog({
  categories,
}: {
  categories: Category[]
}) {
  const form = useForm<TransactionCreate>({
    resolver: zodResolver(transactionCreateSchema),
    defaultValues: {
      counterparty: "",
      amount: 0,
      categoryId: "",
      // I usually avoid "as" but it was the only way in this situation.
      transactionType: "" as "INCOME" | "EXPENSE",
      isRecurring: false,
    },
  })

  const transactionTypeValue = useWatch({
    control: form.control,
    name: "transactionType",
  })

  return (
    <DialogTrigger>
      <Button variant="primary" size="xl">
        Add Transaction...
      </Button>

      <Dialog
        title="New Transaction"
        description="Create a transaction to record your money flow."
      >
        {({ close }) => (
          <form
            className="grid gap-6"
            onSubmit={form.handleSubmit(async (data) => {
              const response = await createTransaction(data)
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
                name="transactionType"
                control={form.control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <RadioGroup
                    label="Transaction Type"
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                    isDisabled={form.formState.isSubmitting}
                  >
                    <RadioGroupItem
                      title="Income"
                      description="Money you received."
                      icon={PiArrowsInSimpleFill}
                      value="INCOME"
                      data-testid="income-radio"
                    />

                    <RadioGroupItem
                      title="Expense"
                      description="Money you spent."
                      icon={PiArrowsOutSimpleFill}
                      value="EXPENSE"
                      data-testid="expense-radio"
                    />
                  </RadioGroup>
                )}
              />

              <Controller
                name="counterparty"
                control={form.control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    label="Counterparty"
                    placeholder="Echo Game Store..."
                    description="Max 30 characters."
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                    isDisabled={form.formState.isSubmitting}
                  />
                )}
              />

              <Controller
                name="amount"
                control={form.control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <NumberField
                    label="Transaction Amount"
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                    isDisabled={form.formState.isSubmitting}
                    formatOptions={{ style: "currency", currency: "USD" }}
                  />
                )}
              />

              <Controller
                name="categoryId"
                control={form.control}
                render={({
                  field: { name, value, onChange, ref },
                  fieldState: { invalid, error },
                }) => (
                  <Select
                    label="Category"
                    placeholder="Select a Category"
                    name={name}
                    value={value}
                    onChange={(selected) => onChange(selected)}
                    ref={ref}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                    isDisabled={form.formState.isSubmitting}
                    items={categories}
                  >
                    {(item) => (
                      <SelectItem textValue={item.label}>
                        {item.label}
                      </SelectItem>
                    )}
                  </Select>
                )}
              />

              <Controller
                name="isRecurring"
                control={form.control}
                render={({ field: { name, value, onChange } }) => (
                  <Checkbox
                    name={name}
                    isSelected={value}
                    onChange={onChange}
                    isDisabled={
                      transactionTypeValue === "INCOME" ||
                      form.formState.isSubmitting
                    }
                  >
                    Is this a recurring bill?
                  </Checkbox>
                )}
              />
            </div>

            <Button
              variant="primary"
              type="submit"
              size="lg"
              isPending={form.formState.isSubmitting}
            >
              Add Transaction
            </Button>
          </form>
        )}
      </Dialog>
    </DialogTrigger>
  )
}
