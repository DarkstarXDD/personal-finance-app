import { type Meta, type StoryObj } from "@storybook/nextjs-vite"

import FieldLabel from "@/components/ui/FieldLabel"

const meta = {
  title: "Components/UI/FieldLabel",
  component: FieldLabel,

  parameters: {
    docs: {
      description: {
        component:
          "Label for form controls. Typically used with TextField, SearchField, NumberField, Select, and RadioGroup.",
      },
    },
  },

  argTypes: {
    children: {
      description: "Text content to display as the label.",
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
    children: "Field Label",
  },
} satisfies Meta<typeof FieldLabel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
