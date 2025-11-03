import Checkbox from "@/components/ui/Checkbox"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Checkbox",
  component: Checkbox,

  parameters: {
    docs: {
      description: {
        component:
          "Compact animated checkbox used for boolean choices in forms.",
      },
    },
  },

  args: { children: "Checkbox Label", isDisabled: false },

  argTypes: {
    children: {
      control: "text",
      description: "Label text displayed next to the checkbox.",
      table: { type: { summary: "ReactNode" } },
    },
    isDisabled: {
      control: "boolean",
      description: "Disable interactions and apply disabled styles.",
      table: { type: { summary: "boolean" } },
    },
    onChange: {
      action: "onChange",
      description: "Callback fired when selection changes.",
      table: { type: { summary: "(checked: boolean) => void" } },
    },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: { isDisabled: true },
}
