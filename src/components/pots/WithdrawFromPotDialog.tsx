import { ProgressBar } from "react-aria-components"
import { PiCurrencyDollarSimple } from "react-icons/pi"

import Button from "@/components/ui/Button"
import { DialogTrigger, Dialog } from "@/components/ui/Dialog"
import Label from "@/components/ui/Label"
import TextField from "@/components/ui/TextField"

export default function WithdrawFromPotDialog() {
  const target = "800"
  return (
    <DialogTrigger>
      <Button variant="secondary" className="w-full">
        Withdraw
      </Button>
      <Dialog title="Withdraw from ‘Savings’">
        <div className="grid gap-5">
          <p className="text-grey-500 text-sm leading-normal font-normal">
            Move money from your pot to your balance.
          </p>
          <ProgressBar
            value={800}
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
          <form className="grid gap-5">
            <TextField
              label="Amount to Withdraw"
              icon={PiCurrencyDollarSimple}
            />
            <Button type="submit" variant="primary">
              Confirm Withdrawal
            </Button>
          </form>
        </div>
      </Dialog>
    </DialogTrigger>
  )
}
