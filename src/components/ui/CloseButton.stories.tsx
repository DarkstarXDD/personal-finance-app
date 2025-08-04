import { fn } from "storybook/test"

import CloseButton from "@/components/ui/CloseButton"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Buttons/CloseButton",
  component: CloseButton,
  args: {
    isDisabled: false,
    onPress: fn(),
  },
} satisfies Meta<typeof CloseButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
