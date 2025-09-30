import { Select, SelectItem } from "@/components/ui/Select"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Select",
  component: Select,
  parameters: {
    layout: "padded",
  },
  args: {
    label: "Label",
    shouldHideOnMobile: false,
    errorMessage: "Field error message",
    isInvalid: false,
    isDisabled: false,
  },
  argTypes: {
    items: { table: { disable: true } },
    children: { table: { disable: true } },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectItem>Apple</SelectItem>
      <SelectItem>Banana</SelectItem>
      <SelectItem>Mango</SelectItem>
      <SelectItem>Orange</SelectItem>
    </Select>
  ),
}

export const HiddenInMobile: Story = {
  args: {
    shouldHideOnMobile: true,
  },

  render: (args) => (
    <Select {...args}>
      <SelectItem>Apple</SelectItem>
      <SelectItem>Banana</SelectItem>
      <SelectItem>Mango</SelectItem>
      <SelectItem>Orange</SelectItem>
    </Select>
  ),
}

export const WithDescription: Story = {
  args: {
    description: "Helper text",
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem>Apple</SelectItem>
      <SelectItem>Banana</SelectItem>
      <SelectItem>Mango</SelectItem>
      <SelectItem>Orange</SelectItem>
    </Select>
  ),
}

export const WithErrorMessage: Story = {
  args: {
    description: "Helper text",
    errorMessage: "Field error message",
    isInvalid: true,
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem>Apple</SelectItem>
      <SelectItem>Banana</SelectItem>
      <SelectItem>Mango</SelectItem>
      <SelectItem>Orange</SelectItem>
    </Select>
  ),
}
