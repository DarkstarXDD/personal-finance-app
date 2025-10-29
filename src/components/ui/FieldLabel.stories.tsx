import FieldLabel from "@/components/ui/FieldLabel"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/FieldLabel",
  component: FieldLabel,

  parameters: {
    docs: {
      description: {
        component:
          "Label for form controls. Typically used inside TextField, SearchField, NumberField, Select, and RadioGroup.",
      },
    },
  },

  args: {
    children: "Field Label",
  },

  argTypes: {
    children: {
      control: "text",
      description: "Text content to display as the label.",
      table: { type: { summary: "ReactNode" } },
    },
    className: {
      control: "text",
      table: { type: { summary: "string" } },
    },
  },
} satisfies Meta<typeof FieldLabel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
