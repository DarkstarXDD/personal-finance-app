import { fn } from "storybook/test"

import IconButton from "@/components/ui/IconButton"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Buttons/IconButton",
  component: IconButton,

  parameters: {
    docs: {
      description: {
        component:
          "Compact, icon-only button for small actions. Renders a close or options icon and forwards standard button props.",
      },
    },
  },

  args: {
    isDisabled: false,
    onPress: fn(),
  },

  argTypes: {
    variant: {
      control: "select",
      description: "Visual variant selecting which icon to render.",
      options: ["close", "options"],
      table: {
        type: { summary: '"close" | "options"' },
        defaultValue: { summary: "close" },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Disable interactions and apply disabled styles.",
      table: { type: { summary: "boolean" } },
    },
    onPress: {
      action: "onPress",
      description: "Callback invoked when the button is pressed.",
      table: { type: { summary: "() => void" } },
    },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const CloseButton: Story = {
  args: { variant: "close" },
}

export const OptionsButton: Story = {
  args: { variant: "options" },
}
