import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "padded",
  },

  argTypes: {
    label: {
      description:
        "Label for the radio group. If a visible label is not provided, an aria-label should be provided.",
    },
    layout: {
      description:
        "Layout for the radio items. This also controls the `orientation` prop on the radio group.",
      table: {
        type: { summary: '"vertical" | "horizontal"' },
        defaultValue: { summary: '"vertical"' },
      },
      control: "select",
      options: ["vertical", "horizontal"],
    },
  },

  args: {
    label: "Label",
    layout: "vertical",
    isDisabled: false,
  },
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

export const HorizontalLayout: Story = {
  render: (args) => (
    <RadioGroup {...args} layout="horizontal">
      <RadioGroupItem value="option-1">Option 01</RadioGroupItem>
      <RadioGroupItem value="option-2">Option 02</RadioGroupItem>
      <RadioGroupItem value="option-3">Option 03</RadioGroupItem>
    </RadioGroup>
  ),
}

export const WithErrorMessage: Story = {
  render: (args) => (
    <RadioGroup
      {...args}
      errorMessage="Radio group error message."
      isInvalid={true}
    >
      <RadioGroupItem value="option-1">Option 01</RadioGroupItem>
      <RadioGroupItem value="option-2">Option 02</RadioGroupItem>
      <RadioGroupItem value="option-3">Option 03</RadioGroupItem>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args} isDisabled={true}>
      <RadioGroupItem value="option-1">Option 01</RadioGroupItem>
      <RadioGroupItem value="option-2">Option 02</RadioGroupItem>
      <RadioGroupItem value="option-3">Option 03</RadioGroupItem>
    </RadioGroup>
  ),
}
