import DonutChart from "@/components/ui/DonutChart"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/DonutChart",
  component: DonutChart,

  argTypes: {
    chartData: {
      description:
        "Array of data slices for the donut chart. Each slice should have a label, value, and color.",
      table: {
        type: {
          summary: "Array<Slice>",
          detail: "{\n  label: string;\n  value: number;\n  color: string;\n}",
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
      { label: "Slice 1", value: 25, color: "#606c38" },
      { label: "Slice 2", value: 35, color: "#283618" },
      { label: "Slice 3", value: 15, color: "#dda15e" },
      { label: "Slice 4", value: 25, color: "#bc6c25" },
    ],
  },
}

export const SingleSlice: Story = {
  args: {
    chartData: [{ label: "Single", value: 100, color: "#dda15e" }],
  },
}
