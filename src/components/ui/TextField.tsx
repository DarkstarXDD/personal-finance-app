"use client"
import { useState } from "react"
import { type Ref } from "react"
import { Button as RacButton } from "react-aria-components"
import {
  TextField as RacTextField,
  Input as RacInput,
  type TextFieldProps as RacTextFieldProps,
  type InputProps as RacInputProps,
} from "react-aria-components"
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi"
import { tv } from "tailwind-variants"

import FieldDescription from "@/components/ui/FieldDescription"
import FieldError from "@/components/ui/FieldError"
import Label from "@/components/ui/Label"

import type { IconType } from "react-icons"

export const inputStyles = tv({
  base: "border-beige-500 rac-disabled:opacity-40 placeholder:text-beige-500 rac-invalid:border-red rac-invalid:ring-red rac-focus:ring-2 ring-beige-500 text-grey-900 w-full min-w-0 rounded-lg border px-5 py-3 text-base leading-normal font-normal transition-colors outline-none",
  variants: {
    isIcon: {
      true: "pl-12",
    },
    isPassword: {
      true: "pr-12",
    },
  },
})

type InputType = Pick<RacInputProps, "type">["type"]

function getInputType(type: InputType, showEye: boolean | undefined) {
  if (showEye === true) return "text"
  if (showEye === false) return "password"
  else return type
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
}: RacTextFieldProps & {
  label?: string
  icon?: IconType
  placeholder?: string
  description?: string
  errorMessage?: string
  ref?: Ref<HTMLInputElement>
}) {
  const [showEye, setShowEye] = useState<boolean | undefined>(undefined)

  return (
    <RacTextField
      className="grid w-full justify-items-start gap-1"
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
          className={inputStyles({
            isIcon: !!Icon,
            isPassword: type === "password",
          })}
          ref={ref}
          type={getInputType(type, showEye)}
        />
        {type === "password" && (
          <RacButton
            onPress={() => setShowEye((prev) => !prev)}
            aria-label={showEye ? "Hide content" : "Show content"}
            className="text-beige-500 rac-focus-visible:ring-2 ring-beige-500 rac-hover:text-grey-500 rac-pressed:text-grey-500 absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-full p-1 outline-none"
          >
            {showEye ? (
              <PiEyeFill className="size-5" />
            ) : (
              <PiEyeSlashFill className="size-5" />
            )}
          </RacButton>
        )}
      </div>
      <FieldError>{errorMessage}</FieldError>
      {description && !isInvalid && (
        <FieldDescription>{description}</FieldDescription>
      )}
    </RacTextField>
  )
}
