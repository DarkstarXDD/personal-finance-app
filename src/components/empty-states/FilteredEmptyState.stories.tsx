import FilteredEmptyState from "@/components/empty-states/FilteredEmptyState"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/EmptyStates/FilteredEmptyState",
  component: FilteredEmptyState,

  argTypes: {
    message: { description: "Text to overwrite the default message. " },
  },
} satisfies Meta<typeof FilteredEmptyState>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
