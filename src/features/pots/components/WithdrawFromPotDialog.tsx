"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "motion/react"
import { useEffect } from "react"
import { ProgressBar } from "react-aria-components"
import { useForm, Controller } from "react-hook-form"

import Button from "@/components/ui/Button"
import { DialogTrigger, Dialog } from "@/components/ui/Dialog"
import NumberField from "@/components/ui/NumberField"
import { withdrawFromPot } from "@/features/pots/actions"
import { type Pot } from "@/features/pots/data-access"
import { potAmountUpdateSchema } from "@/lib/schemas"
import { setErrorsFromServer } from "@/lib/utils"

type WithdrawFromPotDialogProps = { pot: Pot }

export default function WithdrawFromPotDialog({
  pot,
}: WithdrawFromPotDialogProps) {
  const form = useForm({
    resolver: zodResolver(potAmountUpdateSchema),
    defaultValues: { id: pot.id, amountToUpdate: 0 },
  })

  useEffect(() => {
    form.reset({ id: pot.id, amountToUpdate: 0 })
  }, [pot, form])

  const amountInInput = form.watch("amountToUpdate")
  const draftAmountInPot = pot.currentAmount - amountInInput

  return (
    <DialogTrigger>
      <Button variant="secondary" size="lg" className="w-full">
        - Withdraw
      </Button>

      <Dialog
        title={`Withdraw from ‘${pot.name}’`}
        description="Move money from your pot to your balance."
      >
        {({ close }) => (
          <div className="grid gap-5">
            <ProgressBar
              aria-label="New Amount"
              value={draftAmountInPot}
              minValue={0}
              maxValue={pot.target}
              formatOptions={{ style: "currency", currency: "USD" }}
            >
              {({ percentage, valueText }) => {
                const currentAmountAsPercentage = Math.round(
                  (pot.currentAmount / pot.target) * 100
                )

                const amountInInputAsPercentage = Math.round(
                  (amountInInput / pot.target) * 100
                )

                const draftAmountAsPercentage = Math.round(
                  percentage ?? 0 - amountInInputAsPercentage
                )

                return (
                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">New Amount</p>

                      <span className="text-primary text-2xl leading-tight font-semibold">
                        {valueText}
                      </span>
                    </div>

                    <div className="bg-quaternary flex h-2 rounded">
                      <motion.div
                        className="bg-brand-solid h-full shrink-0 rounded-l"
                        animate={{
                          width: draftAmountAsPercentage + "%",
                        }}
                      />
                      <motion.div
                        className={`bg-red h-full origin-right ${draftAmountInPot < 0 ? "rounded" : "rounded-r"}`}
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            draftAmountInPot < 0
                              ? currentAmountAsPercentage + "%"
                              : amountInInputAsPercentage + "%",
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs font-medium">
                      <span>{Math.round(percentage ?? 0)}%</span>
                      <span>Target of ${pot.target}</span>
                    </div>
                  </div>
                )
              }}
            </ProgressBar>

            <form
              className="grid gap-5"
              onSubmit={form.handleSubmit(async (data) => {
                const response = await withdrawFromPot(data)
                if (response) {
                  setErrorsFromServer(response, form)
                  return
                }
                close()
              })}
            >
              <input {...form.register("id")} type="hidden" />

              <Controller
                name="amountToUpdate"
                control={form.control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <NumberField
                    label="Amount to Withdraw"
                    {...field}
                    isInvalid={invalid}
                    errorMessage={error?.message}
                    isDisabled={form.formState.isSubmitting}
                    formatOptions={{ style: "currency", currency: "USD" }}
                  />
                )}
              />

              <Button
                variant="primary"
                size="lg"
                type="submit"
                isPending={form.formState.isSubmitting}
              >
                Confirm Withdrawal
              </Button>
            </form>
          </div>
        )}
      </Dialog>
    </DialogTrigger>
  )
}
