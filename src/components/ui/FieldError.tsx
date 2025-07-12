import { FieldError as RacFieldError } from "react-aria-components"
import { tv } from "tailwind-variants"

const fieldErrorStyles = tv({
  base: "text-red text-xs leading-normal font-normal",
})

export default function FieldError({
  errorMessage,
  className,
}: {
  errorMessage: string | undefined
  className?: string
}) {
  return (
    <RacFieldError className={fieldErrorStyles({ className })}>
      {errorMessage}
    </RacFieldError>
  )
}
