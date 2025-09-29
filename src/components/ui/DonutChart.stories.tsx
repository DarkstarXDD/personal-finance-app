import DonutChart from "@/components/ui/DonutChart"

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
      { label: "Slice 1", current: 0, target: 25, color: "#606c38" },
      { label: "Slice 2", current: 10, target: 35, color: "#283618" },
      { label: "Slice 3", current: 2, target: 15, color: "#dda15e" },
      { label: "Slice 4", current: 6, target: 25, color: "#bc6c25" },
    ],
  },
}

export const SingleSlice: Story = {
  args: {
    chartData: [{ label: "Single", current: 3, target: 100, color: "#dda15e" }],
  },
}
