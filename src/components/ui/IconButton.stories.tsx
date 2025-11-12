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
          "Icon-only button for small actions such as Dialog close and Options menu trigger.",
      },
    },
  },

  argTypes: {
    variant: {
      description: "Visual variant selecting which icon to render.",
      control: "select",
      options: ["close", "options"],
      table: {
        type: { summary: '"close" | "options"' },
        defaultValue: { summary: "close" },
      },
    },
    isDisabled: {
      description: "Disable interactions and apply disabled styles.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    onPress: {
      action: "onPress",
      description:
        "Callback to invoke when the button is pressed. Same as `onClick`.",
      table: { type: { summary: "(e: PressEvent) => void" } },
    },
    className: {
      description: "Optional class names to overide any styles.",
    },
  },

  args: {
    variant: "close",
    isDisabled: false,
    onPress: fn(),
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
