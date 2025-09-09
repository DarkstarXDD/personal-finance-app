import { PiWarningCircleFill } from "react-icons/pi"

export default function FilteredEmptyState() {
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <PiWarningCircleFill className="text-grey-500 size-5" />
      <p className="text-grey-500 text-center text-sm leading-normal font-normal">
        No results match your filters.
      </p>
    </div>
  )
}
