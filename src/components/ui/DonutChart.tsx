"use client"

import * as d3 from "d3"
import { useState } from "react"

import { currencyFormatter } from "@/lib/utils"

const WIDTH = 240
const HEIGHT = 240
const RADIUS = Math.min(WIDTH, HEIGHT) / 2

type Slice = { label: string; value: number; color: string }

export default function DonutChart({ chartData }: { chartData: Slice[] }) {
  const [hovered, setHovered] = useState<Slice | null>(null)

  const pieGenerator = d3.pie<Slice>().value((d) => d.value)
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
        <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs">
          <p className="text-grey-900 text-center text-base leading-normal font-semibold">
            {hovered.label}
          </p>
          <p className="text-grey-900 text-center text-base leading-normal font-medium">
            {currencyFormatter.format(hovered.value)}
          </p>
        </div>
      )}
    </div>
  )
}
