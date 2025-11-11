import { IconType } from "react-icons"

type EmptyStateProps = {
  icon: IconType
  title: string
  description: string
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="grid justify-items-center gap-4 py-12 text-center">
      <div className="bg-disabled flex h-16 w-16 items-center justify-center rounded-full">
        <Icon className="text-fg-quaternary size-8" />
      </div>

      <div className="grid gap-1">
        <h2 className="text-primary text-center font-semibold">{title}</h2>
        <p className="text-tertiary text-center text-sm">{description}</p>
      </div>
    </div>
  )
}
