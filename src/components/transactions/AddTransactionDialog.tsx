"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import { createTransaction } from "@/actions/transactions"
import Button from "@/components/ui/Button"
import Checkbox from "@/components/ui/Checkbox"
import { DialogTrigger, Dialog } from "@/components/ui/Dialog"
import NumberField from "@/components/ui/NumberField"
import { Select, SelectItem } from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"
import { transactionCreateSchema } from "@/lib/schemas"

import type { Category } from "@/data-access/lookups"
import type { TransactionCreateErrors } from "@/lib/types"

export default function AddTransactionDialog({
  categories,
}: {
  categories: Category[]
}) {
  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(transactionCreateSchema),
    defaultValues: {
      counterparty: "",
      amount: 0,
      categoryId: "",
      isRecurring: false,
    },
  })

  return (
    <DialogTrigger>
      <Button variant="primary">+ Add Transaction</Button>
      <Dialog title="Add New Transaction">
        {({ close }) => (
          <form
            className="grid gap-5"
            onSubmit={handleSubmit(async (data) => {
              const response = await createTransaction(data)
              if (response) {
                console.log(response)
                const errorKeys = Object.keys(
                  response
                ) as (keyof TransactionCreateErrors)[]
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
              Create a transaction to record your money flow.
            </p>
            <div className="grid gap-4">
              <Controller
                name="counterparty"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <TextField
                    label="Counterparty"
                    placeholder="e.g. Echo Game Store"
                    description="Max 30 characters"
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                    isDisabled={isSubmitting}
                  />
                )}
              />

              <Controller
                name="amount"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <NumberField
                    label="Transaction Amount"
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                    isDisabled={isSubmitting}
                    formatOptions={{ style: "currency", currency: "USD" }}
                  />
                )}
              />

              <Controller
                name="categoryId"
                control={control}
                render={({
                  field: { name, value, onChange, ref },
                  fieldState: { invalid, error },
                }) => (
                  <Select
                    label="Category"
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
                name="isRecurring"
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <Checkbox name={name} isSelected={value} onChange={onChange}>
                    Is this a recurring bill?
                  </Checkbox>
                )}
              />
            </div>
            <Button variant="primary" type="submit" isPending={isSubmitting}>
              Add Transaction
            </Button>
          </form>
        )}
      </Dialog>
    </DialogTrigger>
  )
}
