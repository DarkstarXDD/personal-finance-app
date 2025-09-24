import { PiWarningCircleFill } from "react-icons/pi"

export default function FilteredEmptyState({ message }: { message?: string }) {
  return (
    <div className="flex items-start justify-center gap-2 px-4 py-8">
      <PiWarningCircleFill className="text-grey-500 size-5 shrink-0" />
      <p className="text-grey-500 text-center text-sm leading-normal font-normal">
        {message ?? "No results match your filters."}
      </p>
    </div>
  )
}
