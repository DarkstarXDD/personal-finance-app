import { type ReactNode } from "react"

import { cn } from "@/lib/utils"

type PageHeaderProps = {
  title: string
  description: string
  action?: ReactNode
  className?: string
}

export default function PageHeader({
  title,
  description,
  action: Action,
  className,
}: PageHeaderProps) {
  if (Action === undefined) {
    return (
      <div className="grid gap-1">
        <h1 className="text-primary text-3xl leading-tight font-semibold tracking-tight">
          {title}
        </h1>
        <p>{description}</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 items-start justify-items-start gap-4 md:grid-cols-[1fr_auto]",
        className
      )}
    >
      <div className="grid gap-1">
        <h1 className="text-primary text-3xl leading-tight font-semibold tracking-tight">
          {title}
        </h1>
        <p>{description}</p>
      </div>
      {Action}
    </div>
  )
}
