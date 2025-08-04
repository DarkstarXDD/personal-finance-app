import { fn } from "storybook/test"

import IconButton from "@/components/ui/IconButton"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Buttons/IconButton",
  component: IconButton,
  args: {
    isDisabled: false,
    onPress: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      description: "Controls which icon gets rendered.",
      options: ["close", "options"],
      table: {
        type: { summary: '"close" | "options"' },
        defaultValue: { summary: "close" },
      },
    },
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
