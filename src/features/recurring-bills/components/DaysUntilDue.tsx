import { DUE_SOON_THRESHOLD_DAYS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export default function DaysUntilDue({
  daysUntilDue,
  className,
}: {
  daysUntilDue: number
  className?: string
}) {
  const dueSoon = daysUntilDue <= DUE_SOON_THRESHOLD_DAYS

  if (dueSoon && daysUntilDue <= 0) {
    return (
      <p className={cn("text-error-primary text-sm", className)}>
        {`Due in 0 days`}
      </p>
    )
  }

  if (dueSoon && daysUntilDue === 1) {
    return (
      <p className={cn("text-error-primary text-sm", className)}>
        {`Due in 1 day`}
      </p>
    )
  }

  return (
    <p className={cn("text-sm", dueSoon && "text-error-primary", className)}>
      {`Due in ${daysUntilDue} days`}
    </p>
  )
}
