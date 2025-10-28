import { Meta, StoryObj } from "@storybook/nextjs-vite"

import FieldDescription from "@/components/ui/FieldDescription"

const meta = {
  title: "Components/UI/FieldDescription",
  component: FieldDescription,

  parameters: {
    docs: {
      description: {
        component:
          "Supportive helper text shown beneath a form field. Typically used inside TextField, SearchField, NumberField, Select, and RadioGroup.",
      },
    },
  },

  args: {
    children: "Help text",
  },

  argTypes: {
    children: {
      control: "text",
      description: "Text content to display as the description.",
      table: { type: { summary: "ReactNode" } },
    },
    className: {
      control: "text",
      table: { type: { summary: "string" } },
    },
  },
} satisfies Meta<typeof FieldDescription>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Help text",
  },
}
