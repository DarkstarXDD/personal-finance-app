import DonutChart from "@/components/ui/DonutChart"
import { colors } from "@/lib/data"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/DonutChart",
  component: DonutChart,

  argTypes: {
    chartData: {
      description:
        "Array of data slices for the donut chart. Each slice should have a label, current value, target value and color.",
      table: {
        type: {
          summary: "Array<Slice>",
          detail:
            "{\n  label: string;\n  current: number;\n  target: number;\n  color: string;\n}",
        },
      },
    },
  },
} satisfies Meta<typeof DonutChart>

export default meta

type Story = StoryObj<typeof meta>

export const MultipleSlices: Story = {
  args: {
    chartData: [
      { label: "Slice 1", current: 0, target: 25, color: colors[0].value },
      { label: "Slice 2", current: 10, target: 35, color: colors[1].value },
      { label: "Slice 3", current: 2, target: 15, color: colors[2].value },
      { label: "Slice 4", current: 6, target: 25, color: colors[3].value },
    ],
  },
}

export const SingleSlice: Story = {
  args: {
    chartData: [{ label: "Single", current: 3, target: 100, color: "#dda15e" }],
  },
}
