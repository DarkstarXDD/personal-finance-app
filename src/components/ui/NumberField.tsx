import { type Ref } from "react"
import {
  NumberField as RacNumberField,
  Group as RacGroup,
  Input as RacInput,
  type NumberFieldProps as RacNumberFieldProps,
} from "react-aria-components"
import { type IconType } from "react-icons"
import { PiPlusBold, PiMinusBold } from "react-icons/pi"

import Button from "@/components/ui/Button"
import FieldDescription from "@/components/ui/FieldDescription"
import FieldError from "@/components/ui/FieldError"
import Label from "@/components/ui/Label"
import { cn } from "@/lib/utils"

type NumberFieldProps = Omit<RacNumberFieldProps, "children" | "className"> & {
  label?: string
  description?: string
  errorMessage?: string
  className?: string
  icon?: IconType
  ref?: Ref<HTMLInputElement>
}

export default function NumberField({
  label,
  description,
  errorMessage,
  isInvalid,
  isDisabled,
  icon: Icon,
  ref,
  ...props
}: NumberFieldProps) {
  const isIcon = !!Icon

  return (
    <RacNumberField
      minValue={0}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      className="grid justify-items-start gap-1.5"
      {...props}
    >
      <Label>{label}</Label>

      <RacGroup
        className={cn(
          "bg-primary border-primary relative flex min-h-11 w-full min-w-0 items-center justify-between rounded-lg border",

          // Focus styles
          "ring-brand rac-focus-within:ring rac-focus-within:border-brand",

          // Disabled styles
          "rac-disabled:bg-disabled_subtle rac-disabled:border-disabled rac-disabled:cursor-not-allowed",

          // Error styles
          "rac-invalid:border-error rac-invalid:ring-error rac-invalid:rac-focus-within:border-error"
        )}
      >
        {isIcon && (
          <Icon className="text-fg-tertiary pointer-events-none absolute left-4 block size-4" />
        )}

        <RacInput
          ref={ref}
          className={cn(
            "text-primary text-md rac-disabled:cursor-not-allowed placeholder:text-placeholder h-full min-w-0 px-3.5 py-2 leading-normal font-normal outline-none",
            isIcon && "pl-9.5"
          )}
        />

        <div className="border-primary flex h-full">
          <Button
            slot="decrement"
            variant="secondary"
            size="md"
            isDisabled={isDisabled}
            className="group rounded-none border-0 border-l"
          >
            <PiMinusBold className="text-fg-quaternary group-rac-hover:text-fg-quaternary_hover group-rac-pressed:scale-95 group-rac-pressed:text-fg-quaternary_hover size-5 transition-colors" />
          </Button>

          <Button
            slot="increment"
            variant="secondary"
            size="md"
            isDisabled={isDisabled}
            className="group rounded-none rounded-r-lg border-0 border-l"
          >
            <PiPlusBold className="text-fg-quaternary group-rac-hover:text-fg-quaternary_hover group-rac-pressed:scale-95 group-rac-pressed:text-fg-quaternary_hover size-5 transition-colors" />
          </Button>
        </div>
      </RacGroup>

      <FieldError>{errorMessage}</FieldError>

      {description && !isInvalid && (
        <FieldDescription>{description}</FieldDescription>
      )}
    </RacNumberField>
  )
}
