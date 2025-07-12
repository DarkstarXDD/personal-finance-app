import {
  TextField as RacTextField,
  Input as RacInput,
  type TextFieldProps as RacTextFieldProps,
  FieldError as RacFieldError,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import FieldDescription from "@/components/ui/FieldDescription"
import Label from "@/components/ui/Label"

import type { IconType } from "react-icons"

export default function TextField({
  label,
  icon: Icon,
  placeholder,
  description,
  errorMessage,
  isInvalid,
  ...props
}: RacTextFieldProps & {
  label?: string
  icon?: IconType
  placeholder?: string
  description?: string
  errorMessage?: string
}) {
  const inputStyles = tv({
    base: "border-beige-500 placeholder:text-beige-500 rac-invalid:border-red rac-invalid:ring-red rac-focus:ring-2 ring-beige-500 text-grey-900 w-full min-w-0 rounded-lg border px-5 py-3 text-sm leading-normal font-normal transition-colors outline-none",
    variants: {
      isIcon: {
        true: "pl-12",
      },
    },
  })

  return (
    <RacTextField
      className="grid justify-items-start gap-1"
      isInvalid={isInvalid}
      {...props}
    >
      <Label>{label}</Label>
      <div className="relative w-full">
        {Icon && (
          <Icon className="text-beige-500 absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2" />
        )}
        <RacInput
          placeholder={placeholder}
          className={inputStyles({ isIcon: !!Icon })}
        />
      </div>
      <RacFieldError className="text-red text-xs leading-normal font-normal">
        {errorMessage}
      </RacFieldError>
      {description && !isInvalid && (
        <FieldDescription description={description} />
      )}
    </RacTextField>
  )
}
