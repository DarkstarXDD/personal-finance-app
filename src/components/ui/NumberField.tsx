import {
  NumberField as RacNumberField,
  Group as RacGroup,
  Input as RacInput,
  // Button as RacButton,
  type NumberFieldProps as RacNumberFieldProps,
} from "react-aria-components"

import FieldDescription from "@/components/ui/FieldDescription"
import FieldError from "@/components/ui/FieldError"
import Label from "@/components/ui/Label"

type NumberFieldProps = Omit<RacNumberFieldProps, "children" | "className"> & {
  label?: string
  description?: string
  errorMessage?: string
  className?: string
}

export default function NumberField({
  label,
  description,
  errorMessage,
  isInvalid,
  ...props
}: NumberFieldProps) {
  return (
    <RacNumberField
      isInvalid={isInvalid}
      className="grid justify-items-start gap-1"
      {...props}
    >
      <Label>{label}</Label>
      <RacGroup>
        <RacInput className="border-beige-500 rac-disabled:opacity-40 placeholder:text-beige-500 rac-invalid:border-red rac-invalid:ring-red rac-focus:ring-2 ring-beige-500 text-grey-900 w-full min-w-0 rounded-lg border px-5 py-3 text-sm leading-normal font-normal transition-colors outline-none" />
      </RacGroup>
      <FieldError>{errorMessage}</FieldError>
      {description && !isInvalid && (
        <FieldDescription>{description}</FieldDescription>
      )}
    </RacNumberField>
  )
}
