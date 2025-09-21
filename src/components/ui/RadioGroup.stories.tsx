import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "padded",
  },
  args: {
    label: "Label",
    isDisabled: false,
  },
  argTypes: {},
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="option-1">Option 01</RadioGroupItem>
      <RadioGroupItem value="option-2">Option 02</RadioGroupItem>
      <RadioGroupItem value="option-3">Option 03</RadioGroupItem>
    </RadioGroup>
  ),
}
