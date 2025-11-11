import { PiWarningCircleFill } from "react-icons/pi"

type FilteredEmptyStateProps = { message?: string }

export default function FilteredEmptyState({
  message,
}: FilteredEmptyStateProps) {
  return (
    <div className="flex items-start justify-center gap-2 px-4 py-8">
      <PiWarningCircleFill className="text-fg-quaternary size-5" />
      <p className="text-tertiary text-center text-sm">
        {message ?? "No results match your filters."}
      </p>
    </div>
  )
}
