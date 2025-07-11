import Label from "@/components/ui/Label"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Label",
  component: Label,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
  },
  args: {
    children: "Field Label",
  },
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: "primary",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
}

export const All: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Label variant="primary">Primary Label</Label>
      <Label variant="secondary">Secondary Label</Label>
    </div>
  ),
  parameters: { controls: { disable: true } },
}
