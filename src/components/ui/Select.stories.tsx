import { Select, SelectItem } from "@/components/ui/Select"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: Select,
  parameters: {
    layout: "padded",
  },
  args: {
    label: "Label",
    labelVariant: "primary",
  },
  argTypes: {
    layout: { control: "select", options: ["horizontal", "vertical"] },
    labelVariant: { control: "select", options: ["primary", "secondary"] },
    items: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
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

export const HorizontalLayout: Story = {
  args: {
    layout: "horizontal",
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

export const LabelVariants: Story = {
  args: {
    labelVariant: "primary",
  },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="grid gap-10">
      <Select {...args}>
        <SelectItem>Apple</SelectItem>
        <SelectItem>Banana</SelectItem>
        <SelectItem>Mango</SelectItem>
        <SelectItem>Orange</SelectItem>
      </Select>

      <Select {...args} labelVariant="secondary">
        <SelectItem>Apple</SelectItem>
        <SelectItem>Banana</SelectItem>
        <SelectItem>Mango</SelectItem>
        <SelectItem>Orange</SelectItem>
      </Select>
    </div>
  ),
}
