import { tv } from "tailwind-variants"

export default function DaysUntilDue({
  daysUntilDue,
}: {
  daysUntilDue: number
}) {
  const componentStyles = tv({
    base: "text-grey-500 text-xs leading-normal font-normal",
    variants: {
      dueSoon: {
        true: "text-red",
      },
    },
  })

  const dueSoon = daysUntilDue < 8

  if (daysUntilDue === 1) {
    return <p className={componentStyles({ dueSoon })}>{`Due in 1 day`}</p>
  }

  if (daysUntilDue <= 0) {
    return <p className={componentStyles({ dueSoon })}>{`Due in 0 days`}</p>
  }

  return (
    <p className={componentStyles({ dueSoon })}>
      {`Due in ${daysUntilDue} days`}
    </p>
  )
}
