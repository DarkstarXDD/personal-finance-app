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
  },
  argTypes: {
    icon: { table: { disable: true } },
    ref: { table: { disable: true } },
    isInvalid: { control: "boolean" },
  },
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = {
  args: {
    icon: PiCurrencyDollarSimple,
  },
}

export const WithDescription: Story = {
  args: {
    description: "Helper text",
  },
}

export const WithErrorMessage: Story = {
  args: {
    errorMessage: "Field error message",
    isInvalid: true,
  },
}

export const All: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <TextField {...args} />
      <TextField {...args} icon={PiCurrencyDollarSimple} />
      <TextField {...args} description="Helper text" />
      <TextField {...args} errorMessage="Field error message" isInvalid />
    </div>
  ),
  parameters: { controls: { disable: true } },
}
