import SearchField from "@/components/ui/SearchField"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/SearchField",
  component: SearchField,
  parameters: {
    docs: {
      description: {
        component: "Search input with a leading icon and a clear button.",
      },
    },
  },

  args: {
    label: "Search Field",
    placeholder: "Search",
  },

  argTypes: {
    label: {
      control: "text",
      description:
        "Label for the search field. If a visible label is not provided, an aria-label should be provided.",
      table: { type: { summary: "string" } },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the search field.",
      table: { type: { summary: "string" } },
    },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof SearchField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
