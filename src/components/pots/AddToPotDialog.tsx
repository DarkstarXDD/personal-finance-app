"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "motion/react"
import { useEffect } from "react"
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

export default function AddToPotDialog({
  potData: { potId, name, target, currentAmount },
}: {
  potData: Omit<PotSchema, "colorId" | "colorValue">
}) {
  const {
    handleSubmit,
    register,
    control,
    setError,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(potUpdateSchema),
    defaultValues: { potId, amountToUpdate: "" },
  })

  useEffect(() => {
    reset({ potId, amountToUpdate: "" })
  }, [potId, currentAmount, reset])

  const amountInInput = watch("amountToUpdate")
  const draftAmountInPot = Number(currentAmount) + Number(amountInInput)

  return (
    <DialogTrigger>
      <Button variant="secondary" className="w-full">
        + Add Money
      </Button>
      <Dialog title={`Add to ‘${name}’`}>
        {({ close }) => (
          <div className="grid gap-5">
            <p className="text-grey-500 text-sm leading-normal font-normal">
              Add money to your pot to grow your savings and get closer to your
              goal.
            </p>
            <ProgressBar
              value={draftAmountInPot}
              minValue={0}
              maxValue={Number(target)}
              formatOptions={{ style: "currency", currency: "USD" }}
            >
              {({ percentage, valueText }) => {
                const currentAmountAsPercentage = Math.round(
                  (Number(currentAmount) / Number(target)) * 100
                )

                const amountInInputAsPercentage = Math.round(
                  (Number(amountInInput) / Number(target)) * 100
                )

                return (
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label variant="secondary">New Amount</Label>
                      <span className="text-grey-900 text-3xl leading-tight font-bold">
                        {valueText}
                      </span>
                    </div>
                    <div className="bg-beige-100 flex h-2 rounded">
                      <motion.div
                        className="bg-grey-900 h-full shrink-0 rounded-l"
                        animate={{
                          width: currentAmountAsPercentage + "%",
                        }}
                      />
                      <motion.div
                        className="bg-green h-full origin-right rounded-r"
                        initial={{ width: 0 }}
                        animate={{
                          width: amountInInputAsPercentage + "%",
                        }}
                      />
                    </div>
                    <div className="text-grey-500 flex items-center justify-between text-xs leading-normal">
                      <span className="font-bold">
                        {Math.round(percentage ?? 0)}%
                      </span>
                      <span className="font-normal">Target of ${target}</span>
                    </div>
                  </div>
                )
              }}
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
                    label="Amount to Add"
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
                Confirm Addition
              </Button>
            </form>
          </div>
        )}
      </Dialog>
    </DialogTrigger>
  )
}
