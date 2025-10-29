"use client"

import { type Ref } from "react"
import {
  TextField as RacTextField,
  type TextFieldProps as RacTextFieldProps,
} from "react-aria-components"
import { type IconType } from "react-icons"

import FieldDescription from "@/components/ui/FieldDescription"
import FieldError from "@/components/ui/FieldError"
import Input from "@/components/ui/Input"
import Label from "@/components/ui/Label"

type TextFieldProps = RacTextFieldProps & {
  label?: string
  icon?: IconType
  placeholder?: string
  description?: string
  errorMessage?: string
  ref?: Ref<HTMLInputElement>
}

export default function TextField({
  label,
  icon: Icon,
  placeholder,
  description,
  errorMessage,
  isInvalid,
  ref,
  type,
  ...props
}: TextFieldProps) {
  return (
    <RacTextField
      className="grid w-full justify-items-start gap-1.5"
      isInvalid={isInvalid}
      {...props}
    >
      <Label>{label}</Label>

      <Input icon={Icon} {...{ placeholder, ref, type }} />

      <FieldError>{errorMessage}</FieldError>

      {description && !isInvalid && (
        <FieldDescription>{description}</FieldDescription>
      )}
    </RacTextField>
  )
}
