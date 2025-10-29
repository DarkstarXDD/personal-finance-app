"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "motion/react"
import { useEffect } from "react"
import { ProgressBar } from "react-aria-components"
import { useForm, Controller } from "react-hook-form"

import { withdrawFromPot } from "@/actions/pots"
import Button from "@/components/ui/Button"
import { DialogTrigger, Dialog } from "@/components/ui/Dialog"
import Label from "@/components/ui/FieldLabel"
import NumberField from "@/components/ui/NumberField"
import { potAmountUpdateSchema } from "@/lib/schemas"
import { setErrorsFromServer } from "@/lib/utils"

import type { Pot } from "@/data-access/pots"

export default function WithdrawFromPotDialog({ pot }: { pot: Pot }) {
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
      <Button variant="secondary" className="w-full">
        Withdraw
      </Button>
      <Dialog title={`Withdraw from ‘${pot.name}’`}>
        {({ close }) => (
          <div className="grid gap-5">
            <p className="text-grey-500 text-sm leading-normal font-normal">
              Move money from your pot to your balance.
            </p>
            <ProgressBar
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
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label>New Amount</Label>
                      <span className="text-grey-900 text-3xl leading-tight font-bold">
                        {valueText}
                      </span>
                    </div>
                    <div className="bg-beige-100 flex h-2 rounded">
                      <motion.div
                        className="bg-grey-900 h-full shrink-0 rounded-l"
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
                    <div className="text-grey-500 flex items-center justify-between text-xs leading-normal">
                      <span className="font-bold">
                        {Math.round(percentage ?? 0)}%
                      </span>
                      <span className="font-normal">
                        Target of ${pot.target}
                      </span>
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
                type="submit"
                variant="primary"
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
