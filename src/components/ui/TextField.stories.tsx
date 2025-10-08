import { PiCurrencyDollarSimple } from "react-icons/pi"

import TextField from "@/components/ui/TextField"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/TextField",
  component: TextField,
  args: {
    label: "Text Field",
    placeholder: "Placeholder",
    isInvalid: false,
    isDisabled: false,
  },
  argTypes: {
    icon: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
  args: { description: "Helper text" },
}

export const WithErrorMessage: Story = {
  args: { errorMessage: "Field error message", isInvalid: true },
}

export const Disabled: Story = {
  args: { isDisabled: true },
}

export const WithIcon: Story = {
  args: { icon: PiCurrencyDollarSimple },
}

export const WithPasswordVisibilityToggle: Story = {
  args: { type: "password" },
}
