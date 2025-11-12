import { type Meta, type StoryObj } from "@storybook/nextjs-vite"

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

  argTypes: {
    children: {
      description: "Text content to display as the description.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    className: {
      description: "Optional class names to overide any styles.",
      control: "text",
      table: { type: { summary: "string" } },
    },
  },

  args: {
    children: "Help text",
  },
} satisfies Meta<typeof FieldDescription>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Help text",
  },
}
