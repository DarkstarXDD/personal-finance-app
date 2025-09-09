import { Metrics, MetricItem } from "@/components/ui/Metrics"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Metrics",
  component: Metrics,
} satisfies Meta<typeof Metrics>

export default meta

type Story = StoryObj<typeof Metrics>

export const Default: Story = {
  render: () => (
    <Metrics className="grid grid-cols-2 gap-10">
      <MetricItem label="Item 1" value="$12,300" color="#277c78" />
      <MetricItem label="Item 2" value="$4,500" color="#af81ba" />
      <MetricItem label="Item 3" value="$7,800" color="#f2cdac" />
      <MetricItem label="Item 4" value="$7,800" color="#597c7c" />
    </Metrics>
  ),
}
