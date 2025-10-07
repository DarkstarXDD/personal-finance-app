export default function MetricItem({
  label,
  value,
  color,
}: {
  label: string
  value: string | number
  color: string
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
      <div
        className="row-span-2 h-full w-1 rounded-lg"
        aria-hidden
        style={{ backgroundColor: color }}
      />
      <p className="text-grey-500 text-xs leading-normal font-normal">
        {label}
      </p>
      <p className="text-grey-900 text-sm leading-normal font-bold">{value}</p>
    </div>
  )
}
