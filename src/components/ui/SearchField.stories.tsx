import SearchField from "@/components/ui/SearchField"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/SearchField",
  component: SearchField,

  argTypes: {
    label: {
      description:
        "Label for the search field. If a visible label is not provided, an aria-label should be provided.",
    },
    placeholder: { description: "Placeholder for the search field." },
  },

  args: {
    label: "Search Field",
  },
} satisfies Meta<typeof SearchField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
