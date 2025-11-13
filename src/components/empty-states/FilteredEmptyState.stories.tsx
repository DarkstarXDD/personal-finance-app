import FilteredEmptyState from "@/components/empty-states/FilteredEmptyState"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/EmptyStates/FilteredEmptyState",
  component: FilteredEmptyState,

  parameters: {
    docs: {
      description: {
        component:
          "A UI to display when the user's search or filter query does not match any data in the database.",
      },
    },
  },

  argTypes: {
    message: {
      description:
        "Text to display as the message. If none provided, the default text will be used.",
      table: { defaultValue: { summary: "No results match your filters." } },
    },
  },
} satisfies Meta<typeof FilteredEmptyState>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
