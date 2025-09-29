"use client"

import * as d3 from "d3"
import { useState } from "react"

import { currencyFormatter } from "@/lib/utils"

const WIDTH = 240
const HEIGHT = 240
const RADIUS = Math.min(WIDTH, HEIGHT) / 2

type Slice = { label: string; current: number; target: number; color: string }

export default function DonutChart({ chartData }: { chartData: Slice[] }) {
  const [hovered, setHovered] = useState<Slice | null>(null)

  const totalCurrent = chartData.reduce(
    (acc, current) => acc + current.current,
    0
  )

  const totaltarget = chartData.reduce(
    (acc, current) => acc + current.target,
    0
  )

  const pieGenerator = d3.pie<Slice>().value((d) => d.target)
  const arcAngles = pieGenerator(chartData)

  const arcGenerator = d3
    .arc<d3.PieArcDatum<Slice>>()
    .innerRadius(RADIUS * 0.6)
    .outerRadius(RADIUS)

  return (
    <div className="relative flex justify-center">
      <svg width={WIDTH} height={HEIGHT}>
        <g transform={`translate(${WIDTH / 2}, ${HEIGHT / 2})`}>
          {arcAngles.map((arcAngle) => (
            <path
              key={arcAngle.index}
              d={arcGenerator(arcAngle)!}
              fill={arcAngle.data.color}
              onMouseEnter={() => setHovered(arcAngle.data)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </g>
      </svg>

      {hovered && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-grey-900 text-center text-base leading-normal font-semibold">
            {hovered.label}
          </p>
          <p className="text-grey-900 text-center text-base leading-normal font-medium">
            {currencyFormatter.format(hovered.target)}
          </p>
        </div>
      )}

      {!hovered && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="grid content-start justify-items-center gap-2">
            <span className="text-grey-900 text-xl leading-tight font-bold">
              {currencyFormatter.format(totalCurrent)}
            </span>
            <span className="text-grey-500 text-sm leading-normal font-normal">
              of {currencyFormatter.format(totaltarget)}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
