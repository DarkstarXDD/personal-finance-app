import { Text as RacText } from "react-aria-components"
import { tv } from "tailwind-variants"

const descriptionStyles = tv({
  base: "text-grey-500 block w-full text-end text-xs leading-normal font-normal",
})

export default function FieldDescription({
  description,
  className,
}: {
  description: string
  className?: string
}) {
  return (
    <RacText slot="description" className={descriptionStyles({ className })}>
      {description}
    </RacText>
  )
}
