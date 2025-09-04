import type { ReactNode } from "react"

export function Metrics({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <dl className={className}>{children}</dl>
}

export function MetricItem({
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
      <span
        className="row-span-2 h-full w-1 rounded-lg"
        style={{ backgroundColor: color }}
      />
      <dt className="text-grey-500 text-xs leading-normal font-normal">
        {label}
      </dt>
      <dd className="text-grey-900 text-sm leading-normal font-bold">
        {value}
      </dd>
    </div>
  )
}
