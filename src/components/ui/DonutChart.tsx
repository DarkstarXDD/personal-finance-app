"use client"

import * as d3 from "d3"

const WIDTH = 240
const HEIGHT = 240
const RADIUS = Math.min(WIDTH, HEIGHT) / 2

type Slice = { label: string; value: number; color: string }

export default function DonutChart({ chartData }: { chartData: Slice[] }) {
  const pieGenerator = d3.pie<Slice>().value((d) => d.value)
  const arcAngles = pieGenerator(chartData)

  const arcGenerator = d3
    .arc<d3.PieArcDatum<Slice>>()
    .innerRadius(RADIUS * 0.6)
    .outerRadius(RADIUS)

  return (
    <div className="flex justify-center">
      <svg width={WIDTH} height={HEIGHT}>
        <g transform={`translate(${WIDTH / 2}, ${HEIGHT / 2})`}>
          {arcAngles.map((arcAngle) => (
            <path
              key={arcAngle.index}
              d={arcGenerator(arcAngle)!}
              fill={arcAngle.data.color}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
