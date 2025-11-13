import { type Meta, type StoryObj } from "@storybook/nextjs-vite"

import SearchField from "@/components/ui/SearchField"

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

  argTypes: {
    label: {
      description:
        "Label for the search field. If a visible label is not provided, an aria-label should be provided.",
    },
    placeholder: {
      description: "Placeholder text shown inside the search field.",
    },
    className: {
      description:
        "Optional class names to overide any styles. Classes are passed to the wrapper element.",
      table: { type: { summary: "string" } },
    },
  },

  args: {
    label: "Search Field",
    placeholder: "Search",
  },
} satisfies Meta<typeof SearchField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
