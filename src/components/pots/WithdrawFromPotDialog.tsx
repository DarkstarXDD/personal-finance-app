"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ProgressBar } from "react-aria-components"
import { useForm, Controller } from "react-hook-form"
import { PiCurrencyDollarSimple } from "react-icons/pi"

import { withdrawFromPot } from "@/actions/pots"
import Button from "@/components/ui/Button"
import { DialogTrigger, Dialog } from "@/components/ui/Dialog"
import Label from "@/components/ui/Label"
import TextField from "@/components/ui/TextField"
import { potUpdateSchema, type PotSchema } from "@/lib/schemas"
import { WithdrawFromPotErrors } from "@/lib/types"

export default function WithdrawFromPotDialog({
  potData: { potId, name, target, currentAmount },
}: {
  potData: Omit<PotSchema, "colorId" | "colorValue">
}) {
  const {
    handleSubmit,
    register,
    control,
    setError,
    // reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(potUpdateSchema),
    defaultValues: { potId, amountToUpdate: "" },
  })

  return (
    <DialogTrigger>
      <Button variant="secondary" className="w-full">
        Withdraw
      </Button>
      <Dialog title={`Withdraw from ‘${name}’`}>
        <div className="grid gap-5">
          <p className="text-grey-500 text-sm leading-normal font-normal">
            Move money from your pot to your balance.
          </p>
          <ProgressBar
            value={Number(currentAmount)}
            minValue={0}
            maxValue={Number(target)}
            formatOptions={{ style: "currency", currency: "USD" }}
          >
            {({ percentage, valueText }) => (
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label variant="secondary">New Amount</Label>
                  <span className="text-grey-900 text-3xl leading-tight font-bold">
                    {valueText}
                  </span>
                </div>
                <div className="bg-beige-100 h-2 rounded">
                  <div
                    className="bg-grey-900 h-full rounded"
                    style={{ width: percentage + "%" }}
                  />
                </div>
                <div className="text-grey-500 flex items-center justify-between text-xs leading-normal">
                  <span className="font-bold">
                    {Math.round(percentage ?? 0)}%
                  </span>
                  <span className="font-normal">Target of ${target}</span>
                </div>
              </div>
            )}
          </ProgressBar>
          <form
            className="grid gap-5"
            onSubmit={handleSubmit(async (data) => {
              const response = await withdrawFromPot(data)
              if (response) {
                const errorKeys = Object.keys(
                  response
                ) as (keyof WithdrawFromPotErrors)[]
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
            <input {...register("potId")} type="hidden" />
            <Controller
              name="amountToUpdate"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <TextField
                  label="Amount to Withdraw"
                  icon={PiCurrencyDollarSimple}
                  placeholder="0"
                  {...field}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  isDisabled={isSubmitting}
                />
              )}
            />

            <Button type="submit" variant="primary" isPending={isSubmitting}>
              Confirm Withdrawal
            </Button>
          </form>
        </div>
      </Dialog>
    </DialogTrigger>
  )
}
