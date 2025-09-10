import { Ref } from "react"
import {
  NumberField as RacNumberField,
  Group as RacGroup,
  Input as RacInput,
  Button as RacButton,
  type NumberFieldProps as RacNumberFieldProps,
} from "react-aria-components"
import { PiCaretUpFill, PiCaretDownFill } from "react-icons/pi"

import FieldDescription from "@/components/ui/FieldDescription"
import FieldError from "@/components/ui/FieldError"
import Label from "@/components/ui/Label"

type NumberFieldProps = Omit<RacNumberFieldProps, "children" | "className"> & {
  label?: string
  description?: string
  errorMessage?: string
  className?: string
  ref?: Ref<HTMLInputElement>
}

export default function NumberField({
  label,
  description,
  errorMessage,
  isInvalid,
  ref,
  ...props
}: NumberFieldProps) {
  return (
    <RacNumberField
      isInvalid={isInvalid}
      className="grid justify-items-start gap-1"
      {...props}
    >
      <Label>{label}</Label>

      <RacGroup className="border-beige-500 rac-focus-within:ring-2 ring-beige-500 rac-disabled:opacity-40 rac-invalid:border-red rac-invalid:ring-red flex w-full min-w-0 justify-between rounded-lg border transition-colors">
        <RacInput
          ref={ref}
          className="text-grey-900 min-w-0 flex-1 rounded-l-lg px-5 py-3 text-sm leading-normal font-normal outline-none"
        />

        <div className="border-beige-500 grid border-l">
          <RacButton
            slot="increment"
            className="rac-hover:bg-beige-300 group rac-pressed:bg-beige-300 border-beige-500 cursor-pointer rounded-tr-lg border-b px-3 transition-colors"
          >
            <PiCaretUpFill className="text-grey-500 group-rac-pressed:scale-95 size-5" />
          </RacButton>
          <RacButton
            slot="decrement"
            className="rac-hover:bg-beige-300 group rac-pressed:bg-beige-300 cursor-pointer rounded-br-lg px-3 transition-colors"
          >
            <PiCaretDownFill className="text-grey-500 group-rac-pressed:scale-95 size-5" />
          </RacButton>
        </div>
      </RacGroup>

      <FieldError>{errorMessage}</FieldError>
      {description && !isInvalid && (
        <FieldDescription>{description}</FieldDescription>
      )}
    </RacNumberField>
  )
}
