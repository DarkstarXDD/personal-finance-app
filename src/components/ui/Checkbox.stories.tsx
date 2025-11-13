import { type Meta, type StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import Checkbox from "@/components/ui/Checkbox"

const meta = {
  title: "Components/UI/Checkbox",
  component: Checkbox,

  parameters: {
    docs: {
      description: {
        component:
          "Used for boolean choices in forms. The checkmark has a small animation.",
      },
    },
  },

  argTypes: {
    children: {
      description: "Label text displayed next to the checkbox.",
      control: "text",
    },
    isDisabled: {
      description: "Disable interactions and apply disabled styles.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    onChange: {
      description: "Callback to invoke when selection changes.",
      table: { type: { summary: "(checked: boolean) => void" } },
    },
    className: {
      description:
        "Optional class names to overide any styles. Classes are passed to the wrapper element of the checkbox and the label.",
    },
  },

  args: {
    children: "Checkbox Label",
    isDisabled: false,
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: { isDisabled: true },
}
