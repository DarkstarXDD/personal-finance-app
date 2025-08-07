"use client"

import { ProgressBar } from "react-aria-components"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import IconButton from "@/components/ui/IconButton"
import Label from "@/components/ui/Label"

import type { PotSchema } from "@/lib/schemas"

export default function PotCard({ name, target, theme }: PotSchema) {
  return (
    <Card padding="sm">
      <div className="grid gap-8">
        <div className="flex items-center justify-start gap-4">
          <span
            className="size-4 rounded-full"
            style={{ backgroundColor: theme }}
          />
          <Heading variant="secondary" as="h2">
            {name}
          </Heading>
          <IconButton variant="options" className="ml-auto" />
        </div>
        <ProgressBar
          value={159}
          minValue={0}
          maxValue={Number(target)}
          formatOptions={{ style: "currency", currency: "USD" }}
        >
          {({ percentage, valueText }) => (
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label variant="secondary">Total Saved</Label>
                <span className="text-grey-900 text-3xl leading-tight font-bold">
                  {valueText}
                </span>
              </div>
              <div className="bg-beige-100 h-2 rounded">
                <div
                  className="h-full rounded"
                  style={{ backgroundColor: theme, width: percentage + "%" }}
                />
              </div>
              <div className="text-grey-500 flex items-center justify-between text-xs leading-normal">
                <span className="font-bold">{percentage}%</span>
                <span className="font-normal">Target of ${target}</span>
              </div>
            </div>
          )}
        </ProgressBar>
        <div className="flex justify-center gap-4">
          <Button variant="secondary" className="w-full">
            + Add Money
          </Button>
          <Button variant="secondary" className="w-full">
            Withdraw
          </Button>
        </div>
      </div>
    </Card>
  )
}
