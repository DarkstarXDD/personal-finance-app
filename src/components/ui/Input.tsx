import { type Ref, useState } from "react"
import {
  Input as RacInput,
  Button as RacButton,
  type InputProps as RacInputProps,
  type TextFieldProps as RacTextFieldProps,
} from "react-aria-components"
import { type IconType } from "react-icons"
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi"

import { cn } from "@/lib/utils"

type InputType = Pick<RacTextFieldProps, "type">["type"]

type InputProps = Omit<RacInputProps, "type" | "className"> & {
  /** Allowed input types. */
  type?: InputType
  /** Icon to display on the left side of the input. */
  icon?: IconType
  /** Additional Classnames passed directly to the input. */
  className?: string
  ref?: Ref<HTMLInputElement>
}

function getInputType(type: InputType, showPassword: boolean) {
  return type === "password" && showPassword ? "text" : type
}

export default function Input({
  type = "text",
  icon: Icon,
  className,
  ref,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const isIcon = !!Icon

  return (
    <div className="relative flex w-full flex-row items-center">
      {isIcon && (
        <Icon className="text-fg-quaternary pointer-events-none absolute left-4 block size-4" />
      )}

      <RacInput
        {...props}
        ref={ref}
        type={getInputType(type, showPassword)}
        className={cn(
          "text-primary text-md bg-primary border-primary placeholder:text-placeholder flex min-h-11 w-full min-w-0 items-center gap-2 rounded-lg border px-3.5 py-2 leading-normal font-normal outline-none",

          // Focus styles
          "rac-focus:border-brand rac-focus:ring ring-brand",

          // Disabled styles
          "rac-disabled:bg-disabled_subtle rac-disabled:border-disabled rac-disabled:text-disabled_subtle rac-disabled:placeholder:text-disabled_subtle",

          // Error styles
          "rac-invalid:border-error rac-invalid:ring-error rac-invalid:rac-focus:border-error",

          isIcon && "pl-9.5",

          type === "password" && "pr-12.5",

          className
        )}
      />

      {type === "password" && (
        <RacButton
          onPress={() => setShowPassword((value) => !value)}
          aria-label={showPassword ? "Hide content" : "Show content"}
          className="text-fg-quaternary rac-focus-visible:ring-2 ring-brand rac-hover:text-fg-quaternary_hover rac-pressed:text-fg-quaternary_hover absolute right-4 cursor-pointer rounded-full p-1 outline-none"
        >
          {showPassword ? (
            <PiEyeFill className="size-5" />
          ) : (
            <PiEyeSlashFill className="size-5" />
          )}
        </RacButton>
      )}
    </div>
  )
}
