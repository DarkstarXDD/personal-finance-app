"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "motion/react"
import { useEffect } from "react"
import { ProgressBar } from "react-aria-components"
import { useForm, Controller } from "react-hook-form"

import Button from "@/components/ui/Button"
import { DialogTrigger, Dialog } from "@/components/ui/Dialog"
import NumberField from "@/components/ui/NumberField"
import { addToPot } from "@/features/pots/actions"
import { type Pot } from "@/features/pots/data-access"
import { potAmountUpdateSchema } from "@/lib/schemas"
import { setErrorsFromServer } from "@/lib/utils"

type AddToPotDialogProps = { pot: Pot }

export default function AddToPotDialog({ pot }: AddToPotDialogProps) {
  const form = useForm({
    resolver: zodResolver(potAmountUpdateSchema),
    defaultValues: { id: pot.id, amountToUpdate: 0 },
  })

  useEffect(() => {
    form.reset({ id: pot.id, amountToUpdate: 0 })
  }, [pot, form])

  const amountInInput = form.watch("amountToUpdate")
  const draftAmountInPot = pot.currentAmount + amountInInput

  return (
    <DialogTrigger>
      <Button variant="secondary" size="lg" className="w-full">
        + Add
      </Button>

      <Dialog
        title={`Add to ‘${pot.name}’`}
        description="Add money to your pot to grow your savings and get closer to your goal"
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

                return (
                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">New Amount</p>

                      <span className="text-primary text-2xl leading-tight font-semibold">
                        {valueText}
                      </span>
                    </div>

                    <div className="bg-quaternary flex h-3 rounded">
                      <motion.div
                        className="bg-brand-solid h-full shrink-0 rounded-l"
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

                    <div className="flex items-center justify-between text-xs font-medium">
                      <span>{Math.round(percentage ?? 0)}%</span>
                      <span>Target of ${pot.target}</span>
                    </div>
                  </div>
                )
              }}
            </ProgressBar>

            <form
              className="grid gap-6"
              onSubmit={form.handleSubmit(async (data) => {
                const response = await addToPot(data)
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
                    label="Amount to Add"
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
                type="submit"
                size="lg"
                isPending={form.formState.isSubmitting}
              >
                Confirm Addition
              </Button>
            </form>
          </div>
        )}
      </Dialog>
    </DialogTrigger>
  )
}
